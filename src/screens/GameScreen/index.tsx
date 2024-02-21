import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import useStageConfig from '../../hooks/useStageConfig';
import { POPUP } from '../../constants/screen.constant';
import { START_GAME } from '../../constants/gamePlayActions.constant';
import { GamePlayContext } from '../../states/GamePlayContext';

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
	const { popup, dispatchGamePlay } = useContext(GamePlayContext);
	const stage = useStageConfig();

	useEffect(() => {
		if (stage) {
			dispatchGamePlay({
				type: START_GAME,
				stage,
			});
		}
	}, [stage, dispatchGamePlay]);

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
