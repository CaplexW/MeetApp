import express from "express";
import serverError from "../utils/serverError.js";
import User from "../models/User.js";
import tokenService from "../services/tokenService.js";
import bcrypt from 'bcryptjs';
import {Result, check, validationResult} from "express-validator";
import sendAuthError from "../utils/sendAuthError.js";
import { striderProf } from "../constants/guest.js";
import removeComments from "../utils/removeComments.js";

const router = express.Router({ mergeParams: true });
const signUpValidations = [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
]
const signInWithPasswordValidations = [
    check('email', 'Некоректный email').normalizeEmail().isEmail(),
    check('password', 'Нужно ввести пароль').exists(),
]

router.post('/signUp', [ ...signUpValidations, signUp]);
router.post('/signInWithPassword', [ ...signInWithPasswordValidations, signInWithPassword]);
router.post('/token', token);

async function signUp(req, res) {
    try {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            const error = {
                message: 'INVALID_DATA',
                code: 400,
                errors: errors.array(),
            };
            return res.status(400).json({ error });
        }

        const { email, password } = req.body;
        const userExists = Boolean(await User.findOne({ email }));
        if (userExists) return sendEmailExistsError(res);

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUserData = {
            image: createUserAvatar(email),
            completedMeetings: 0,
            rate: 0,
            ...req.body,
            password: hashedPassword,
        }
        const newUser = await User.create(newUserData);
        const tokens = tokenService.generate({ _id: newUser._id });
        await tokenService.save(newUser._id, tokens.refreshToken);

        res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }

    function createUserAvatar(seed) {
        return `https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}.svg`
    }
    function sendEmailExistsError(responseObject) {
        return responseObject.status(400).json({
            error: { message: 'EMAIL_EXISTS', code:400 }
        });
    }
}
async function signInWithPassword(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = {
                message: 'INVALID_DATA',
                code: 400,
                errors
            };
            sendClientError(error);
            return;
        }

        const { email, password } = req.body;
        const signingUser = await User.findOne({ email });
        if(!signingUser) {
            const error = {
                message: "EMAIL_NOT_FOUND",
                code: 400,
            };
            sendClientError(error);
            return;
        }

        const isPasswordOk = await bcrypt.compare(password, signingUser.password);
        if(!isPasswordOk) {
            const error = {
                message: 'PASSWORD_IS_INVALID',
                code: 400
            };
            sendClientError(error);
            return;
        }

        const tokens = tokenService.generate({ _id: signingUser._id });
        await tokenService.save(signingUser._id, tokens.refreshToken);

        res.status(201).send({ ...tokens, userId: signingUser._id });
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }

    function sendClientError(error) {
        return res.status(400).json({ error });
    }
}
async function token(req, res) {
    try{
        const { refresh_token: refreshToken } = req.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);
        const tokenIsInvalid = (!data || !dbToken || data._id !== dbToken?.user?.toString());
        if (tokenIsInvalid) return sendAuthError(res);

        const user = await User.findById(dbToken?.user);
        const isGuest = user?.profession?.toString() === striderProf;
        if (isGuest) {
            await User.findByIdAndDelete(user._id);
            await tokenService.removeTokens(user._id);
            await removeComments(user._id);
            
            return res.status(404).json({ message: 'Пользователь не существует' });
        }
        const tokens = tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);

        res.status(201).send({ ...tokens, userId: data._id });

    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}

export default router;