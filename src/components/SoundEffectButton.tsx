import React, { useContext } from 'react';
import { AiFillSound } from 'react-icons/ai';

import { GameSettingsContext } from '../states/GameSettingsContext';
import { TOGGLE_SOUND_EFFECT } from '../constants/gameSettingsActions.constant';

import IconButton from './IconButton';

interface SoundEffectButtonPropsType {
	size?: number;
}

function SoundEffectButton({
	size,
}: SoundEffectButtonPropsType): React.ReactElement {
	const { soundOptions, dispatchGameSettings } =
		useContext(GameSettingsContext);

	const toggleSoundEffect = () => {
		dispatchGameSettings({ type: TOGGLE_SOUND_EFFECT });
	};

	return (
		<IconButton
			isActive={soundOptions?.soundEffect}
			size={size}
			iconStrokeWidth={30}
			handleClick={toggleSoundEffect}
		>
			<AiFillSound />
		</IconButton>
	);
}

SoundEffectButton.defaultProps = {
	size: undefined,
};

export default SoundEffectButton;
