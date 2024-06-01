import React from 'react';
import styled from 'styled-components';

import PlayButton from './PlayButton';
import StagesButton from './StagesButton';
import CreditsButton from './CreditsButton';

const Container = styled.ul`
	width: 100%;
	padding: 80px 80px 60px;

	@media ${({ theme }) => theme.tablet} {
		padding: 80px 15vw 60px;
	}

	@media ${({ theme }) => theme.mobile} {
		padding: 70px clamp(40px, 15vw, 80px) 50px;
	}

	@media ${({ theme }) => theme.smallMobile} {
		padding: 50px clamp(40px, 15vw, 80px) 40px;
	}
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
				<PlayButton />
			</ButtonBox>
			<ButtonBox>
				<StagesButton />
			</ButtonBox>
			<ButtonBox>
				<CreditsButton />
			</ButtonBox>
		</Container>
	);
}

export default GameMenu;
