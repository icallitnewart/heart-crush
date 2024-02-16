import React from 'react';
import styled from 'styled-components';

interface ButtonStyleProps {
	$size?: number;
	$iconSize?: number;
	$iconStrokeWidth?: number;
	$isActive?: boolean;
}

const Button = styled.button<ButtonStyleProps>`
	width: ${({ $size }) => $size}px;
	height: ${({ $size }) => $size}px;
	border-radius: 50%;
	border: none;
	padding: ${({ $size }) => $size && $size / 13}px;
	cursor: pointer;

	border: 1px solid #888;
	background-color: #cbc4ff;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

	&:hover svg {
		color: ${props =>
			!props.$isActive ? 'var(--main-color-purple)' : 'var(--sub-color-blue)'};
	}

	//아이콘
	span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		font-size: ${({ $iconSize, $size }) =>
			$iconSize || ($size && $size / 1.8)}px;
		border-radius: 50%;
		border: 1px solid #888;
		background-color: var(--main-color-yellow);

		svg {
			color: ${props =>
				props.$isActive ? 'var(--main-color-purple)' : 'var(--sub-color-blue)'};
			stroke: #666;
			stroke-width: ${props => props.$iconStrokeWidth};
		}
	}
`;

interface ControlButtonProps {
	children: React.ReactElement;
	size?: number;
	iconSize?: number;
	iconStrokeWidth?: number;
	isActive?: boolean;
}

function ControlButton({
	children,
	size,
	iconSize,
	iconStrokeWidth,
	isActive,
}: ControlButtonProps): React.ReactElement {
	return (
		<Button
			$size={size}
			$iconSize={iconSize}
			$iconStrokeWidth={iconStrokeWidth}
			$isActive={isActive}
		>
			<span>{children}</span>
		</Button>
	);
}

export default ControlButton;

ControlButton.defaultProps = {
	size: 40,
	iconSize: undefined,
	iconStrokeWidth: 0.7,
	isActive: false,
};
