import React from 'react';
import { styled } from 'styled-components';
import { BiSolidLock } from 'react-icons/bi';

const Container = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;

	color: var(--main-color-purple);

	svg {
		margin-left: 2px;
		font-size: 1.2em;
		stroke: #444;
		stroke-width: 0.6px;
	}
`;

const Text = styled.span`
	font-size: 1em;
	font-family: var(--main-font);
	letter-spacing: 1px;
	-webkit-text-stroke: 0.5px #666;
`;

function AlertMessage(): React.ReactElement {
	return (
		<Container>
			<Text>LOCKED</Text>
			<BiSolidLock />
		</Container>
	);
}

export default AlertMessage;
