import React from 'react';
import { AiFillSound } from 'react-icons/ai';

import IconButton from './IconButton';

interface SoundEffectButtonPropsType {
	size?: number;
}

function SoundEffectButton({
	size,
}: SoundEffectButtonPropsType): React.ReactElement {
	return (
		<IconButton size={size} iconStrokeWidth={30} isActive>
			<AiFillSound />
		</IconButton>
	);
}

SoundEffectButton.defaultProps = {
	size: undefined,
};

export default SoundEffectButton;
