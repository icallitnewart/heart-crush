import React from 'react';
import { useDispatch } from 'react-redux';
import { BiSolidHomeHeart } from 'react-icons/bi';

import { POPUP } from '../../constants/screen.constant';

import { openPopup } from '../../redux/slices/displaySlice';

import IconButton from '../../components/IconButton';

function HomeButton(): React.ReactElement {
	const dispatch = useDispatch();

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
