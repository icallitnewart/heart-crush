import React from 'react';
import { BiSolidMusic } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../redux/store';

import { toggleBgMusic } from '../redux/slices/soundSlice';

import IconButton from './IconButton';

interface MusicButtonPropsType {
	size?: number;
}

function MusicButton({ size }: MusicButtonPropsType): React.ReactElement {
	const dispatch = useAppDispatch();
	const bgMusic = useAppSelector(state => state.sound.bgMusic);

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
