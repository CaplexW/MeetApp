import express from "express";
import serverError from "../utils/serverError.js";
import Profession from "../models/Profession.js";

const router = express.Router({ mergeParams: true });

router.get('/', get);

async function get(req, res) {
    try {
        const list = await Profession.find();
        res.status(200).send(list);
    } catch (e) {
        serverError(res);
        console.log(e.message);
    }
}

export default router;