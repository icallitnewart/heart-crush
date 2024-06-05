import React, { createContext, useMemo } from 'react';

import { SoundEffectType } from '../types/common.type';

import useSoundManager from '../hooks/useSoundManager';

interface BgMusicContextValueType {
	fadeOutBgMusic: () => void;
}

interface SoundEffectContextValueType {
	playSoundEffect: (type: SoundEffectType) => void;
	stopSoundEffect: (type: SoundEffectType) => void;
}

const initialBgMusicContextValue: BgMusicContextValueType = {
	fadeOutBgMusic: () => {},
};

const initialSoundEffectContextValue: SoundEffectContextValueType = {
	playSoundEffect: () => {},
	stopSoundEffect: () => {},
};

const BgMusicContext = createContext(initialBgMusicContextValue);
const SoundEffectContext = createContext(initialSoundEffectContextValue);

function SoundManagerProvider({ children }: { children: React.ReactNode }) {
	const { playSoundEffect, stopSoundEffect, fadeOutBgMusic } =
		useSoundManager();
	const bgMusicFunction = useMemo(() => ({ fadeOutBgMusic }), [fadeOutBgMusic]);
	const soundEffectFunctions = useMemo(
		() => ({ playSoundEffect, stopSoundEffect }),
		[playSoundEffect, stopSoundEffect],
	);

	return (
		<BgMusicContext.Provider value={bgMusicFunction}>
			<SoundEffectContext.Provider value={soundEffectFunctions}>
				{children}
			</SoundEffectContext.Provider>
		</BgMusicContext.Provider>
	);
}

export { BgMusicContext, SoundEffectContext, SoundManagerProvider };
