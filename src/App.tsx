import React, { useContext } from 'react';

import { GamePlayProvider } from './states/GamePlayContext';
import { GameSettingsContext } from './states/GameSettingsContext';
import { SCREEN } from './constants/screen.constant';

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
				{screen === SCREEN.HOME && <HomeScreen />}
				{screen === SCREEN.GAME && (
					<GamePlayProvider>
						<GameScreen />
					</GamePlayProvider>
				)}
			</ScreenContainer>
		</>
	);
}

export default App;
