import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';

import { StateErrorType } from '../types/common.type';
import { ERROR_SLICE } from '../constants/error.constant';

import { clearStageError } from '../redux/slices/stageSlice';
import { clearDisplayError } from '../redux/slices/displaySlice';
import { clearSoundError } from '../redux/slices/soundSlice';
import { clearGameError } from '../redux/slices/gameSlice';

import ErrorPortal from './ErrorPortal';

function StateErrorHandler({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	const dispatch = useAppDispatch();
	const stateError = useAppSelector(
		state =>
			state.stage.error ||
			state.display.error ||
			state.sound.error ||
			state.game.error,
	);

	const clearStateError = (error: StateErrorType) => {
		switch (error.sliceName) {
			case ERROR_SLICE.STAGE:
				dispatch(clearStageError());
				break;

			case ERROR_SLICE.DISPLAY:
				dispatch(clearDisplayError());
				break;

			case ERROR_SLICE.SOUND:
				dispatch(clearSoundError());
				break;

			case ERROR_SLICE.GAME:
				dispatch(clearGameError());
				break;
			default:
				break;
		}
	};

	return (
		<>
			{children}
			{stateError && (
				<ErrorPortal
					error={stateError}
					resetError={() => clearStateError(stateError)}
				/>
			)}
		</>
	);
}

export default StateErrorHandler;
