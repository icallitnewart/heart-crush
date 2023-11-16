import React from 'react';
import styled from 'styled-components';

import { Status } from '../../types/status';

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
	return (
		<Container>
			<Navigation />
			<Information />
			<Board />
		</Container>
	);
}

export default GameScreen;
