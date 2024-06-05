import React, { useContext } from 'react';
import { css, styled } from 'styled-components';
import { useAppDispatch } from '../../redux/store';

import { SoundEffectContext } from '../../context/SoundManager';
import { SCREEN } from '../../constants/screen.constant';
import { SOUND_EFFECT_TYPE } from '../../constants/audio.constant';
import { ERROR_REASON } from '../../constants/error.constant';

import { isStageNumberValid } from '../../utils/typeValidation';
import { closePopup, switchScreen } from '../../redux/slices/displaySlice';
import { fetchStageConfig, setStageError } from '../../redux/slices/stageSlice';

interface ButtonStylePropsType {
	$isActive: boolean;
}

const Button = styled.button<ButtonStylePropsType>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 42px;
	height: 42px;
	cursor: pointer;

	@media ${({ theme }) => theme.smallMobile} {
		width: 40px;
		height: 40px;
		font-size: 1.2em;
	}

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
	const dispatch = useAppDispatch();
	const { playSoundEffect } = useContext(SoundEffectContext);
	const isStageLocked = !isStageUnlocked;

	const startGame = async () => {
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

		const result = await dispatch(fetchStageConfig(stageNumber));
		if (fetchStageConfig.fulfilled.match(result)) {
			dispatch(closePopup());
			dispatch(switchScreen(SCREEN.GAME));
		} else if (fetchStageConfig.rejected.match(result)) {
			dispatch(setStageError(result.payload));
		}
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
