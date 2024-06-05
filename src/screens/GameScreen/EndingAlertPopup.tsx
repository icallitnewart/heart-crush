import React, { useContext, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import {
	ANIMATION_DELAY,
	ANIMATION_DURATION,
	TEXT,
} from '../../constants/ui.constant';
import { POPUP } from '../../constants/screen.constant';
import { SOUND_EFFECT_TYPE } from '../../constants/audio.constant';

import { BgMusicContext, SoundEffectContext } from '../../context/SoundManager';
import { openPopup } from '../../redux/slices/displaySlice';
import {
	addBonusScore,
	endBonusTime,
	startBonusTime,
} from '../../redux/slices/gameSlice';

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
	const dispatch = useAppDispatch();
	const move = useAppSelector(state => state.game.move);
	const isBonusTime = useAppSelector(state => state.game.isBonusTime);
	const { playSoundEffect } = useContext(SoundEffectContext);
	const { fadeOutBgMusic } = useContext(BgMusicContext);
	const [isVisible, setIsVisible] = useState(true);
	const isFinish = move === 0;

	// fade-in 애니메이션 효과가 끝나면 보너스 타임 활성화
	useEffect(() => {
		const animationTimer = setTimeout(() => {
			dispatch(startBonusTime());
		}, fadeInAndOutAnimationDuration);

		return () => clearTimeout(animationTimer);
	}, [dispatch]);

	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;

		if (isBonusTime) {
			if (move > 0) {
				// 하나의 MOVE를 위한 보너스 점수 카운팅 애니메이션 효과가 끝나면
				// 새로운 MOVE를 위한 보너스 점수 추가 및 효과음 재생
				animationTimer = setTimeout(() => {
					dispatch(addBonusScore());
					playSoundEffect(SOUND_EFFECT_TYPE.BONUS_SCORE);
				}, bonusScoreAnimationDuration);
			} else {
				// 배경 음악 fade-out 및 제거
				fadeOutBgMusic();
				// fade-out 애니메이션 효과 적용
				setIsVisible(false);

				// fade-out 애니메이션 효과가 끝나면
				// 보너스 타임 종료 및 결과 팝업 열기
				animationTimer = setTimeout(() => {
					dispatch(endBonusTime());
					dispatch(openPopup(POPUP.RESULT));
				}, fadeOutAnimationDelay + fadeInAndOutAnimationDuration);
			}
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};
	}, [isBonusTime, move, dispatch, fadeOutBgMusic, playSoundEffect]);

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
