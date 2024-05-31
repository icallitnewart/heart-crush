import React from 'react';
import { useAppSelector } from './redux/store';

import { SoundManagerProvider } from './context/SoundManager';
import { SCREEN } from './constants/screen.constant';

import StyleProvider from './StyleProvider';
import ErrorBoundaryHandler from './components/ErrorBoundaryHandler';
import StateErrorHandler from './components/StateErrorHandler';
import ScreenContainer from './components/ScreenContainer';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
	const screen = useAppSelector(state => state.display.screen);

	return (
		<SoundManagerProvider>
			<StyleProvider>
				<ScreenContainer>
					<ErrorBoundaryHandler>
						<StateErrorHandler>
							{screen === SCREEN.HOME && <HomeScreen />}
							{screen === SCREEN.GAME && <GameScreen />}
						</StateErrorHandler>
					</ErrorBoundaryHandler>
				</ScreenContainer>
			</StyleProvider>
		</SoundManagerProvider>
	);
}

export default App;
