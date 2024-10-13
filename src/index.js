import dotenv from "dotenv"
import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js"
import commands from "./commands/index.js";

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
})

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = commands()

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	console.log(`Comando recebido: ${interaction.commandName}`);

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

const commandsForDeploy = []

client.commands.forEach((command) => {
    commandsForDeploy.push(command.data.toJSON());  // data() retorna o SlashCommandBuilder, então convertemos para JSON
});

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commandsForDeploy.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID),
			{ body: commandsForDeploy },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

client.login(process.env.DISCORD_TOKEN);
