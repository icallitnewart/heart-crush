import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { StageNumberType, StoreStateType } from '../../types/state.type';
import { SCREEN } from '../../constants/screen.constant';

import { switchScreen } from '../../redux/slices/displaySlice';
import { fetchStageConfig } from '../../redux/slices/stageSlice';

import TextButton from '../../components/TextButton';

function PlayButton(): React.ReactElement {
	const dispatch = useAppDispatch();
	const unlockedMaxStageNumber: StageNumberType = useAppSelector(
		(state: StoreStateType) => state.stage.unlockedStage.maxStageNumber,
	);

	const startGame = () => {
		dispatch(fetchStageConfig(unlockedMaxStageNumber));
		dispatch(switchScreen(SCREEN.GAME));
	};

	return <TextButton handleClick={startGame}>Play</TextButton>;
}

export default PlayButton;
