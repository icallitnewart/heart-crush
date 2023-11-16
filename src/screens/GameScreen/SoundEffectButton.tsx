import React from 'react';
import { AiFillSound } from 'react-icons/ai';

import ControlButton from '../../components/ControlButton';

function SoundEffectButton(): React.ReactElement {
	return (
		<ControlButton iconStrokeWidth={30} isActive>
			<AiFillSound />
		</ControlButton>
	);
}

export default SoundEffectButton;
