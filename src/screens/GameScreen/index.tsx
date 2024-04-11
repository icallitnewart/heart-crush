import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../redux/store';

import { GamePlayContext } from '../../states/GamePlayContext';
import { StoreStateType } from '../../types/state.type';
import { POPUP } from '../../constants/screen.constant';
import { START_GAME } from '../../constants/gamePlayActions.constant';
import { RESULT } from '../../constants/gameStatus.constant';
import { LAST_STAGE } from '../../constants/stage.constant';

import {
	getMaxStageNumberInLocalStorage,
	setMaxStageNumberInLocalStorage,
} from '../../utils/stageStorage';
import { openPopup } from '../../redux/slices/displaySlice';

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
	const dispatch = useDispatch();
	const popup = useSelector((state: StoreStateType) => state.display.popup);
	const currentStage = useAppSelector(
		(state: StoreStateType) => state.stage.currentStage,
	);
	const { currentStageNumber, result, dispatchGamePlay } =
		useContext(GamePlayContext);

	useEffect(() => {
		const stageConfig = currentStage.data;

		if (stageConfig) {
			dispatchGamePlay({
				type: START_GAME,
				stage: stageConfig,
			});
		}
	}, [currentStage, dispatchGamePlay]);

	// 게임 결과가 나오면 게임 종료 알림 문구 팝업 띄우기
	useEffect(() => {
		if (result) {
			dispatch(openPopup(POPUP.ENDING_ALERT));
		}
	}, [result, dispatch]);

	// 우승시 로컬 스토리지에 저장된 최대 진행 스테이지 업데이트
	useEffect(() => {
		if (currentStageNumber && result === RESULT.WIN) {
			const nextStageNumber = currentStageNumber + 1;
			const storedMaxStageNumber = getMaxStageNumberInLocalStorage();

			if (
				storedMaxStageNumber &&
				nextStageNumber <= LAST_STAGE &&
				storedMaxStageNumber < nextStageNumber
			) {
				setMaxStageNumberInLocalStorage(nextStageNumber);
			}
		}
	}, [result, currentStageNumber]);

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
