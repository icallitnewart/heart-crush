import React from 'react';
import { useAppSelector } from '../../redux/store';

import InfoBox from '../../components/InfoBox';

function Score() {
	const score = useAppSelector(state => state.game.score);

	return (
		<InfoBox title="score" flex={1.7}>
			{score}
		</InfoBox>
	);
}

export default Score;
