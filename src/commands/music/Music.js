import { SlashCommandBuilder } from "discord.js"

export default class Music {
    addMusic() {
        return new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add music to queue")
        .addStringOption(option => option.setName("input").setDescription("Music Url").setRequired(true))
    }

    async executeAddMusic(interaction) {
        console.log(interaction.options.data[0].value)
        await interaction.reply({content: `Hello ${interaction.user}!`, ephemeral: true})
    }
}
