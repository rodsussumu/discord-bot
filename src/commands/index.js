import { Collection } from "discord.js"
import Music from "./music/Music.js"
import Memes from "./memes/Memes.js";

export default function commands() {
    const commands = new Collection();

    const music = new Music()
    const memes = new Memes()

    // Music
    commands.set(music.addMusic().name, {data: music.addMusic(), execute: music.executeAddMusic});

    // Memes
    commands.set(memes.time().name, {data: memes.time(), execute: memes.executeTime})
    

    return commands;
}




