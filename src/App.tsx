import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';

import { HOME_SCREEN, GAME_SCREEN } from './constants/screen.constant';
import { SwitchScreenFunction } from './types/screen.type';
import { GamePlayProvider } from './states/GamePlayContext';

import ScreenContainer from './components/ScreenContainer';
import GameScreen from './screens/GameScreen';

function App() {
	const [screen, setScreen] = useState(GAME_SCREEN);
	const switchScreen: SwitchScreenFunction = setScreen;

	return (
		<>
			<GlobalStyles />
			<ScreenContainer>
				{screen === GAME_SCREEN && (
					<GamePlayProvider>
						<GameScreen moveToHome={() => switchScreen(HOME_SCREEN)} />
					</GamePlayProvider>
				)}
			</ScreenContainer>
		</>
	);
}

export default App;
