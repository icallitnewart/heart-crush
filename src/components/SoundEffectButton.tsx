import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillSound } from 'react-icons/ai';

import { StoreStateType } from '../types/state.type';

import { toggleSoundEffect } from '../redux/slices/soundSlice';

import IconButton from './IconButton';

interface SoundEffectButtonPropsType {
	size?: number;
}

function SoundEffectButton({
	size,
}: SoundEffectButtonPropsType): React.ReactElement {
	const dispatch = useDispatch();
	const soundEffect = useSelector(
		(state: StoreStateType) => state.sound.soundEffect,
	);

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
