import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidMusic } from 'react-icons/bi';

import { StoreStateType } from '../types/state.type';

import { toggleBgMusic } from '../redux/slices/soundSlice';

import IconButton from './IconButton';

interface MusicButtonPropsType {
	size?: number;
}

function MusicButton({ size }: MusicButtonPropsType): React.ReactElement {
	const dispatch = useDispatch();
	const bgMusic = useSelector((state: StoreStateType) => state.sound.bgMusic);

	const controlBgMusic = () => {
		dispatch(toggleBgMusic());
	};

	return (
		<IconButton isActive={bgMusic} size={size} handleClick={controlBgMusic}>
			<BiSolidMusic />
		</IconButton>
	);
}

MusicButton.defaultProps = {
	size: undefined,
};

export default MusicButton;
