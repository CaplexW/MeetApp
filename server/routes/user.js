import express from "express";
import serverError from "../utils/serverError.js";
import User from "../models/User.js";
import sendAuthError from "../utils/sendAuthError.js";
import {checkAuth} from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get('/', checkAuth, getUsersList);
router.patch('/:id', checkAuth, updateUser);

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

export default router;