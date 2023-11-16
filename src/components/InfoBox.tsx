import React from 'react';
import styled from 'styled-components';

interface InfoBoxStyleProps {
	$flex?: number;
}

const Container = styled.li<InfoBoxStyleProps>`
	min-width: 80px;
	height: 100%;
	overflow: hidden;
	flex: ${props => props.$flex};

	border: 1px solid #888;
	border-radius: 5px;
	box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 28px;
	padding-bottom: 1px;
	text-transform: uppercase;

	background-color: var(--sub-color-purple);
	border-bottom: 1px solid #888;
	-webkit-text-stroke: 0.8px #666;
	color: var(--main-color-yellow);
	letter-spacing: 2px;
	font-size: 16px;
	font-family: var(--main-font);
	text-shadow: 1px 1px 0px #333;
`;

const TextBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100% - 20px);
	padding-bottom: 8px;

	background-color: var(--sub-color-lightpink);
	color: var(--sub-color-pink);
	-webkit-text-stroke: 1px #666;
	text-shadow: 1px 1px 0px #666;
	font-family: var(--sub-font);
	font-size: 32px;
	letter-spacing: 2px;
`;

interface InfoBoxProps {
	flex?: number;
	title: 'goal' | 'move' | 'score';
	children: string | number;
}

function InfoBox({ flex, title, children }: InfoBoxProps): React.ReactElement {
	return (
		<Container $flex={flex}>
			<Title>{title}</Title>
			<TextBox>{children}</TextBox>
		</Container>
	);
}

export default InfoBox;

InfoBox.defaultProps = {
	flex: 1,
};
