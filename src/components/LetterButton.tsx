import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	flex-grow: 1;
	height: 45px;
	cursor: pointer;
	padding-bottom: 5px;

	color: var(--main-color-yellow);
	text-shadow: 2px 2px 0px #666;
	-webkit-text-stroke: 0.4px #888;
	font-family: var(--main-font);
	font-size: 1.3em;
	letter-spacing: 2px;
	background-color: var(--main-color-purple);
	border: 1px solid #888;
	border-radius: 20px;
	box-shadow: 2px 2px 0px #666;

	&:hover {
		background-color: var(--sub-color-pink);
		color: var(--sub-color-blue);
	}
`;

interface LetterButtonPropsType {
	children: string;
}

function LetterButton({ children }: LetterButtonPropsType): React.ReactElement {
	return <Button>{children}</Button>;
}

export default LetterButton;
