import React from 'react';
import { BiSolidMusic } from 'react-icons/bi';

import IconButton from './IconButton';

interface MusicButtonPropsType {
	size?: number;
}

function MusicButton({ size }: MusicButtonPropsType): React.ReactElement {
	return (
		<IconButton isActive size={size}>
			<BiSolidMusic />
		</IconButton>
	);
}

MusicButton.defaultProps = {
	size: undefined,
};

export default MusicButton;
