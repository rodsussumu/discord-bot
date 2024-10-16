import { AudioPlayerStatus, VoiceConnectionStatus, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel } from "@discordjs/voice";
import fs from "fs"
import { resolve, dirname } from "path"
import ytdl from "@distube/ytdl-core";
import ytSearch from "yt-search"

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

function returnCookie() {
	const pathCookie = resolve(dirname(""), '.data', 'youtube.data'); 
	const data = fs.readFileSync(pathCookie, { encoding: 'utf8'})
	return JSON.parse(data).cookie
}

async function youtubeMusic(url, connection, interaction) {
	let player = createAudioPlayer();

	player.on(AudioPlayerStatus.Idle, () => {
		connection.destroy();
	});

	const result = (await ytSearch(url)).all[0];

	let stream = ytdl(result.url, { 
		filter: 'audioonly',
		requestOptions: {
			Cookie: returnCookie()
		}
	});

	let resource = createAudioResource(stream);

	player.play(resource);

	connection.subscribe(player);

	await interaction.reply({content: `Started ${result.title}!`, ephemeral: true})

	player.on(AudioPlayerStatus.Idle, () => {
		connection.destroy();
	});

	connection.on(VoiceConnectionStatus.Disconnected, () => {
		connection.destroy();
	})
}

export { audio, connectToChannel, youtubeMusic }