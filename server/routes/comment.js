import express from "express";
import serverError from "../utils/serverError.js";
import Comment from '../models/Comment.js'
import {checkAuth} from "../middleware/auth.middleware.js";
import sendAuthError from "../utils/sendAuthError.js";

const router = express.Router({ mergeParams: true });

router.get('/', checkAuth, getCommentsList);
router.post('/', checkAuth, createComment);
router.delete('/:commentId', checkAuth, removeComment);

async function getCommentsList(req, res) {
    try {
        const { orderBy, equalTo } = req.query;
        const list = await Comment.find({ [orderBy]: equalTo });
        res.send(list);
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}
async function createComment(req, res) {
    try {
        const newComment = await Comment.create({ ...req.body, userId: req?.user?._id });
        res.status(201).send(newComment);
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}
async function removeComment(req, res) {
    try {
        const { commentId } = req.params;
        const removingComment = await Comment.findById(commentId);
        const isPermitted = (removingComment.userId.toString() === req.user._id)
            || (removingComment.pageId.toString() === req.user._id);

        if (!isPermitted) return sendAuthError(res);

        await Comment.findByIdAndDelete(removingComment._id);
        return res.send(null);
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}

export default router;
