import { Collection } from "discord.js"
import Music from "./music/Music.js"

export default function commands() {
    const commands = new Collection();

    const music = new Music()

    commands.set(music.addMusic().name, {data: music.addMusic(), execute: music.executeAddMusic});

    return commands;
}




