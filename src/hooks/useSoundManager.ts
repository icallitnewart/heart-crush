import { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '../redux/store';

import { ScreenType, StageNumberType } from '../types/state.type';
import { SoundEffectType } from '../types/common.type';
import { SCREEN } from '../constants/screen.constant';
import {
	BG_MUSIC_AUDIO,
	SOUND_EFFECT_AUDIO,
	SOUND_EFFECT_TYPE,
} from '../constants/audio.constant';

interface SoundEffectAudioRefType {
	[SOUND_EFFECT_TYPE.MOUSE_HOVER]: HTMLAudioElement | null;
	[SOUND_EFFECT_TYPE.RESULT_WIN]: HTMLAudioElement | null;
	[SOUND_EFFECT_TYPE.RESULT_LOSE]: HTMLAudioElement | null;
	[SOUND_EFFECT_TYPE.GAME_CLEAR]: HTMLAudioElement | null;
	[SOUND_EFFECT_TYPE.HEART_SWAP_FAIL]: HTMLAudioElement | null;
	[SOUND_EFFECT_TYPE.BONUS_SCORE]: HTMLAudioElement | null;
	[SOUND_EFFECT_TYPE.HEART_HIGHLIGHT]: HTMLAudioElement | null;
	[SOUND_EFFECT_TYPE.HEART_CRUSH]: HTMLAudioElement[] | [];
}

function useSoundManager() {
	const stage = useAppSelector(state => state.stage.currentStage.data);
	const bgMusic = useAppSelector(state => state.sound.bgMusic);
	const soundEffect = useAppSelector(state => state.sound.soundEffect);
	const isSoundActivated = useAppSelector(
		state => state.sound.isSoundActivated,
	);
	const screen = useAppSelector(state => state.display.screen);
	const bgMusicAudioRef = useRef<HTMLAudioElement | null>(null);
	const soundEffectsAudioRef = useRef<SoundEffectAudioRefType>({
		[SOUND_EFFECT_TYPE.MOUSE_HOVER]: null,
		[SOUND_EFFECT_TYPE.RESULT_WIN]: null,
		[SOUND_EFFECT_TYPE.RESULT_LOSE]: null,
		[SOUND_EFFECT_TYPE.GAME_CLEAR]: null,
		[SOUND_EFFECT_TYPE.HEART_SWAP_FAIL]: null,
		[SOUND_EFFECT_TYPE.BONUS_SCORE]: null,
		[SOUND_EFFECT_TYPE.HEART_HIGHLIGHT]: null,
		[SOUND_EFFECT_TYPE.HEART_CRUSH]: [],
	});

	const selectBgMusic = (
		currentScreen: ScreenType,
		stageNumber?: StageNumberType,
	) => {
		switch (currentScreen) {
			case SCREEN.HOME: {
				return BG_MUSIC_AUDIO.HOME;
			}

			case SCREEN.GAME: {
				const total = BG_MUSIC_AUDIO.GAME.length;
				const idx = stageNumber ? (stageNumber - 1) % total : 0;
				return BG_MUSIC_AUDIO.GAME[idx];
			}

			default: {
				return '';
			}
		}
	};

	const initialiseAudio = useCallback(() => {
		bgMusicAudioRef.current = new Audio();

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.MOUSE_HOVER] = new Audio(
			SOUND_EFFECT_AUDIO.MOUSE_HOVER,
		);

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.RESULT_WIN] = new Audio(
			SOUND_EFFECT_AUDIO.RESULT_WIN,
		);

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.RESULT_LOSE] = new Audio(
			SOUND_EFFECT_AUDIO.RESULT_LOSE,
		);

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.GAME_CLEAR] = new Audio(
			SOUND_EFFECT_AUDIO.GAME_CLEAR,
		);

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.HEART_SWAP_FAIL] = new Audio(
			SOUND_EFFECT_AUDIO.HEART_SWAP_FAIL,
		);

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.BONUS_SCORE] = new Audio(
			SOUND_EFFECT_AUDIO.BONUS_SCORE,
		);

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.HEART_HIGHLIGHT] = new Audio(
			SOUND_EFFECT_AUDIO.HEART_HIGHLIGHT,
		);

		soundEffectsAudioRef.current[SOUND_EFFECT_TYPE.HEART_CRUSH] = new Array(5)
			.fill(null)
			.map(() => new Audio(SOUND_EFFECT_AUDIO.HEART_CRUSH));
	}, []);

	const stopBgMusic = useCallback(() => {
		const audio = bgMusicAudioRef.current;
		if (!audio) return;

		audio.pause();
		audio.currentTime = 0;
	}, [bgMusicAudioRef]);

	const playBgMusic = useCallback(
		(src: string) => {
			const audio = bgMusicAudioRef.current;
			if (!audio) return;

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
		if (!audio) return;

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
		// 오디오 객체 준비
		if (isSoundActivated) initialiseAudio();
	}, [isSoundActivated, initialiseAudio]);

	useEffect(() => {
		const audio = bgMusicAudioRef.current;
		// TODO: 사운드 에러 처리
		if (!audio || !isSoundActivated) return;

		if (bgMusic) {
			const src = selectBgMusic(screen, stage?.stageNumber);

			if (audio.paused) {
				// 중지된 배경 음악 재생
				audio.volume = 1;
				audio.loop = true;
				playBgMusic(src);
			} else {
				// 재생 중인 배경 음악 변경 (화면 및 스테이지 전환시)
				const currentMusic = audio.src;
				const selectedMusic = new URL(src, window.location.href).toString();

				if (selectedMusic !== currentMusic) playBgMusic(selectedMusic);
			}
		} else if (!audio.paused) {
			// 배경 음악 중지
			stopBgMusic();
		}
	}, [bgMusic, screen, isSoundActivated, stage, playBgMusic, stopBgMusic]);

	return { playSoundEffect, stopSoundEffect, fadeOutBgMusic, initialiseAudio };
}

export default useSoundManager;
