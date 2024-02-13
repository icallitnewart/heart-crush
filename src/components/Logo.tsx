import React from 'react';
import styled, { css } from 'styled-components';

interface ContainerStylePropsType {
	$fontSize?: string;
	$textStroke?: number;
	$shouldFlexGrow?: boolean;
	$shouldTextShadow: boolean | undefined;
}

const Container = styled.h1<ContainerStylePropsType>`
	position: relative;
	${({ $shouldFlexGrow }) =>
		$shouldFlexGrow &&
		css`
			flex-grow: 1;
		`}
	padding-right: 5px;
	margin-bottom: 10px;

	font-family: var(--main-font);
	font-size: ${({ $fontSize }) => $fontSize};
	letter-spacing: 1px;

	span {
		-webkit-text-stroke: ${({ $textStroke }) => $textStroke}px #333;
	}

	&::after {
		position: absolute;
		top: 2px;
		left: 2px;
		content: 'Heart Crush';
		display: inline-block;
		clear: both;

		color: var(--sub-color-purple);
		-webkit-text-stroke: ${({ $textStroke }) => $textStroke}px #333;
		${({ $shouldTextShadow }) =>
			$shouldTextShadow &&
			css`
				text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
			`}
	}
`;

const LogoText = styled.span`
	position: relative;
	z-index: 1;
	display: inline-block;
	height: 100%;

	color: var(--main-color-yellow);
	-webkit-text-stroke: 1.2px #333;
`;

interface LogoPropsType {
	fontSize?: string;
	textStroke?: number;
	shouldFlexGrow?: boolean;
	shouldTextShadow?: boolean;
}

function Logo({
	fontSize,
	textStroke,
	shouldFlexGrow,
	shouldTextShadow,
}: LogoPropsType): React.ReactElement {
	return (
		<Container
			$fontSize={fontSize}
			$textStroke={textStroke}
			$shouldFlexGrow={shouldFlexGrow}
			$shouldTextShadow={shouldTextShadow}
		>
			<LogoText>Heart Crush</LogoText>
		</Container>
	);
}

Logo.defaultProps = {
	fontSize: '1.9em',
	textStroke: 0.8,
	shouldFlexGrow: false,
	shouldTextShadow: false,
};

export default Logo;
