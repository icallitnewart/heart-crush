import React from 'react';
import styled from 'styled-components';

import { Status } from '../../types/status';

import Navigation from './Navigation';
import Information from './Information';
import Board from './Board';

const Container = styled.div`
	width: 100%;
	max-width: 480px;
	height: 900px; //모바일에 맞게 수정 필요
	background-color: pink;
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
