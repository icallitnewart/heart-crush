import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { StageNumberType } from '../../types/state.type';
import { SCREEN } from '../../constants/screen.constant';

import { switchScreen } from '../../redux/slices/displaySlice';
import { fetchStageConfig, setStageError } from '../../redux/slices/stageSlice';

import TextButton from '../../components/TextButton';

function PlayButton(): React.ReactElement {
	const dispatch = useAppDispatch();
	const unlockedMaxStageNumber: StageNumberType = useAppSelector(
		state => state.stage.unlockedStage.maxStageNumber,
	);

	const startGame = async () => {
		const result = await dispatch(fetchStageConfig(unlockedMaxStageNumber));
		if (fetchStageConfig.fulfilled.match(result)) {
			dispatch(switchScreen(SCREEN.GAME));
		} else if (fetchStageConfig.rejected.match(result)) {
			dispatch(setStageError(result.payload));
		}
	};

	return <TextButton handleClick={startGame}>Play</TextButton>;
}

export default PlayButton;
