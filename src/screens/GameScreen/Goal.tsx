import React from 'react';
import { useAppSelector } from '../../redux/store';

import InfoBox from '../../components/InfoBox';

function Goal(): React.ReactElement {
	const goal = useAppSelector(state => state.game.goal);

	return (
		<InfoBox title="goal" flex={2.5}>
			{goal?.score}
		</InfoBox>
	);
}

export default Goal;
