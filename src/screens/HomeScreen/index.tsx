import React, { useContext, useEffect } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { StoreStateType } from '../../types/state.type';
import { SET_UNLOCKED_STAGE_NUMBER } from '../../constants/gameSettingsActions.constant';
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
	const { dispatchGameSettings } = useContext(GameSettingsContext);

	useEffect(() => {
		dispatchGameSettings({
			type: SET_UNLOCKED_STAGE_NUMBER,
		});
	}, [dispatchGameSettings]);

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
