import {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";

const start = [
    "Wszystko gdyby nie ten",
    "Gdyby tylko nie ten",
    "Wspaniały, koszmarny i",
];
const middle = [
    "wścipski",
    "niedziałający",
    "głupi",
    "śmieszny",
    "działający",
    "wspaniały",
    "koszmarny",
];
const end = [
    "js",
    "javascript",
    "typescript",
    "discord.js",
    "djs",
    "json",
    "fetch api",
    "python",
    "python",
    "python",
    "python",
    "karolina",
    "karolina",
    "karolina",
    "karolina",
    "karolina",
    "pythontest",
    "omj",
    "laureat omj",
    "czlowiek o imieniu Karolina",
    "wsl",
    "WSL",
];

export function generateMessage() {
    return `${start[Math.floor(Math.random() * start.length)]} ${middle[Math.floor(Math.random() * middle.length)]
        } ${end[Math.floor(Math.random() * end.length)]}.`;
}

export default class funny {
    constructor(env, client, commands) {
        this.env = env;
        this.client = client;
        this.commands = commands;
    }

    awake() {
        const command = new SlashCommandBuilder()
            .setName("funny")
            .setDescription("funny");
        this.commands["commands"].push(command);
    }

    async interaction(interaction) {
        if (
            interaction.isChatInputCommand() &&
            interaction.commandName === "funny"
        ) {
            await interaction.reply({
                content: generateMessage(),
                ephemeral: false,
            });
        }
    }
}

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName("ping")
//         .setDescription("Replies with Pong!"),
//     async execute(interaction) {
//         await interaction.reply("Pong!");
//     },
// };
