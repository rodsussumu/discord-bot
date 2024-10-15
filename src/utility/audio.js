import { AudioPlayerStatus, VoiceConnectionStatus, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel } from "@discordjs/voice";

function audio(path, connection) {
    const player = createAudioPlayer();
	const resource = createAudioResource(path);
	player.play(resource)
	connection.subscribe(player)
	player.on(AudioPlayerStatus.Idle, () => {
		connection.destroy();
	})
}

async function connectToChannel(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});
	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
		return connection;
	} catch (error) {
		console.log(error)
		connection.destroy();
		throw error;
	}
}

export { audio, connectToChannel }