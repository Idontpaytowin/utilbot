import { REST, Routes } from "discord.js";

export async function registerCommands(token, guildID, clientID, commands) {
    const rest = new REST({ version: "10" }).setToken(token);
    console.log(`Started refreshing application commands.`);
    console.table(commands["commands"], ["name", "description"]);
    const data = await rest.put(
        Routes.applicationGuildCommands(clientID, guildID),
        { body: commands["commands"] }
    );

    console.log(`Successfully reloaded application commands.`);
}
