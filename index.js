import {
    Client,
    Events,
    GatewayIntentBits,
    SlashCommandBuilder,
} from "discord.js";
import * as dotenv from "dotenv";

import { registerCommands } from "./registerCommands.js";
import { webhookError } from "./webhookError.js";
import { rmSync, existsSync, mkdirSync } from "fs";
dotenv.config();
const env = process.env;

process.addListener("uncaughtException", function (event) {
    webhookError(event, env.webhookError);
    console.error(event);
});

// import bot modules
let modules = {};
let commands = { commands: [] };
import ping from "./modules/ping.js";
import funny from "./modules/funny.js";
import ytdl from "./modules/ytdl.js";

// setup client and modules
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

modules["ping"] = new ping(env, client, commands);
modules["funny"] = new funny(env, client, commands);
modules["ytdl"] = new ytdl(env, client, commands);

// run the awake function on all modules
Object.entries(modules)
    .filter((element) => {
        return element[1].awake != undefined;
    })
    .forEach(([name, module]) => {
        module.awake();
    });

// register commands
registerCommands(env.token, env.guildID, env.clientID, commands);

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    Object.entries(modules)
        .filter((element) => {
            return element[1].start != undefined;
        })
        .forEach(([name, module]) => {
            module.start();
        });
});

client.on(Events.InteractionCreate, async (interaction) => {
    const dir = './tmp';
    if (existsSync(dir)) {
        rmSync(dir, { recursive: true, force: true });
    }
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }

    Object.entries(modules)
        .filter((element) => {
            return element[1].interaction != undefined;
        })
        .forEach(([name, module]) => {
            module.interaction(interaction);
        });
});

client.login(process.env.token);
