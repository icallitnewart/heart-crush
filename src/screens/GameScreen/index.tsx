import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import useStageConfig from '../../hooks/useStageConfig';
import { POPUP } from '../../constants/status.constant';
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
	const { popup, dispatch } = useContext(GamePlayContext);
	const stage = useStageConfig();

	useEffect(() => {
		if (stage) {
			dispatch({
				type: START_GAME,
				stage,
			});
		}
	}, [stage, dispatch]);

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
