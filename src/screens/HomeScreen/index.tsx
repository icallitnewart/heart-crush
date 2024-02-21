import React, { useContext, useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { SET_MAX_STAGE_NUMBER } from '../../constants/gameSettingsActions.constant';

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
	const [stagePopup, setStagePopup] = useState(false);
	const { dispatchGameSettings } = useContext(GameSettingsContext);

	useEffect(() => {
		const storedMaxStageNumber = localStorage.getItem('maxStageNumber');
		let maxStageNumber;

		if (storedMaxStageNumber) {
			maxStageNumber = parseInt(storedMaxStageNumber, 10);
		} else {
			localStorage.setItem('maxStageNumber', '1');
			maxStageNumber = 1;
		}

		dispatchGameSettings({
			type: SET_MAX_STAGE_NUMBER,
			maxStageNumber,
		});
	}, [dispatchGameSettings]);

	return (
		<>
			<Background>
				<Container>
					<Logo fontSize="3em" />
					<GameMenu openStagePopup={() => setStagePopup(true)} />
					<SoundOptions />
				</Container>
			</Background>
			{stagePopup && (
				<StagePopup closeStagePopup={() => setStagePopup(false)} />
			)}
		</>
	);
}

export default HomeScreen;
