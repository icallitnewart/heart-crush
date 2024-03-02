import React, { useContext } from 'react';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SCREEN } from '../../constants/screen.constant';
import {
	SELECT_STAGE,
	SWITCH_SCREEN,
} from '../../constants/gameSettingsActions.constant';

import TextButton from '../../components/TextButton';

function PlayButton(): React.ReactElement {
	const { unlockedStageNumber, dispatchGameSettings } =
		useContext(GameSettingsContext);

	const startGame = () => {
		if (!unlockedStageNumber) {
			throw new Error('unlockedStageNumber가 존재하지 않습니다.');
		}

		dispatchGameSettings({
			type: SELECT_STAGE,
			selectedStageNumber: unlockedStageNumber,
		});
		dispatchGameSettings({ type: SWITCH_SCREEN, screen: SCREEN.GAME });
	};

	return <TextButton handleClick={startGame}>Play</TextButton>;
}

export default PlayButton;
