import { useCallback, useEffect, useRef } from 'react';

import {
	PopupType,
	ScreenType,
	SoundOptionsType,
} from '../types/gameSettingsStates.type';
import { POPUP, SCREEN } from '../constants/screen.constant';
import { BG_MUSIC } from '../constants/audio.constant';

function useSoundManager(
	soundOptions: SoundOptionsType,
	screen: ScreenType,
	popup: PopupType,
) {
	const { bgMusic } = soundOptions;
	const bgMusicAudioRef = useRef(new Audio());

	const selectBgMusic = useCallback((currentScreen: ScreenType) => {
		switch (currentScreen) {
			case SCREEN.HOME: {
				return BG_MUSIC.HOME;
			}

			case SCREEN.GAME: {
				return BG_MUSIC.GAME;
			}

			default: {
				return '';
			}
		}
	}, []);

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

	useEffect(() => {
		const audio = bgMusicAudioRef.current;

		if (bgMusic) {
			const src = selectBgMusic(screen);

			if (audio.paused) {
				const canPlaySound = popup !== POPUP.SOUND_ALERT;

				if (canPlaySound) {
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
	}, [bgMusic, screen, popup, playBgMusic, stopBgMusic, selectBgMusic]);

	return { playBgMusic };
}

export default useSoundManager;
