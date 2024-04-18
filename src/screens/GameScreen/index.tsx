import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { POPUP } from '../../constants/screen.constant';
import { RESULT } from '../../constants/gameStatus.constant';
import { LAST_STAGE } from '../../constants/stage.constant';

import { openPopup } from '../../redux/slices/displaySlice';
import { setUnlockedStage } from '../../redux/slices/stageSlice';
import { startGame } from '../../redux/slices/gameSlice';

import Navigation from './Navigation';
import Information from './Information';
import Board from './Board';
import EndingAlertPopup from './EndingAlertPopup';
import ResultPopup from './ResultPopup';
import ExitGamePopup from './ExitGamePopup';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 20px 20px 30px;
	background-color: var(--sub-color-blue);
`;

function GameScreen(): React.ReactElement {
	const dispatch = useAppDispatch();
	const popup = useAppSelector(state => state.display.popup);
	const unlockedMaxStageNumber = useAppSelector(
		state => state.stage.unlockedStage.maxStageNumber,
	);
	const stage = useAppSelector(state => state.stage.currentStage.data);
	const result = useAppSelector(state => state.game.result);

	useEffect(() => {
		if (stage) {
			dispatch(startGame(stage));
		}
	}, [stage, dispatch]);

	// 게임 결과가 나오면 게임 종료 알림 문구 팝업 띄우기
	useEffect(() => {
		if (result) {
			dispatch(openPopup(POPUP.ENDING_ALERT));
		}
	}, [result, dispatch]);

	// 우승시 잠금 해제된 최대 진행 스테이지 업데이트
	useEffect(() => {
		const currentStageNumber = stage?.stageNumber;
		if (currentStageNumber && result === RESULT.WIN) {
			const nextStageNumber = currentStageNumber + 1;

			if (
				unlockedMaxStageNumber &&
				nextStageNumber <= LAST_STAGE &&
				unlockedMaxStageNumber < nextStageNumber
			) {
				dispatch(setUnlockedStage(nextStageNumber));
			}
		}
	}, [result, stage, unlockedMaxStageNumber, dispatch]);

	return (
		<>
			<Container>
				<Navigation />
				<Information />
				<Board />
			</Container>
			{popup === POPUP.ENDING_ALERT && <EndingAlertPopup />}
			{popup === POPUP.RESULT && <ResultPopup />}
			{popup === POPUP.EXIT_GAME && <ExitGamePopup />}
		</>
	);
}

export default GameScreen;
