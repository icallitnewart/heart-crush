import React, { useContext, useEffect } from 'react';
import { styled } from 'styled-components';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SET_UNLOCKED_STAGE_NUMBER } from '../../constants/gameSettingsActions.constant';
import { POPUP } from '../../constants/screen.constant';

import Logo from '../../components/Logo';
import GameMenu from './GameMenu';
import SoundOptions from './SoundOptions';
import StagePopup from './StagePopup';

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
	const { popup, dispatchGameSettings } = useContext(GameSettingsContext);

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
			{popup === POPUP.STAGE && <StagePopup />}
		</>
	);
}

export default HomeScreen;
