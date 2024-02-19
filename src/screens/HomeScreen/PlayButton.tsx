import React, { useContext } from 'react';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { GAME_SCREEN } from '../../constants/screen.constant';
import {
	SELECT_STAGE,
	SWITCH_SCREEN,
} from '../../constants/gameSettings.constant';

import TextButton from '../../components/TextButton';

function PlayButton(): React.ReactElement {
	const { maxStageNumber, dispatch } = useContext(GameSettingsContext);

	const handleClick = () => {
		if (!maxStageNumber) {
			throw new Error('maxStageNumber가 존재하지 않습니다.');
		}

		dispatch({ type: SELECT_STAGE, selectedStageNumber: maxStageNumber });
		dispatch({ type: SWITCH_SCREEN, screen: GAME_SCREEN });
	};

	return <TextButton handleClick={handleClick}>Play</TextButton>;
}

export default PlayButton;
