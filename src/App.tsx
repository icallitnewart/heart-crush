import React, { useState } from 'react';
import GlobalStyles from './GlobalStyles';

import { PLAYING, STANDBY } from './constants/status';
import { SwitchStatusFunction } from './types/status';

import { GamePlayProvider } from './states/GamePlayContext';
import GameScreen from './screens/GameScreen';

function App() {
	const [status, setStatus] = useState(PLAYING);
	const switchStatus: SwitchStatusFunction = setStatus;

	return (
		<>
			<GlobalStyles />
			{status === PLAYING && (
				<GamePlayProvider>
					<GameScreen moveToHome={() => switchStatus(STANDBY)} />
				</GamePlayProvider>
			)}
		</>
	);
}

export default App;
