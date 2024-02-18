import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';

import { HOME_SCREEN, GAME_SCREEN } from './constants/screen.constant';
import { SwitchScreenFunction } from './types/screen.type';
import { GamePlayProvider } from './states/GamePlayContext';
import { GameSettingsProvider } from './states/GameSettingsContext';

import ScreenContainer from './components/ScreenContainer';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
	const [screen, setScreen] = useState(HOME_SCREEN);
	const switchScreen: SwitchScreenFunction = setScreen;

	return (
		<>
			<GlobalStyles />
			<ScreenContainer>
				<GameSettingsProvider>
					{screen === HOME_SCREEN && <HomeScreen />}
					{screen === GAME_SCREEN && (
						<GamePlayProvider>
							<GameScreen moveToHome={() => switchScreen(HOME_SCREEN)} />
						</GamePlayProvider>
					)}
				</GameSettingsProvider>
			</ScreenContainer>
		</>
	);
}

export default App;
