const AUDIO_FOLDER = `${process.env.PUBLIC_URL}/assets/audio`;
const BG_MUSIC_FOLDER = `${AUDIO_FOLDER}/bgMusic/`;
const getFilePath = (file: string) => `${BG_MUSIC_FOLDER}${file}`;

export const BG_MUSIC = {
	HOME: getFilePath('salty_ditty.mp3'),
	GAME: [
		getFilePath('newer_wave.mp3'),
		getFilePath('airship_serenity.mp3'),
		getFilePath('chipper_doodle_v2.mp3'),
		getFilePath('ambler.mp3'),
		getFilePath('blippy_trance.mp3'),
		getFilePath('dance_monster.mp3'),
	],
};
