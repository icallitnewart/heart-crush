import React from 'react';
import { BiSolidMusic } from 'react-icons/bi';

import ControlButton from './ControlButton';

interface MusicButtonPropsType {
	size?: number;
}

function MusicButton({ size }: MusicButtonPropsType): React.ReactElement {
	return (
		<ControlButton isActive size={size}>
			<BiSolidMusic />
		</ControlButton>
	);
}

MusicButton.defaultProps = {
	size: undefined,
};

export default MusicButton;
