import { AudioPlayerStatus, NoSubscriberBehavior, VoiceConnectionStatus, createAudioPlayer, entersState, joinVoiceChannel } from "@discordjs/voice";

function audio() {
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Play,
            maxMissedFrames: Math.round(maxTransmissionGap / 20),
        },
    });

    player.play(
		createAudioResource(
			new prism.FFmpeg({
				args: [
					'-analyzeduration',
					'0',
					'-loglevel',
					'0',
					'-f',
					type,
					'-i',
					type === 'dshow' ? `audio=${device}` : device,
					'-acodec',
					'libopus',
					'-f',
					'opus',
					'-ar',
					'48000',
					'-ac',
					'2',
				],
			}),
			{
				inputType: StreamType.OggOpus,
			},
		),
	);

	console.log('Attached recorder - ready to go!');

    player.on('stateChange', (oldState, newState) => {
        if (oldState.status === AudioPlayerStatus.Idle && newState.status === AudioPlayerStatus.Playing) {
            console.log('Playing audio output on audio player');
        } else if (newState.status === AudioPlayerStatus.Idle) {
            console.log('Playback has stopped. Attempting to restart.');
            attachRecorder();
        }
    });
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