import { useRef } from 'react';

import { SoundOptionsType } from '../types/gameSettingsStates.type';

function useSoundManager({ bgMusic, soundEffect }: SoundOptionsType) {
	const bgMusicAudioRef = useRef(new Audio());

	const playBgMusic = (src: string) => {
		if (bgMusic) {
			const audio = bgMusicAudioRef.current;
			audio.loop = true;

			if (audio.src !== src) {
				audio.src = src;
				audio.play();
			}
		}
	};

	return { playBgMusic };
}

export default useSoundManager;
