import React, { useContext } from 'react';

import { GamePlayContext } from '../../states/GamePlayContext';

import InfoBox from '../../components/InfoBox';

function Move(): React.ReactElement {
	const { move } = useContext(GamePlayContext);

	return <InfoBox title="move">{move}</InfoBox>;
}

export default Move;
