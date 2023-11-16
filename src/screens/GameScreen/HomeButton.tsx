import React from 'react';
import { BiSolidHomeHeart } from 'react-icons/bi';

import ControlButton from '../../components/ControlButton';

function HomeButton(): React.ReactElement {
	return (
		<ControlButton iconSize={24}>
			<BiSolidHomeHeart />
		</ControlButton>
	);
}

export default HomeButton;
