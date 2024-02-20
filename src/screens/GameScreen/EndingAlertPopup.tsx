import React, { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { GamePlayContext } from '../../states/GamePlayContext';
import {
	ANIMATION_DELAY,
	ANIMATION_DURATION,
	TEXT,
} from '../../constants/settings.constant';
import {
	START_BONUS_TIME,
	ADD_BONUS_SCORE,
	END_BONUS_TIME_AND_OPEN_RESULT_POPUP,
} from '../../constants/gamePlayActions.constant';

import Logo from '../../components/Logo';
import BackgroundLayer from '../../components/BackgroundLayer';

const fadeInAnimation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-20%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;

const fadeOutAnimation = keyframes`
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(-20%);
	}
`;

const fadeInAndOutAnimationDuration = ANIMATION_DURATION.ENDING_ALERT;
const bonusScoreAnimationDuration = ANIMATION_DURATION.BONUS_SCORE;
const fadeInAnimationDelay = ANIMATION_DELAY.ENDING_ALERT_FADEIN;
const fadeOutAnimationDelay = ANIMATION_DELAY.ENDING_ALERT_FADEOUT;
const finishText = TEXT.ENDING_ALERT_FINISH;
const bonusText = TEXT.ENDING_ALERT_BONUS;

interface ContainerPropsType {
	$isVisible: boolean;
}

const Container = styled.div<ContainerPropsType>`
	${({ $isVisible }) => css`
		animation: ${$isVisible ? fadeInAnimation : fadeOutAnimation}
			${fadeInAndOutAnimationDuration}ms
			${$isVisible ? fadeInAnimationDelay : fadeOutAnimationDelay}ms forwards;
	`};
`;

interface AlertTextPropsType {
	$isFinish: boolean;
}

const AlertText = styled.h2<AlertTextPropsType>`
	position: relative;
	text-align: center;

	font-family: var(--main-font);
	font-size: 5em;
	letter-spacing: 1px;
	color: var(--sub-color-purple);
	-webkit-text-stroke: 1.3px #333;

	&::after {
		position: absolute;
		left: 50%;
		bottom: 0%;
		z-index: -1;
		transform: translateX(calc(-50% + 4px));
		content: '${({ $isFinish }) => ($isFinish ? finishText : bonusText)}';
		display: inline-block;
		clear: both;

		color: var(--sub-color-blue);
		-webkit-text-stroke: 1.3px #333;
		text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
	}
`;

function EndingAlertPopup(): React.ReactElement {
	const { isBonusTime, move, dispatch } = useContext(GamePlayContext);
	const [isVisible, setIsVisible] = useState(true);
	const isFinish = move === 0;

	// fade-in 애니메이션 효과가 끝나면 보너스 타임 활성화
	useEffect(() => {
		const animationTimer = setTimeout(() => {
			dispatch({ type: START_BONUS_TIME });
		}, fadeInAndOutAnimationDuration);

		return () => clearTimeout(animationTimer);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;

		if (isBonusTime) {
			if (move > 0) {
				// 보너스 점수 계산
				animationTimer = setTimeout(() => {
					dispatch({ type: ADD_BONUS_SCORE });
				}, bonusScoreAnimationDuration);
			} else {
				// fade-out 애니메이션 효과 적용
				setIsVisible(false);

				// fade-out 애니메이션 효과가 끝나면 보너스 타임 종료 및 결과 팝업 열기
				animationTimer = setTimeout(() => {
					dispatch({ type: END_BONUS_TIME_AND_OPEN_RESULT_POPUP });
				}, fadeOutAnimationDelay + fadeInAndOutAnimationDuration);
			}
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isBonusTime, move]);

	return (
		<BackgroundLayer opacity={0}>
			<Container $isVisible={isVisible}>
				<Logo fontSize="3em" textStroke={1.2} shouldTextShadow />
				<AlertText $isFinish={isFinish}>
					{isFinish ? finishText : bonusText}
				</AlertText>
			</Container>
		</BackgroundLayer>
	);
}

export default EndingAlertPopup;
