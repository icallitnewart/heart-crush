import React from 'react';
import { styled } from 'styled-components';
import { useAppSelector } from '../../redux/store';

import { POPUP } from '../../constants/screen.constant';

import Logo from '../../components/Logo';
import GameMenu from './GameMenu';
import SoundOptions from './SoundOptions';
import Footer from '../../components/Footer';
import StagePopup from './StagePopup';
import SoundAlertPopup from './SoundAlertPopup';
import CreditsPopup from './CreditsPopup';

const Container = styled.div`
	width: 100%;
	height: 100%;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100% - 25px);
`;

function HomeScreen(): React.ReactElement {
	const popup = useAppSelector(state => state.display.popup);

	return (
		<>
			<Container>
				<Wrapper>
					<Logo fontSize="3em" />
					<GameMenu />
					<SoundOptions />
				</Wrapper>
				<Footer />
			</Container>
			{popup === POPUP.SOUND_ALERT && <SoundAlertPopup />}
			{popup === POPUP.STAGE && <StagePopup />}
			{popup === POPUP.CREDITS && <CreditsPopup />}
		</>
	);
}

export default HomeScreen;
