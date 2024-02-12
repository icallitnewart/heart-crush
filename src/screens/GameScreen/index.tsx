import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Status } from '../../types/status.type';
import { START_GAME } from '../../constants/gamePlay.constant';
import { GamePlayContext } from '../../states/GamePlayContext';

import Navigation from './Navigation';
import Information from './Information';
import Board from './Board';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 480px;
	height: 100vh;
	max-height: 900px;
	padding: 20px 20px 30px;
	background-color: var(--sub-color-blue);
`;

interface GameScreenProps {
	moveToHome: (newStatus: Status) => void;
}

function GameScreen(props: GameScreenProps): React.ReactElement {
	const { dispatch } = useContext(GamePlayContext);

	useEffect(() => {
		dispatch({
			type: START_GAME,
			stage: {
				columns: 8, // 고정
				rows: 20, // 수정 가능
				move: 20,
				goal: {
					score: 800,
				},
			},
		});
	}, [dispatch]);

	return (
		<Container>
			<Navigation />
			<Information />
			<Board />
		</Container>
	);
}

export default GameScreen;
