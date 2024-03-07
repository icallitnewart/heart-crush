const AUDIO_FOLDER = `${process.env.PUBLIC_URL}/assets/audio/`;
const BG_MUSIC_FOLDER = `${AUDIO_FOLDER}/bgMusic/`;
const getFilePath = (file: string) => `${BG_MUSIC_FOLDER}${file}`;

export const BG_MUSIC = {
	HOME: getFilePath('salty_ditty.mp3'),
};
