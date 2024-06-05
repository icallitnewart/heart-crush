import React from 'react';
import styled from 'styled-components';

import MusicButton from '../../components/MusicButton';
import SoundEffectButton from '../../components/SoundEffectButton';

const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 0 50px;

	button {
		margin: 0 15px;
	}
`;

function SoundOptions(): React.ReactElement {
	return (
		<Container>
			<SoundEffectButton size={60} />
			<MusicButton size={60} />
		</Container>
	);
}

export default SoundOptions;
