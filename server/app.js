import express from 'express';
import mongoose from 'mongoose';
import chalk from "chalk";
import config from 'config'
import startUp from "./startUp/startUp.js";
import initDatabase from "./startUp/initDatabase.js";
import routes from "./routes/index.js";
import cors from 'cors';
import { join } from 'path';
import getPath from "./utils/getPath.js";

const app = express();
const { __dirname } = getPath(import.meta);
const PORT = config.get('port') ?? 8080;
const clientPath = join(__dirname, 'client');
const indexPath = join(clientPath, 'index.html');

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(cors());
app.use('/api', routes);
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(clientPath));
    app.get('*', sendIndex);
}

start();

async function start() {
    try {
        console.log(`Trying to connect MongoDB on URI ${config.get('mongoUri')}`);
        mongoose.connection.once('open', initDatabase);
        await mongoose.connect(config.get('mongoUri'));
        console.log('Mongo DB connected!');
        app.listen(PORT, startUp);
    } catch(err) {
        console.log(chalk.bgRed(err.message));
        process.exit(1);
    }
}
async function sendIndex(req, res) {
    console.log('sending index page');
    res.sendFile(indexPath);
}
