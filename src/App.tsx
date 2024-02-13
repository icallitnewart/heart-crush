import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';

import { PLAYING, STANDBY } from './constants/status.constant';
import { SwitchStatusFunction } from './types/status.type';
import { GamePlayProvider } from './states/GamePlayContext';

import ScreenContainer from './components/ScreenContainer';
import GameScreen from './screens/GameScreen';

function App() {
	const [status, setStatus] = useState(PLAYING);
	const switchStatus: SwitchStatusFunction = setStatus;

	return (
		<>
			<GlobalStyles />
			<ScreenContainer>
				{status === PLAYING && (
					<GamePlayProvider>
						<GameScreen moveToHome={() => switchStatus(STANDBY)} />
					</GamePlayProvider>
				)}
			</ScreenContainer>
		</>
	);
}

export default App;
