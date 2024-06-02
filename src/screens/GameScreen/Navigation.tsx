import React from 'react';
import styled from 'styled-components';

import Logo from '../../components/Logo';
import Stage from './Stage';
import HomeButton from './HomeButton';
import SoundEffectButton from '../../components/SoundEffectButton';
import MusicButton from '../../components/MusicButton';

const Container = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 60px;
	margin-bottom: 10px;
`;

const ControlButtons = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 140px;
	height: 100%;

	@media ${({ theme }) => theme.mobile} {
		width: 130px;
	}
`;

function Navigation(): React.ReactElement {
	return (
		<Container>
			<Stage />
			<Logo shouldFlexGrow />
			<ControlButtons>
				<HomeButton />
				<SoundEffectButton />
				<MusicButton />
			</ControlButtons>
		</Container>
	);
}

export default Navigation;
