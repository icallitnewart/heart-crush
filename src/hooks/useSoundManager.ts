import { useCallback, useEffect, useRef } from 'react';

import {
	PopupType,
	ScreenType,
	SoundOptionsType,
	StageNumberType,
} from '../types/gameSettingsStates.type';
import { POPUP, SCREEN } from '../constants/screen.constant';
import {
	BG_MUSIC_AUDIO,
	SOUND_EFFECT_AUDIO,
	SOUND_EFFECT_TYPE,
} from '../constants/audio.constant';
import { SoundEffectType } from '../types/common.type';

interface SoundEffectAudioRefType {
	[SOUND_EFFECT_TYPE.MOUSE_HOVER]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.RESULT_WIN]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.RESULT_LOSE]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.HEART_SWAP_FAIL]: HTMLAudioElement;
	[SOUND_EFFECT_TYPE.HEART_CRUSH]: HTMLAudioElement[];
}

function useSoundManager(
	soundOptions: SoundOptionsType,
	screen: ScreenType,
	popup: PopupType,
	stageNumber: StageNumberType | undefined,
) {
	const { bgMusic, soundEffect } = soundOptions;
	const bgMusicAudioRef = useRef(new Audio());
	const soundEffectsAudioRef = useRef<SoundEffectAudioRefType>({
		[SOUND_EFFECT_TYPE.MOUSE_HOVER]: new Audio(SOUND_EFFECT_AUDIO.MOUSE_HOVER),
		[SOUND_EFFECT_TYPE.RESULT_WIN]: new Audio(SOUND_EFFECT_AUDIO.RESULT_WIN),
		[SOUND_EFFECT_TYPE.RESULT_LOSE]: new Audio(SOUND_EFFECT_AUDIO.RESULT_LOSE),
		[SOUND_EFFECT_TYPE.HEART_SWAP_FAIL]: new Audio(
			SOUND_EFFECT_AUDIO.HEART_SWAP_FAIL,
		),
		[SOUND_EFFECT_TYPE.HEART_CRUSH]: new Array(5)
			.fill(null)
			.map(() => new Audio(SOUND_EFFECT_AUDIO.HEART_CRUSH)),
	});

	const selectBgMusic = useCallback(
		(currentScreen: ScreenType, stage?: StageNumberType) => {
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
		},
		[],
	);

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

	const playSoundEffect = (type: SoundEffectType) => {
		const isSoundActivated = popup !== POPUP.SOUND_ALERT;

		if (soundEffect && isSoundActivated) {
			const audio = soundEffectsAudioRef.current[type];
			if (audio instanceof HTMLAudioElement) {
				audio.play();
			} else if (Array.isArray(audio)) {
				const availableAudio = audio.find(a => a.paused);
				if (availableAudio) availableAudio.play();
			}
		}
	};

	useEffect(() => {
		const audio = bgMusicAudioRef.current;

		if (bgMusic) {
			const src = selectBgMusic(screen, stageNumber);

			if (audio.paused) {
				const isSoundActivated = popup !== POPUP.SOUND_ALERT;

				if (isSoundActivated) {
					audio.loop = true;
					playBgMusic(src);
				}
			} else {
				const currentMusic = audio.src;
				const selectedMusic = new URL(src, window.location.href).toString();

				if (selectedMusic !== currentMusic) playBgMusic(selectedMusic);
				else if (popup === POPUP.RESULT) stopBgMusic();
			}
		} else if (!audio.paused) {
			stopBgMusic();
		}
	}, [
		bgMusic,
		screen,
		popup,
		stageNumber,
		playBgMusic,
		stopBgMusic,
		selectBgMusic,
	]);

	return { playSoundEffect };
}

export default useSoundManager;
