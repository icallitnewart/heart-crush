import React, { useContext } from 'react';
import { css, styled } from 'styled-components';
import { useDispatch } from 'react-redux';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SoundEffectContext } from '../../context/SoundManager';
import { SELECT_STAGE } from '../../constants/gameSettingsActions.constant';
import { SCREEN } from '../../constants/screen.constant';
import { SOUND_EFFECT_TYPE } from '../../constants/audio.constant';

import { isStageNumberValid } from '../../utils/typeValidation';
import { switchScreen } from '../../redux/slices/displaySlice';

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

function StageNumberButton({
	stageNumber,
	isStageUnlocked,
	createAlertMessage,
	removeAlertMessage,
}: StageButtonPropsType): React.ReactElement {
	const dispatch = useDispatch();
	const { dispatchGameSettings } = useContext(GameSettingsContext);
	const { playSoundEffect } = useContext(SoundEffectContext);
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
		dispatch(switchScreen(SCREEN.GAME));
	};

	return (
		<Button
			$isActive={isStageUnlocked}
			onClick={startGame}
			disabled={isStageLocked}
			onMouseEnter={() => playSoundEffect(SOUND_EFFECT_TYPE.MOUSE_HOVER)}
			onMouseOver={() => isStageLocked && createAlertMessage()}
			onMouseOut={() => isStageLocked && removeAlertMessage()}
		>
			{stageNumber}
		</Button>
	);
}

export default StageNumberButton;
