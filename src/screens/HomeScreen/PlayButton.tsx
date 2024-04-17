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

	const startGame = async () => {
		const result = await dispatch(fetchStageConfig(unlockedMaxStageNumber));
		if (fetchStageConfig.fulfilled.match(result)) {
			dispatch(switchScreen(SCREEN.GAME));
		} else {
			// TODO: 에러 UI 처리
			console.error(result.error?.message);
			throw new Error('Failed to load stage data.');
		}
	};

	return <TextButton handleClick={startGame}>Play</TextButton>;
}

export default PlayButton;
