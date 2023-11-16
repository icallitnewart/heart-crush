import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const Container = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	width: 42px;
	margin-right: 5px;
	font-size: 40px;

	svg {
		color: var(--main-color-purple);
		stroke: #666;
		stroke-width: 14;
	}
`;

const StageNumber = styled.span`
	position: absolute;
	z-index: 1;
	display: inline-flex;
	justify-content: center;
	height: 100%;
	aspect-ratio: 1 / 1;
	text-align: center;
	margin-bottom: -10px;
	margin-left: -2px;

	font-size: 26px;
	line-height: 0.3;
	color: var(--main-color-yellow);
	-webkit-text-stroke: 0.8px #333;
	text-shadow: 1px 1px 0px #666;
	font-family: var(--main-font);
`;

function Stage(): React.ReactElement {
	return (
		<Container>
			<FaHeart viewBox="-10 10 550 550" />
			<StageNumber>1</StageNumber>
		</Container>
	);
}

export default Stage;
