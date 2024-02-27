import React, { useContext } from 'react';

import { GamePlayContext } from '../../states/GamePlayContext';
import { GameSettingsContext } from '../../states/GameSettingsContext';
import {
	CLOSE_POPUP,
	SELECT_STAGE,
} from '../../constants/gameSettingsActions.constant';

import TextButton from '../../components/TextButton';

function NextButton() {
	const { currentStageNumber } = useContext(GamePlayContext);
	const { dispatchGameSettings } = useContext(GameSettingsContext);

	const startNextGame = () => {
		if (!currentStageNumber)
			throw new Error('currentStageNumber 정보가 존재하지 않습니다.');

		// 다음 스테이지로 이동 및 팝업 닫기
		const nextStageNumber = currentStageNumber + 1;
		dispatchGameSettings({
			type: SELECT_STAGE,
			selectedStageNumber: nextStageNumber,
		});

		dispatchGameSettings({
			type: CLOSE_POPUP,
		});
	};

	return <TextButton handleClick={startNextGame}>Next</TextButton>;
}

export default NextButton;
