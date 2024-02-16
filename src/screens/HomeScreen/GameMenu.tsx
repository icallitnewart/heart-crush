import React from 'react';
import styled from 'styled-components';

import NewGameButton from './NewGameButton';
import ContinueButton from './ContinueButton';

const Container = styled.ul`
	width: 100%;
	padding: clamp(50px, 20vw, 100px) clamp(50px, 15vw, 100px)
		clamp(30px, 10vw, 80px);
`;

const ButtonBox = styled.li`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 15px 25px;

	button {
		height: 50px;
		border-radius: 50px;
	}
`;

function GameMenu(): React.ReactElement {
	return (
		<Container>
			<ButtonBox>
				<NewGameButton />
			</ButtonBox>
			<ButtonBox>
				<ContinueButton />
			</ButtonBox>
		</Container>
	);
}

export default GameMenu;
