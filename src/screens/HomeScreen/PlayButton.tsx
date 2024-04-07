import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SCREEN } from '../../constants/screen.constant';
import { SELECT_STAGE } from '../../constants/gameSettingsActions.constant';

import { switchScreen } from '../../redux/slices/displaySlice';

import TextButton from '../../components/TextButton';

function PlayButton(): React.ReactElement {
	const dispatch = useDispatch();
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
		dispatch(switchScreen(SCREEN.GAME));
	};

	return <TextButton handleClick={startGame}>Play</TextButton>;
}

export default PlayButton;
