const AUDIO_FOLDER = `${process.env.PUBLIC_URL}/assets/audio`;
const BG_MUSIC_FOLDER = `${AUDIO_FOLDER}/bgMusic`;
const SOUND_EFFECT_FOLDER = `${AUDIO_FOLDER}/soundEffect`;
const getBgMusicSrc = (file: string) => `${BG_MUSIC_FOLDER}/${file}`;
const getSoundEffectSrc = (file: string) => `${SOUND_EFFECT_FOLDER}/${file}`;

export const BG_MUSIC_AUDIO = {
	HOME: getBgMusicSrc('salty_ditty.mp3'),
	GAME: [
		getBgMusicSrc('newer_wave.mp3'),
		getBgMusicSrc('airship_serenity.mp3'),
		getBgMusicSrc('chipper_doodle_v2.mp3'),
		getBgMusicSrc('ambler.mp3'),
		getBgMusicSrc('blippy_trance.mp3'),
		getBgMusicSrc('dance_monster.mp3'),
	],
};

export const SOUND_EFFECT_AUDIO = {
	HEART_CRUSH: getSoundEffectSrc('heart_crush.mp3'),
	MOUSE_HOVER: getSoundEffectSrc('mouse_hover.mp3'),
	RESULT_WIN: getSoundEffectSrc('result_win.mp3'),
	RESULT_LOSE: getSoundEffectSrc('result_lose.mp3'),
};

export const SOUND_EFFECT_TYPE = {
	HEART_CRUSH: 'heartCrush',
	MOUSE_HOVER: 'mouseHover',
	RESULT_WIN: 'resultWin',
	RESULT_LOSE: 'resultLose',
} as const;
