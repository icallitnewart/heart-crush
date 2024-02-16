import React from 'react';
import { AiFillSound } from 'react-icons/ai';

import ControlButton from './ControlButton';

interface SoundEffectButtonPropsType {
	size?: number;
}

function SoundEffectButton({
	size,
}: SoundEffectButtonPropsType): React.ReactElement {
	return (
		<ControlButton size={size} iconStrokeWidth={30} isActive>
			<AiFillSound />
		</ControlButton>
	);
}

SoundEffectButton.defaultProps = {
	size: undefined,
};

export default SoundEffectButton;
