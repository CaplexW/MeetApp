import express from "express";
import serverError from "../utils/serverError.js";
import Quality from "../models/Quality.js";

const router = express.Router({ mergeParams: true });

router.get('/', get);

async function get(req, res) {
    try {
        const list = await Quality.find();
        res.status(200).send(list);
    } catch (e) {
        serverError(res);
        console.log(e.message);
    }
}

export default router;