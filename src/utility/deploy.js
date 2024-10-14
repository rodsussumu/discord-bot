import { REST, Routes } from "discord.js";

export default async function deploy(commands) {
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.APPLICATION_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
}