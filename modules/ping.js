import { SlashCommandBuilder } from "discord.js";

export default class ping {
    constructor(env, client, commands) {
        this.env = env;
        this.client = client;
        this.commands = commands;
    }

    awake() {
        const command = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies with Pong!");
        this.commands["commands"].push(command);
    }

    async interaction(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "ping") {
            await interaction.reply({
                content: "Secret Pong!",
                ephemeral: true,
            });
        }
    }
}