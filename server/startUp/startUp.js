import chalk from "chalk";
import config from "config";
import {yellow} from "../constants/colors.js";

const PORT = config.get('port') ?? 8080;

export default function startUp() {
    startUpMessage();
}

function startUpMessage()  {
    colorMessage(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode...`);

    function colorMessage(text) {
        if (process.env.NODE_ENV === 'production') {
            console.log(chalk.hex(yellow)('!!!', text));
        }
        if (process.env.NODE_ENV === 'development') {
            console.log(chalk.green(text));
        }
    }
}