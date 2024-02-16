import React from 'react';
import { styled } from 'styled-components';

import Logo from '../../components/Logo';
import GameMenu from './GameMenu';
import SoundOptions from './SoundOptions';

const Background = styled.div`
	width: 100%;
	height: 100%;
	padding-top: 20vh;

	background-color: var(--sub-color-blue);
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

function HomeScreen(): React.ReactElement {
	return (
		<Background>
			<Container>
				<Logo fontSize="3em" />
				<GameMenu />
				<SoundOptions />
			</Container>
		</Background>
	);
}

export default HomeScreen;
