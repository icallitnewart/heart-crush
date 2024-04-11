import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '../redux/store';

import { ScreenType, StageNumberType } from '../types/gameSettingsStates.type';
import { SoundEffectType } from '../types/common.type';
import { SCREEN } from '../constants/screen.constant';
import {
	BG_MUSIC_AUDIO,
	SOUND_EFFECT_AUDIO,
	SOUND_EFFECT_TYPE,
} from '../constants/audio.constant';

interface SoundEffectAudioRefType {
	[SOUND_EFFECT_TYPE.MOUSE_HOVER]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.RESULT_WIN]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.RESULT_LOSE]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.GAME_CLEAR]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.HEART_SWAP_FAIL]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.BONUS_SCORE]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.HEART_HIGHLIGHT]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.HEART_CRUSH]: HTMLAudioElement[];
}

function useSoundManager() {
	const stageNumber = 1; // TODO: 업데이트 필요
	const bgMusic = useAppSelector(state => state.sound.bgMusic);
	const soundEffect = useAppSelector(state => state.sound.soundEffect);
	const isSoundActivated = useAppSelector(
		state => state.sound.isSoundActivated,
	);
	const screen = useAppSelector(state => state.display.screen);
	const bgMusicAudioRef = useRef(new Audio());
	const soundEffectsAudioRef = useRef<SoundEffectAudioRefType>({
		[SOUND_EFFECT_TYPE.MOUSE_HOVER]: new Audio(SOUND_EFFECT_AUDIO.MOUSE_HOVER),
		[SOUND_EFFECT_TYPE.RESULT_WIN]: new Audio(SOUND_EFFECT_AUDIO.RESULT_WIN),
		[SOUND_EFFECT_TYPE.RESULT_LOSE]: new Audio(SOUND_EFFECT_AUDIO.RESULT_LOSE),
		[SOUND_EFFECT_TYPE.GAME_CLEAR]: new Audio(SOUND_EFFECT_AUDIO.GAME_CLEAR),
		[SOUND_EFFECT_TYPE.HEART_SWAP_FAIL]: new Audio(
			SOUND_EFFECT_AUDIO.HEART_SWAP_FAIL,
		),
		[SOUND_EFFECT_TYPE.BONUS_SCORE]: new Audio(SOUND_EFFECT_AUDIO.BONUS_SCORE),
		[SOUND_EFFECT_TYPE.HEART_HIGHLIGHT]: new Audio(
			SOUND_EFFECT_AUDIO.HEART_HIGHLIGHT,
		),
		[SOUND_EFFECT_TYPE.HEART_CRUSH]: new Array(5)
			.fill(null)
			.map(() => new Audio(SOUND_EFFECT_AUDIO.HEART_CRUSH)),
	});

	const selectBgMusic = (
		currentScreen: ScreenType,
		stage?: StageNumberType,
	) => {
		switch (currentScreen) {
			case SCREEN.HOME: {
				return BG_MUSIC_AUDIO.HOME;
			}

			case SCREEN.GAME: {
				const total = BG_MUSIC_AUDIO.GAME.length;
				const idx = stage ? (stage - 1) % total : 0;
				return BG_MUSIC_AUDIO.GAME[idx];
			}

			default: {
				return '';
			}
		}
	};

	const stopBgMusic = useCallback(() => {
		const audio = bgMusicAudioRef.current;
		audio.pause();
		audio.currentTime = 0;
	}, [bgMusicAudioRef]);

	const playBgMusic = useCallback(
		(src: string) => {
			const audio = bgMusicAudioRef.current;

			if (bgMusic) {
				if (audio.src !== src) {
					stopBgMusic();
					audio.src = src;
				}

				audio.play();
			}
		},
		[bgMusic, bgMusicAudioRef, stopBgMusic],
	);

	const playSoundEffect = useCallback(
		(type: SoundEffectType) => {
			if (soundEffect && isSoundActivated) {
				const audio = soundEffectsAudioRef.current[type];
				if (audio instanceof HTMLAudioElement) {
					audio.play();
				} else if (Array.isArray(audio)) {
					const availableAudio = audio.find(a => a.paused);
					if (availableAudio) availableAudio.play();
				}
			}
		},
		[soundEffect, isSoundActivated],
	);

	const stopSoundEffect = useCallback(
		(type: SoundEffectType) => {
			if (soundEffect && isSoundActivated) {
				const audio = soundEffectsAudioRef.current[type];
				if (audio instanceof HTMLAudioElement) {
					audio.pause();
					audio.currentTime = 0;
				} else if (Array.isArray(audio)) {
					const availableAudio = audio.find(a => !a.paused);
					if (availableAudio) {
						availableAudio.pause();
						availableAudio.currentTime = 0;
					}
				}
			}
		},
		[soundEffect, isSoundActivated],
	);

	const fadeOutBgMusic = useCallback(() => {
		const audio = bgMusicAudioRef.current;
		const intervalTime = 10;
		const duration = 2000;
		const step = audio.volume / (duration / intervalTime);

		const fadeOutInterval = setInterval(() => {
			if (audio.volume > step) {
				audio.volume -= step;
			} else {
				audio.volume = 0;
				stopBgMusic();
				clearInterval(fadeOutInterval);
			}
		}, intervalTime);
	}, [stopBgMusic]);

	useEffect(() => {
		const audio = bgMusicAudioRef.current;

		if (bgMusic) {
			const src = selectBgMusic(screen, stageNumber);

			if (audio.paused) {
				if (isSoundActivated) {
					audio.volume = 1;
					audio.loop = true;
					playBgMusic(src);
				}
			} else {
				const currentMusic = audio.src;
				const selectedMusic = new URL(src, window.location.href).toString();

				if (selectedMusic !== currentMusic) playBgMusic(selectedMusic);
			}
		} else if (!audio.paused) {
			stopBgMusic();
		}
	}, [
		bgMusic,
		screen,
		isSoundActivated,
		stageNumber,
		playBgMusic,
		stopBgMusic,
	]);

	return { playSoundEffect, stopSoundEffect, fadeOutBgMusic };
}

export default useSoundManager;
