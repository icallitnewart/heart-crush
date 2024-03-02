import React, { useContext } from 'react';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import {
	CLOSE_POPUP,
	SELECT_STAGE,
} from '../../constants/gameSettingsActions.constant';
import { isStageNumberValid } from '../../utils/typeValidation';

import TextButton from '../../components/TextButton';

interface NewGameButtonPropsType {
	stageNumber: number;
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

		if (!isStageNumberValid(stageNumber)) {
			throw new Error('유효하지 않은 stageNumber입니다.');
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
