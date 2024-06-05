import React from 'react';
import { AiFillSound } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../redux/store';

import { toggleSoundEffect } from '../redux/slices/soundSlice';

import IconButton from './IconButton';

interface SoundEffectButtonPropsType {
	size?: number;
}

function SoundEffectButton({
	size,
}: SoundEffectButtonPropsType): React.ReactElement {
	const dispatch = useAppDispatch();
	const soundEffect = useAppSelector(state => state.sound.soundEffect);

	const controlSoundEffect = () => {
		dispatch(toggleSoundEffect());
	};

	return (
		<IconButton
			isActive={soundEffect}
			size={size}
			iconStrokeWidth={30}
			handleClick={controlSoundEffect}
		>
			<AiFillSound />
		</IconButton>
	);
}

SoundEffectButton.defaultProps = {
	size: undefined,
};

export default SoundEffectButton;
