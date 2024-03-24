import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const AlertText = styled.p`
	position: relative;
	z-index: 1;
	margin-bottom: 20px;
	text-transform: uppercase;

	font-family: var(--main-font);
	font-size: 1.2em;
	letter-spacing: 2px;
	color: var(--sub-color-blue);
	-webkit-text-stroke: 1px #333;

	&::after {
		position: absolute;
		top: 1px;
		left: 50%;
		z-index: -1;
		transform: translateX(calc(-50% + 2px));
		content: attr(data-text);
		display: inline-block;
		width: 100%;
		clear: both;

		color: var(--sub-color-pink);
		-webkit-text-stroke: 1px #333;
	}
`;

function ResetAlert() {
	return (
		<Container>
			<AlertText data-text="Can't Make Any Move !">
				Can&apos;t Make Any Move !
			</AlertText>
			<AlertText data-text="Resetting Board...">Resetting Board...</AlertText>
		</Container>
	);
}

export default ResetAlert;
