import express from "express";
import serverError from "../utils/serverError.js";
import Profession from "../models/Profession.js";
import { striderProf } from "../constants/guest.js";

const router = express.Router({ mergeParams: true });

router.get('/', get);

async function get(req, res) {
    try {
        const list = await Profession.find();
        const filteredList = list.filter((item) => item._id.toString() !== striderProf)
        res.status(200).send(filteredList);
    } catch (e) {
        serverError(res);
        console.log(e.message);
    }
}

export default router;