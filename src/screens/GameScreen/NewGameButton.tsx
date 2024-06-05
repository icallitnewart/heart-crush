import React from 'react';
import { useAppDispatch } from '../../redux/store';

import { ERROR_REASON } from '../../constants/error.constant';

import { isStageNumberValid } from '../../utils/typeValidation';
import { closePopup } from '../../redux/slices/displaySlice';
import { fetchStageConfig, setStageError } from '../../redux/slices/stageSlice';

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
			const error = {
				reason: ERROR_REASON.INVALID_STAGE_NUMBER,
				message: 'stageNumber is null or undefined.',
			};
			dispatch(setStageError(error));
			return;
		}

		if (!isStageNumberValid(stageNumber)) {
			const error = {
				reason: ERROR_REASON.INVALID_STAGE_NUMBER,
				message: 'stageNumber is invalid.',
			};
			dispatch(setStageError(error));
			return;
		}

		dispatch(fetchStageConfig(stageNumber));
		dispatch(closePopup());
	};

	return <TextButton handleClick={startGame}>{children}</TextButton>;
}

export default NewGameButton;
