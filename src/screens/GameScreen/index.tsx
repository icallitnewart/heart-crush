import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { GamePlayContext } from '../../states/GamePlayContext';
import { GameSettingsContext } from '../../states/GameSettingsContext';
import useStageConfig from '../../hooks/useStageConfig';
import { POPUP } from '../../constants/screen.constant';
import { START_GAME } from '../../constants/gamePlayActions.constant';
import { OPEN_POPUP } from '../../constants/gameSettingsActions.constant';
import { RESULT } from '../../constants/gameStatus.constant';
import {
	getMaxStageNumberInLocalStorage,
	setMaxStageNumberInLocalStorage,
} from '../../utils/stageStorage';

import Navigation from './Navigation';
import Information from './Information';
import Board from './Board';
import EndingAlertPopup from './EndingAlertPopup';
import ResultPopup from './ResultPopup';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 20px 20px 30px;
	background-color: var(--sub-color-blue);
`;

function GameScreen(): React.ReactElement {
	const { popup, dispatchGameSettings } = useContext(GameSettingsContext);
	const { currentStageNumber, result, dispatchGamePlay } =
		useContext(GamePlayContext);
	const stage = useStageConfig();

	useEffect(() => {
		if (stage) {
			dispatchGamePlay({
				type: START_GAME,
				stage,
			});
		}
	}, [stage, dispatchGamePlay]);

	// 게임 결과가 나오면 게임 종료 알림 문구 팝업 띄우기
	useEffect(() => {
		if (result) {
			dispatchGameSettings({ type: OPEN_POPUP, popup: POPUP.ENDING_ALERT });
		}
	}, [result, dispatchGameSettings]);

	// 우승시 로컬 스토리지에 저장된 최대 진행 스테이지 업데이트
	useEffect(() => {
		if (currentStageNumber && result === RESULT.WIN) {
			const nextStageNumber = currentStageNumber + 1;
			const storedMaxStageNumber = getMaxStageNumberInLocalStorage();

			if (storedMaxStageNumber && storedMaxStageNumber < nextStageNumber) {
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
		</>
	);
}

export default GameScreen;
