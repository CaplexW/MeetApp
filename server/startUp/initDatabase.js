import Profession from "../models/Profession.js";
import Quality from "../models/Quality.js";
import { professionsMock } from "../mock/professions.js";
import { qualitiesMock } from "../mock/qualities.js";
import chalk from "chalk";
import {yellow} from "../constants/colors.js";

export default async function initDatabase() {
    const professions = await Profession.find();
    const qualities = await Quality.find();

    const isProfOk = professions.length === professionsMock.length;
    const isQualOk = qualities.length === qualitiesMock.length;

    // if (!isProfOk) await createInitialEntity(Profession, professionsMock);
    // if (!isQualOk) await createInitialEntity(Quality, qualitiesMock);
}

async function createInitialEntity(Model, mock) {
    console.log(chalk.hex(yellow)('Some entities of mock db are not valid. Recreating entities...'));
    console.log('Recreating', Model, '...');
    await Model.collection.drop();
    mock.forEach((item) => {
        try {
            delete item._id;
            const newItem = new Model(item);
            newItem.save().then((result) => result);
        } catch(err) {
            console.log(chalk.bgRed(err));
        }
    })
    console.log(chalk.hex(yellow)('Mock data recreated'));
}
