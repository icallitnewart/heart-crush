import React, { useContext } from 'react';
import { BiSolidHomeHeart } from 'react-icons/bi';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { OPEN_POPUP } from '../../constants/gameSettingsActions.constant';
import { POPUP } from '../../constants/screen.constant';

import IconButton from '../../components/IconButton';

function HomeButton(): React.ReactElement {
	const { dispatchGameSettings } = useContext(GameSettingsContext);

	const moveToHome = () => {
		dispatchGameSettings({ type: OPEN_POPUP, popup: POPUP.EXIT_GAME });
	};

	return (
		<IconButton iconSize={24} handleClick={moveToHome}>
			<BiSolidHomeHeart />
		</IconButton>
	);
}

export default HomeButton;
