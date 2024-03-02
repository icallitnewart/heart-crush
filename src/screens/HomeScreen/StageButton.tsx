import React, { useContext } from 'react';
import { css, styled } from 'styled-components';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import {
	SELECT_STAGE,
	SWITCH_SCREEN,
} from '../../constants/gameSettingsActions.constant';
import { SCREEN } from '../../constants/screen.constant';
import { isStageNumberValid } from '../../utils/typeValidation';

interface ButtonStylePropsType {
	$isActive: boolean;
}

const Button = styled.button<ButtonStylePropsType>`
	width: 42px;
	height: 42px;
	cursor: pointer;

	background-color: var(--sub-color-purple);
	color: var(--main-color-yellow);
	text-shadow: 2px 2px 0px #777;
	-webkit-text-stroke: 0.5px #777;
	font-family: var(--sub-font);
	font-size: 1.3em;
	letter-spacing: 2px;
	border: 1px solid #888;
	border-radius: 100%;
	box-shadow: 2px 2px 0px #666;

	${({ $isActive }) =>
		$isActive &&
		css`
			text-shadow: 2px 2px 0px #666;
			background-color: var(--main-color-purple);

			&:hover {
				background-color: var(--sub-color-pink);
				color: var(--sub-color-blue);
			}
		`}
`;

interface StageButtonPropsType {
	stageNumber: number;
	isStageUnlocked: boolean;
	createAlertMessage: () => void;
	removeAlertMessage: () => void;
}

function StageButton({
	stageNumber,
	isStageUnlocked,
	createAlertMessage,
	removeAlertMessage,
}: StageButtonPropsType): React.ReactElement {
	const { dispatchGameSettings } = useContext(GameSettingsContext);
	const isStageLocked = !isStageUnlocked;

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
		dispatchGameSettings({ type: SWITCH_SCREEN, screen: SCREEN.GAME });
	};

	return (
		<Button
			$isActive={isStageUnlocked}
			onClick={startGame}
			disabled={isStageLocked}
			onMouseOver={() => isStageLocked && createAlertMessage()}
			onMouseOut={() => isStageLocked && removeAlertMessage()}
		>
			{stageNumber}
		</Button>
	);
}

export default StageButton;
