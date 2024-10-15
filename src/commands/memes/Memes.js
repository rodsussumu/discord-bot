import { SlashCommandBuilder } from "discord.js"
import { audio, connectToChannel } from "../../utility/audio.js";
import clientConfig from "../../utility/clientconfig.js";
import { resolve, dirname } from "path"

export default class Memes {
    time() {
        return new SlashCommandBuilder()
        .setName("iai")
        .setDescription("não, iai não po");
    }

    async executeTime(interaction) {
        const { guild, user } = interaction;

        const member = await guild.members.fetch(user.id);

        if(!member.voice.channel) {
            await interaction.reply({content: `NÃO IAI NÃO PO A GENTE NÃO É UM TIME ${interaction.user}!`, ephemeral: true});
        }

        const channel = await clientConfig.channels.fetch(member.voice.channelId);

        const statusConnection = await connectToChannel(channel);

        const pathAudio = resolve(dirname(""), 'src', 'audios', 'iai.mp3');

        await audio(pathAudio, statusConnection);

        await interaction.reply({content: `NÃO IAI NÃO PO A GENTE NÃO É UM TIME ${interaction.user}!`, ephemeral: true});
    }
}