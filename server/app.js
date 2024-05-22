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

// 192.144.14.101
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
        mongoose.connection.once('open', initDatabase);
        await mongoose.connect(config.get('mongoUri'));
        app.listen(PORT, startUp);
    } catch(err) {
        console.log(chalk.bgRed(err.message));
        process.exit(1);
    }
}
async function sendIndex(req, res) {
    res.sendFile(indexPath)
}
