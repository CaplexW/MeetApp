import express from "express";
import auth from "./auth.js";
import comment from './comment.js';
import profession from "./profession.js";
import quality from "./quality.js";
import user from "./user.js";
import bookmark from "./bookmark.js";

const router = express.Router({ mergeParams: true });

router.use('/auth', auth);
router.use('/comment', comment);
router.use('/profession', profession);
router.use('/quality', quality);
router.use('/user', user);
router.use('/bookmark', bookmark);

export default router;