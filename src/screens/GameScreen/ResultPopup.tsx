import React, { useContext } from 'react';
import styled from 'styled-components';

import { GamePlayContext } from '../../states/GamePlayContext';
import { RESULT } from '../../constants/gameStatus.constant';
import { TEXT } from '../../constants/ui.constant';

import BackgroundLayer from '../../components/BackgroundLayer';
import PopupBox from '../../components/PopupBox';
import TextButton from '../../components/TextButton';
import NextButton from './NextButton';

const victoryText = TEXT.RESULT_WIN;
const defeatText = TEXT.RESULT_LOSE;

const ResultContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 30px 40px 35px;
`;

interface ResultTextStylePropsType {
	$isVictory: boolean;
}

const ResultText = styled.h1<ResultTextStylePropsType>`
	position: relative;
	z-index: 9;
	margin-bottom: 5px;

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
		content: '${({ $isVictory }) => ($isVictory ? victoryText : defeatText)}';
		display: inline-block;
		clear: both;

		color: var(--sub-color-purple);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}
`;

const ScoreText = styled.h2`
	text-align: center;

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

	button {
		max-width: 200px;
		margin: 0px 10px;
	}
`;

function ResultPopup() {
	const { score, result } = useContext(GamePlayContext);
	const isVictory = result === RESULT.WIN;

	return (
		<BackgroundLayer opacity={0.8}>
			<PopupBox>
				<ResultContainer>
					<ResultText $isVictory={isVictory}>
						<span>{isVictory ? victoryText : defeatText}</span>
					</ResultText>
					<ScoreText>{score}</ScoreText>
					<ButtonContainer>
						<TextButton>Retry</TextButton>
						{isVictory && <NextButton />}
					</ButtonContainer>
				</ResultContainer>
			</PopupBox>
		</BackgroundLayer>
	);
}

export default ResultPopup;
