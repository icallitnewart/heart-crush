import React, { useContext } from 'react';

import { GamePlayContext } from '../../states/GamePlayContext';

import InfoBox from '../../components/InfoBox';

function Goal(): React.ReactElement {
	const { goal } = useContext(GamePlayContext);

	return (
		<InfoBox title="goal" flex={2.5}>
			{goal?.score}
		</InfoBox>
	);
}

export default Goal;
