import React from 'react';
import { useSelector } from 'react-redux';

import { GamePlayProvider } from './states/GamePlayContext';
import { SoundManagerProvider } from './context/SoundManager';
import { StoreStateType } from './types/state.type';
import { SCREEN } from './constants/screen.constant';

import GlobalStyles from './GlobalStyles';
import ScreenContainer from './components/ScreenContainer';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
	const screen = useSelector((state: StoreStateType) => state.display.screen);

	return (
		<SoundManagerProvider>
			<GlobalStyles />
			<ScreenContainer>
				{screen === SCREEN.HOME && <HomeScreen />}
				{screen === SCREEN.GAME && (
					<GamePlayProvider>
						<GameScreen />
					</GamePlayProvider>
				)}
			</ScreenContainer>
		</SoundManagerProvider>
	);
}

export default App;
