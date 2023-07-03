import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

import { promisify } from "util";
import { exec } from "child_process";

const shell = promisify(exec);

export default class ytdl {
    constructor(env, client, commands) {
        this.env = env;
        this.client = client;
        this.commands = commands;
    }

    awake() {
        const command = new SlashCommandBuilder()
            .setName("ytdl")
            .setDescription("Downloads a video using yt-dlp!")
            .addStringOption(
                new SlashCommandStringOption()
                    .setMaxLength(512)
                    .setMinLength(8)
                    .setName("link")
                    .setDescription("link to download")
                    .setRequired(true)
            );
        this.commands["commands"].push(command);
    }

    async interaction(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "ytdl") {
            await interaction.deferReply();
            const filename = (Math.floor(Math.random() * (10000 - 100000 + 1)) + 10000).toString();
            const link = interaction.options.getString("link");
            if (!/^[a-zA-Z0-9\/:=?\.]+$/.test(link)) {
                await interaction.editReply({
                    content: "no u",
                    ephemeral: false
                });
                return
            }
            console.log(link);
            const out = await shell(`yt-dlp ${link} --output "./tmp/${filename}.mp4"`);
            await interaction.editReply({
                content: "",
                ephemeral: false,
                files: [`./tmp/${filename}.mp4`]
            });
        }

    }
}