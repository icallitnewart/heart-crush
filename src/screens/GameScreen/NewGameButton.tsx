import React, { useContext } from 'react';

import { GamePlayContext } from '../../states/GamePlayContext';
import { GameSettingsContext } from '../../states/GameSettingsContext';
import { StageNumberType } from '../../types/gamePlayStates.type';
import {
	CLOSE_POPUP,
	SELECT_STAGE,
} from '../../constants/gameSettingsActions.constant';

import TextButton from '../../components/TextButton';

interface NewGameButtonPropsType {
	stageNumber: StageNumberType;
	children: string;
}

function NewGameButton({
	stageNumber,
	children,
}: NewGameButtonPropsType): React.ReactElement {
	const { dispatchGameSettings } = useContext(GameSettingsContext);

	const startGame = () => {
		if (!stageNumber) {
			throw new Error('stageNumber 정보가 존재하지 않습니다.');
		}

		dispatchGameSettings({
			type: SELECT_STAGE,
			selectedStageNumber: stageNumber,
		});

		dispatchGameSettings({ type: CLOSE_POPUP });
	};

	return <TextButton handleClick={startGame}>{children}</TextButton>;
}

export default NewGameButton;
