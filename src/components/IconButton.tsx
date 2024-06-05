import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import { SoundEffectContext } from '../context/SoundManager';
import { SOUND_EFFECT_TYPE } from '../constants/audio.constant';

interface ButtonStyleProps {
	$size?: number;
	$iconSize?: number;
	$iconStrokeWidth?: number;
	$isActive?: boolean;
	$isColorChangeDisabled?: boolean;
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

	${({ $isColorChangeDisabled, $isActive }) =>
		!$isColorChangeDisabled &&
		css`
			&:hover svg {
				color: ${$isActive
					? 'var(--sub-color-blue)'
					: 'var(--main-color-purple)'};
			}
		`}

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
			color: ${({ $isActive }) =>
				$isActive ? 'var(--main-color-purple)' : 'var(--sub-color-blue)'};
			stroke: #666;
			stroke-width: ${props => props.$iconStrokeWidth};
		}
	}
`;

interface IconButtonProps {
	children: React.ReactElement;
	size?: number;
	iconSize?: number;
	iconStrokeWidth?: number;
	isActive?: boolean;
	handleClick: () => void;
}

function IconButton({
	children,
	size,
	iconSize,
	iconStrokeWidth,
	isActive,
	handleClick,
}: IconButtonProps): React.ReactElement {
	const { playSoundEffect } = useContext(SoundEffectContext);
	const [isColorChangeDisabled, setIsColorChangeDisabled] = useState(false);

	const handleMouseEnter = () => {
		playSoundEffect(SOUND_EFFECT_TYPE.MOUSE_HOVER);
	};

	const handleMouseLeave = () => {
		if (isColorChangeDisabled) setIsColorChangeDisabled(false);
	};

	const handleOnClick = () => {
		handleClick();
		setIsColorChangeDisabled(true);
	};

	return (
		<Button
			$size={size}
			$iconSize={iconSize}
			$iconStrokeWidth={iconStrokeWidth}
			$isActive={isActive}
			$isColorChangeDisabled={isColorChangeDisabled}
			onClick={handleOnClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<span>{children}</span>
		</Button>
	);
}

export default IconButton;

IconButton.defaultProps = {
	size: 40,
	iconSize: undefined,
	iconStrokeWidth: 0.7,
	isActive: false,
};
