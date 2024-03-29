import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { GamePlayContext } from '../../states/GamePlayContext';
import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SOUND_EFFECT_TYPE } from '../../constants/audio.constant';
import { RESULT } from '../../constants/gameStatus.constant';
import { ANIMATION_DURATION, TEXT } from '../../constants/ui.constant';
import { LAST_STAGE } from '../../constants/stage.constant';

import BackgroundLayer from '../../components/BackgroundLayer';
import PopupBox from '../../components/PopupBox';
import NewGameButton from './NewGameButton';
import Confetti from './Confetti';

const victoryText = TEXT.RESULT_WIN;
const defeatText = TEXT.RESULT_LOSE;
const gameClearText = TEXT.GAME_CLEAR;

const getResultText = (isVictory: boolean, isGameClear: boolean) => {
	if (isVictory) {
		return isGameClear ? gameClearText : victoryText;
	}
	return defeatText;
};

const ResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 30px 40px 35px;
`;

const ResultText = styled.h1`
	position: relative;
	z-index: 9;
	margin-bottom: 30px;

	font-style: italic;
	color: var(--main-color-yellow);
	-webkit-text-stroke: 1.3px #333;
	font-size: 3em;
	font-family: var(--main-font);
	letter-spacing: 3px;
	text-align: center;

	&::after {
		position: absolute;
		top: 2px;
		left: 50%;
		z-index: -1;
		transform: translateX(calc(-50% + 2px));
		content: attr(data-text);
		display: inline-block;
		width: 100%;
		clear: both;

		color: var(--sub-color-purple);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}
`;

const ScoreText = styled.h2`
	text-align: center;
	margin-bottom: 30px;

	font-size: 2.8em;
	font-family: var(--sub-font);
	color: var(--sub-color-pink);
	letter-spacing: 8px;
	-webkit-text-stroke: 1.3px #666;
	text-shadow: 2px 2px 0px #666;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 5px;

	button {
		max-width: 200px;
		margin: 0px 10px;
	}
`;

function ResultPopup() {
	const { currentStageNumber, score, result } = useContext(GamePlayContext);
	const [confetti, setConfetti] = useState(false);
	const { playSoundEffect, stopSoundEffect } = useContext(GameSettingsContext);
	const isVictory = result === RESULT.WIN;
	const isLastStage = currentStageNumber === LAST_STAGE;
	const isGameClear = isVictory && isLastStage;
	const resultText = getResultText(isVictory, isGameClear);

	useEffect(() => {
		const getSoundEffectType = () => {
			switch (result) {
				case RESULT.WIN:
					return isLastStage
						? SOUND_EFFECT_TYPE.GAME_CLEAR
						: SOUND_EFFECT_TYPE.RESULT_WIN;
				case RESULT.LOSE:
					return SOUND_EFFECT_TYPE.RESULT_LOSE;
				default:
					return null;
			}
		};

		const soundEffectType = getSoundEffectType();
		if (soundEffectType) playSoundEffect(soundEffectType);

		return () => {
			if (soundEffectType) stopSoundEffect(soundEffectType);
		};
	}, [playSoundEffect, stopSoundEffect, result, isLastStage]);

	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;

		if (isGameClear) {
			setConfetti(true);

			animationTimer = setTimeout(() => {
				setConfetti(false);
			}, ANIMATION_DURATION.CONFETTI);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};
	}, [isGameClear]);

	return (
		<>
			<BackgroundLayer opacity={0.8}>
				<PopupBox>
					<ResultContainer>
						<ResultText data-text={resultText}>
							<span>{resultText}</span>
						</ResultText>
						<ScoreText>{score}</ScoreText>
						{currentStageNumber && (
							<ButtonContainer>
								<NewGameButton stageNumber={currentStageNumber}>
									Retry
								</NewGameButton>
								{isVictory && !isLastStage && (
									<NewGameButton stageNumber={currentStageNumber + 1}>
										Next
									</NewGameButton>
								)}
							</ButtonContainer>
						)}
					</ResultContainer>
				</PopupBox>
			</BackgroundLayer>
			{confetti && <Confetti />}
		</>
	);
}

export default ResultPopup;
