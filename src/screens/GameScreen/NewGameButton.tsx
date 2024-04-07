import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SELECT_STAGE } from '../../constants/gameSettingsActions.constant';

import { isStageNumberValid } from '../../utils/typeValidation';
import { closePopup } from '../../redux/slices/displaySlice';

import TextButton from '../../components/TextButton';

interface NewGameButtonPropsType {
	stageNumber: number;
	children: string;
}

function NewGameButton({
	stageNumber,
	children,
}: NewGameButtonPropsType): React.ReactElement {
	const dispatch = useDispatch();
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

		dispatch(closePopup());
	};

	return <TextButton handleClick={startGame}>{children}</TextButton>;
}

export default NewGameButton;
