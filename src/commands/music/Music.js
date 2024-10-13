import { SlashCommandBuilder } from "discord.js"

export default class Music {
    addMusic() {
        return new SlashCommandBuilder().setName("add").setDescription("Add music to queue")
    }

    async executeAddMusic(interaction) {
        await interaction.reply("Hello!")
    }
}
