import express from "express";
import serverError from "../utils/serverError.js";
import Comment from '../models/Comment.js'
import {checkAuth} from "../middleware/auth.middleware.js";
import sendAuthError from "../utils/sendAuthError.js";

const router = express.Router({ mergeParams: true });

router.get('/', checkAuth, getBookmarkList);
router.post('/', checkAuth, createBookmark);
router.delete('/:bookmarkId', checkAuth, removeBookmark);

async function getBookmarkList(req, res) {
    try {
        const { orderBy, equalTo } = req.query;
        const list = await Comment.find({ [orderBy]: equalTo });
        res.send(list);
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}
async function createBookmark(req, res) {
    try {
        const newComment = await Comment.create({ ...req.body, userId: req?.user?._id });
        res.status(201).send(newComment);
    } catch (e) {
        console.log(e.message);
        serverError(res);
    }
}
async function removeBookmark(req, res) {
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
