import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { mainMenu } from "./index";
import { audioManager } from "./audio";

export type PlayStyle = "normal" | "stylish" | "crazy";
export type Resolution = "80x20" | "160x40" | "240x60" | "320x80";

export interface Options {
    music: boolean;
    sfx: boolean;
    playStyle: PlayStyle;
    resolution: Resolution;
    controls: Controls;
}

export interface Controls {
    p1Up: string;
    p1Down: string;
    p1Stop: string;
    p2Up: string;
    p2Down: string;
    p2Stop: string;
}

export const userOptions: Options = {
    music: true,
    sfx: true,
    playStyle: "normal",
    resolution: "160x40",
    controls: { p1Up: "w", p1Down: "s", p1Stop: " ", p2Up: "i", p2Down: "k", p2Stop: "n" },
};

export async function optionsMenu(): Promise<void> {
    let exit = false;

    while (!exit) {
        console.clear();

        const title = figlet.textSync(" PONG   CLI", { font: "Small Poison" });
        console.log(chalk.green(title));
        const subtitle = figlet.textSync("  OPTIONS", { font: "Soft" });
        console.log(chalk.whiteBright(subtitle));

        const setString =
            `${chalk.cyan("\tMusic:     ")} ${userOptions.music ? chalk.greenBright("Enabled ✓") : chalk.redBright("Disabled ✘")}\n` +
            `${chalk.cyan("\tSounds:    ")} ${userOptions.sfx ? chalk.greenBright("Enabled ✓") : chalk.redBright("Disabled ✘")}\n` +
            `${chalk.cyan("\tPlay Style:")} ${chalk.yellowBright(userOptions.playStyle)}\n` +
            `${chalk.cyan("\tResolution:")} ${chalk.blueBright(userOptions.resolution)}\n` +
            `${chalk.cyan("\tControls:  ")} ${chalk.magenta(`P1  ↑:${userOptions.controls.p1Up}  ↓:${userOptions.controls.p1Down}  ■: ${userOptions.controls.p1Stop}`)} | ` +
            `${chalk.yellow(`P2  ↑:${userOptions.controls.p2Up}  ↓:${userOptions.controls.p2Down}  ■:${userOptions.controls.p2Stop}`)}\n\n`;

        const { option } = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: setString,
                choices: [
                    new inquirer.Separator(),
                    { name: "🎵 Music", value: "music" },
                    new inquirer.Separator(),
                    { name: "💥 Sounds", value: "sfx" },
                    new inquirer.Separator(),
                    { name: "🕹️ Play Style", value: "playStyle" },
                    new inquirer.Separator(),
                    { name: "🖥️ Resolution", value: "resolution" },
                    new inquirer.Separator(),
                    { name: "🎮 Controls", value: "controls" },
                    new inquirer.Separator(),
                    { name: chalk.red("⬅  Main menu"), value: "exit" },
                ],
            },
        ]);

        if (userOptions.sfx) {
            audioManager.playSoundEffect("blop");
        }

        switch (option) {
            case "music": {
                const { music } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "music",
                        message: chalk.magentaBright("Enable music?"),
                        choices: [
                            new inquirer.Separator(),
                            { name: chalk.greenBright("Yes ✓"), value: true },
                            { name: chalk.redBright("No  ✘"), value: false },
                        ],
                        default: userOptions.music,
                    },
                ]);
                userOptions.music = music;
                break;
            }

            case "sfx": {
                const { sfx } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "sfx",
                        message: chalk.magentaBright("Enable Sounds?"),
                        choices: [
                            new inquirer.Separator(),
                            { name: chalk.greenBright("Yes ✓"), value: true },
                            { name: chalk.redBright("No  ✘"), value: false },
                        ],
                        default: userOptions.sfx,
                    },
                ]);
                userOptions.sfx = sfx;
                break;
            }

            case "playStyle": {
                const { playStyle } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "playStyle",
                        message: "",
                        choices: [
                            new inquirer.Separator(),
                            { name: "🎯 Normal", value: "normal" },
                            { name: "💃 Stylish", value: "stylish" },
                            { name: "🤪 Crazy", value: "crazy" },
                        ],
                        default: userOptions.playStyle,
                    },
                ]);
                userOptions.playStyle = playStyle;
                break;
            }

            case "resolution": {
                const { resolution } = await inquirer.prompt([
                    {
                        type: "list",
                        name: "resolution",
                        message: chalk.magentaBright("Select resolution:"),
                        choices: [
                            new inquirer.Separator(),
                            { name: " 80x20 (Compact)", value: "80x20" },
                            { name: "160x40 (Balanced)", value: "160x40" },
                            { name: "240x60 (Spacious)", value: "240x60" },
                            { name: "320x80 (Large)", value: "320x80" },
                        ],
                        default: userOptions.resolution,
                    },
                ]);
                userOptions.resolution = resolution;
                break;
            }

            case "controls": {
                const { p1Up, p1Down, p1Stop, p2Up, p2Down, p2Stop } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "p1Up",
                        message: chalk.cyan("Set Player 1   UP: ↑"),
                        default: "w",
                    },
                    {
                        type: "input",
                        name: "p1Down",
                        message: chalk.cyan("Set Player 1 DOWN: ↓"),
                        default: "s",
                    },
                    {
                        type: "input",
                        name: "p1Stop",
                        message: chalk.cyan("Set Player 1 STOP: X"),
                        default: " ",
                    },
                    {
                        type: "input",
                        name: "p2Up",
                        message: chalk.cyan("Set Player 2   UP: ↑"),
                        default: "i",
                    },
                    {
                        type: "input",
                        name: "p2Down",
                        message: chalk.cyan("Set Player 2 DOWN: ↓"),
                        default: "k",
                    },
                    {
                        type: "input",
                        name: "p2Stop",
                        message: chalk.cyan("Set Player 2 STOP: X"),
                        default: "n",
                    },
                ]);
                userOptions.controls = { p1Up, p1Down, p1Stop, p2Up, p2Down, p2Stop };
                break;
            }

            case "exit":
                exit = true;
                break;
        }
    }
    mainMenu();
}
