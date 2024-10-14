import dotenv from "dotenv"
import { Client, Events, GatewayIntentBits } from "discord.js"
import commands from "./commands/index.js";
import { AudioPlayerStatus, VoiceConnectionStatus } from "@discordjs/voice";
import deploy from "./utility/deploy.js";
import interaction from "./utility/interaction.js";
import clientConfig from "./utility/clientconfig.js";

dotenv.config()

const client = clientConfig

client.commands = commands()

interaction(client)

const commandsForDeploy = []

client.commands.forEach((command) => {
    commandsForDeploy.push(command.data.toJSON());  // data() retorna o SlashCommandBuilder, então convertemos para JSON
});

deploy(commandsForDeploy)

client.login(process.env.DISCORD_TOKEN);
