import React from 'react';
import { useAppDispatch } from '../../redux/store';

import { isStageNumberValid } from '../../utils/typeValidation';
import { closePopup } from '../../redux/slices/displaySlice';
import { fetchStageConfig } from '../../redux/slices/stageSlice';

import TextButton from '../../components/TextButton';

interface NewGameButtonPropsType {
	stageNumber: number;
	children: string;
}

function NewGameButton({
	stageNumber,
	children,
}: NewGameButtonPropsType): React.ReactElement {
	const dispatch = useAppDispatch();

	const startGame = () => {
		if (!stageNumber) {
			throw new Error('stageNumber 정보가 존재하지 않습니다.');
		}

		if (!isStageNumberValid(stageNumber)) {
			throw new Error('유효하지 않은 stageNumber입니다.');
		}

		dispatch(fetchStageConfig(stageNumber));
		dispatch(closePopup());
	};

	return <TextButton handleClick={startGame}>{children}</TextButton>;
}

export default NewGameButton;
