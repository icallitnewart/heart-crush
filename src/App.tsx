import React from 'react';
import { useAppSelector } from './redux/store';

import { SoundManagerProvider } from './context/SoundManager';
import { SCREEN } from './constants/screen.constant';

import GlobalStyles from './GlobalStyles';
import ErrorBoundaryHandler from './components/ErrorBoundaryHandler';
import ScreenContainer from './components/ScreenContainer';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
	const screen = useAppSelector(state => state.display.screen);

	return (
		<SoundManagerProvider>
			<GlobalStyles />
			<ScreenContainer>
				<ErrorBoundaryHandler>
					{screen === SCREEN.HOME && <HomeScreen />}
					{screen === SCREEN.GAME && <GameScreen />}
				</ErrorBoundaryHandler>
			</ScreenContainer>
		</SoundManagerProvider>
	);
}

export default App;
