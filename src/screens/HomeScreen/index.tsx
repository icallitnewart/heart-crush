import React from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

import { StoreStateType } from '../../types/state.type';
import { POPUP } from '../../constants/screen.constant';

import Logo from '../../components/Logo';
import GameMenu from './GameMenu';
import SoundOptions from './SoundOptions';
import StagePopup from './StagePopup';
import SoundAlertPopup from './SoundAlertPopup';
import CreditsPopup from './CreditsPopup';

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
	const popup = useSelector((state: StoreStateType) => state.display.popup);

	return (
		<>
			<Background>
				<Container>
					<Logo fontSize="3em" />
					<GameMenu />
					<SoundOptions />
				</Container>
			</Background>
			{popup === POPUP.SOUND_ALERT && <SoundAlertPopup />}
			{popup === POPUP.STAGE && <StagePopup />}
			{popup === POPUP.CREDITS && <CreditsPopup />}
		</>
	);
}

export default HomeScreen;
