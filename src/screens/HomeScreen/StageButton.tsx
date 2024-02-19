import React from 'react';
import { css, styled } from 'styled-components';

interface ButtonStylePropsType {
	$isActive: boolean;
}

const Button = styled.button<ButtonStylePropsType>`
	width: 42px;
	height: 42px;
	cursor: pointer;

	background-color: var(--sub-color-purple);
	color: var(--main-color-yellow);
	text-shadow: 2px 2px 0px #777;
	-webkit-text-stroke: 0.5px #777;
	font-family: var(--sub-font);
	font-size: 1.3em;
	letter-spacing: 2px;
	border: 1px solid #888;
	border-radius: 100%;
	box-shadow: 2px 2px 0px #666;

	${({ $isActive }) =>
		$isActive &&
		css`
			text-shadow: 2px 2px 0px #666;
			background-color: var(--main-color-purple);

			&:hover {
				background-color: var(--sub-color-pink);
				color: var(--sub-color-blue);
			}
		`}
`;

interface StageButtonPropsType {
	stageNumber: number;
	isStageUnlocked: boolean;
}

function StageButton({
	stageNumber,
	isStageUnlocked,
}: StageButtonPropsType): React.ReactElement {
	return (
		<Button $isActive={isStageUnlocked} disabled={!isStageUnlocked}>
			{stageNumber}
		</Button>
	);
}

export default StageButton;
