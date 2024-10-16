import { SlashCommandBuilder } from "discord.js"
import { connectToChannel, youtubeMusic } from "../../utility/audio.js"
import clientConfig from "../../utility/clientconfig.js"

export default class Music {
    addMusic() {
        return new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add music to queue")
        .addStringOption(option => option.setName("song").setDescription("Youtube URL or Song name").setRequired(true))
    }

    async executeAddMusic(interaction) {
        const song = interaction.options.getString('song')

        const { guild, user } = interaction;

        const member = await guild.members.fetch(user.id);

        if(!member.voice.channel) {
            await interaction.reply({content: `NÃO IAI NÃO PO A GENTE NÃO É UM TIME ${interaction.user}!`, ephemeral: true});
        }

        const channel = await clientConfig.channels.fetch(member.voice.channelId);

        const statusConnection = await connectToChannel(channel);

        await youtubeMusic(song, statusConnection, interaction)
    }
}
