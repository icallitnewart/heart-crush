import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Status } from '../../types/status.type';
import { START_GAME } from '../../constants/gamePlay.constant';
import { GamePlayContext } from '../../states/GamePlayContext';

import Navigation from './Navigation';
import Information from './Information';
import Board from './Board';
import EndingAlertPopup from './EndingAlertPopup';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 20px 20px 30px;
	background-color: var(--sub-color-blue);
`;

interface GameScreenProps {
	moveToHome: (newStatus: Status) => void;
}

function GameScreen(props: GameScreenProps): React.ReactElement {
	const { result, dispatch } = useContext(GamePlayContext);
	console.log(`result: ${result}`);

	useEffect(() => {
		dispatch({
			type: START_GAME,
			stage: {
				columns: 8, // 고정
				rows: 20, // 수정 가능
				move: 1,
				goal: {
					score: 10,
				},
			},
		});
	}, [dispatch]);

	return (
		<>
			<Container>
				<Navigation />
				<Information />
				<Board />
			</Container>
			{result && <EndingAlertPopup />}
		</>
	);
}

export default GameScreen;
