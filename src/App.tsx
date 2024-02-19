import React, { useContext } from 'react';

import { GamePlayProvider } from './states/GamePlayContext';
import { GameSettingsContext } from './states/GameSettingsContext';
import { HOME_SCREEN, GAME_SCREEN } from './constants/screen.constant';

import GlobalStyles from './GlobalStyles';
import ScreenContainer from './components/ScreenContainer';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
	const { screen } = useContext(GameSettingsContext);

	return (
		<>
			<GlobalStyles />
			<ScreenContainer>
				{screen === HOME_SCREEN && <HomeScreen />}
				{screen === GAME_SCREEN && (
					<GamePlayProvider>
						<GameScreen />
					</GamePlayProvider>
				)}
			</ScreenContainer>
		</>
	);
}

export default App;
