import React from 'react';
import { BiSolidMusic } from 'react-icons/bi';

import ControlButton from '../../components/ControlButton';

function MusicButton(): React.ReactElement {
	return (
		<ControlButton isActive>
			<BiSolidMusic />
		</ControlButton>
	);
}

export default MusicButton;
