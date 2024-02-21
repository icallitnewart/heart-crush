import React, { useContext } from 'react';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SCREEN } from '../../constants/screen.constant';
import {
	SELECT_STAGE,
	SWITCH_SCREEN,
} from '../../constants/gameSettingsActions.constant';

import TextButton from '../../components/TextButton';

function PlayButton(): React.ReactElement {
	const { maxStageNumber, dispatchGameSettings } =
		useContext(GameSettingsContext);

	const handleClick = () => {
		if (!maxStageNumber) {
			throw new Error('maxStageNumber가 존재하지 않습니다.');
		}

		dispatchGameSettings({
			type: SELECT_STAGE,
			selectedStageNumber: maxStageNumber,
		});
		dispatchGameSettings({ type: SWITCH_SCREEN, screen: SCREEN.GAME });
	};

	return <TextButton handleClick={handleClick}>Play</TextButton>;
}

export default PlayButton;
