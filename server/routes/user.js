import express from "express";
import serverError from "../utils/serverError.js";
import User from "../models/User.js";
import sendAuthError from "../utils/sendAuthError.js";
import {checkAuth} from "../middleware/auth.middleware.js";
import { striderProf } from "../constants/guest.js";
import Token from "../models/Token.js";
import Comment from '../models/Comment.js';

const router = express.Router({ mergeParams: true });

router.get('/', checkAuth, getUsersList);
router.patch('/:id', checkAuth, updateUser);
router.delete('/:id', checkAuth, removeUser);

async function getUsersList(req, res) {
    try {
        const list = await User.find();
        res.send(list);
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}
async function updateUser(req, res) {
    try {
        const updateIsAuthorized = req?.params?.id === req?.user?._id;
        if(!updateIsAuthorized) return sendAuthError(res);

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(updatedUser);
    } catch (e) {
        console.log('error:', e.message);
        serverError(res);
    }
}
async function removeUser(req, res) {
    try {
        const { id } = req.params;
        const removingUser = await User.findById(id);

        const isPermitted = (removingUser._id.toString() === req.user._id);
        if (!isPermitted) return sendAuthError(res);

        await User.findByIdAndDelete(removingUser._id);
        await removeTokens(removingUser._id);
        await removeComments(removingUser._id);

        return res.send(null);
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}

async function removeTokens(userId) {
    await Token.findOneAndDelete({ user: userId });
}
async function removeComments(userId) {
    let i = true;
    let y = true;
    while (i === true) {
        const result = await Comment.findOneAndDelete({ userId });
        if (!result) i = false;
    };
    while (y === true) {
        const result = await Comment.findOneAndDelete({ pageId: userId });
        if (!result) y = false;
    };
}

export default router;