import React from 'react';
import { useAppSelector } from '../../redux/store';

import InfoBox from '../../components/InfoBox';

function Move(): React.ReactElement {
	const move = useAppSelector(state => state.game.move);

	return <InfoBox title="move">{move}</InfoBox>;
}

export default Move;
