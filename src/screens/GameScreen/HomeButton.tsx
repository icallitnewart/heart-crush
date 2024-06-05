import React from 'react';
import { BiSolidHomeHeart } from 'react-icons/bi';
import { useAppDispatch } from '../../redux/store';

import { POPUP } from '../../constants/screen.constant';

import { openPopup } from '../../redux/slices/displaySlice';

import IconButton from '../../components/IconButton';

function HomeButton(): React.ReactElement {
	const dispatch = useAppDispatch();

	const moveToHome = () => {
		dispatch(openPopup(POPUP.EXIT_GAME));
	};

	return (
		<IconButton iconSize={24} handleClick={moveToHome}>
			<BiSolidHomeHeart />
		</IconButton>
	);
}

export default HomeButton;
