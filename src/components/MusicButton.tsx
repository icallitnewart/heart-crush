import React, { useContext } from 'react';
import { BiSolidMusic } from 'react-icons/bi';

import { GameSettingsContext } from '../states/GameSettingsContext';
import { TOGGLE_BG_MUSIC } from '../constants/gameSettingsActions.constant';

import IconButton from './IconButton';

interface MusicButtonPropsType {
	size?: number;
}

function MusicButton({ size }: MusicButtonPropsType): React.ReactElement {
	const { soundOptions, dispatchGameSettings } =
		useContext(GameSettingsContext);

	const toggleBgMusic = () => {
		dispatchGameSettings({ type: TOGGLE_BG_MUSIC });
	};

	return (
		<IconButton
			isActive={soundOptions?.bgMusic}
			size={size}
			handleClick={toggleBgMusic}
		>
			<BiSolidMusic />
		</IconButton>
	);
}

MusicButton.defaultProps = {
	size: undefined,
};

export default MusicButton;
