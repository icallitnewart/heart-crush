import React, { useContext } from 'react';

import { GamePlayContext } from '../../states/GamePlayContext';

import InfoBox from '../../components/InfoBox';

function Score() {
	const { score } = useContext(GamePlayContext);
	return (
		<InfoBox title="score" flex={1.7}>
			{score}
		</InfoBox>
	);
}

export default Score;
