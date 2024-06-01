import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import styled, { keyframes } from 'styled-components';

const backgroundColorAnimation = keyframes`
	0% {
		background: repeating-linear-gradient(
			45deg,
			var(--main-color-yellow) 15px,
			#888 15px,
			var(--main-color-purple) 16px,
			var(--main-color-purple) 30px,
			#888 30px,
			var(--main-color-yellow) 31px,
			var(--main-color-yellow) 45px
		);
	}

	50% {
		background: repeating-linear-gradient(
			45deg,
			var(--main-color-purple) 15px,
			#888 15px,
			var(--main-color-yellow) 16px,
			var(--main-color-yellow) 30px,
			#888 30px,
			var(--main-color-purple) 31px,
			var(--main-color-purple) 45px
		);
	}
`;

const fadeInAndMoveDownAnimation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-20px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;

const Container = styled.div`
	width: 80%;
	max-width: 400px;
	padding: 15px;
	margin-bottom: 70px;

	border-radius: 10px;
	border: 1px solid #888;
	background: repeating-linear-gradient(
		45deg,
		var(--main-color-yellow) 15px,
		#888 15px,
		var(--main-color-purple) 16px,
		var(--main-color-purple) 30px,
		#888 30px,
		var(--main-color-yellow) 31px,
		var(--main-color-yellow) 45px
	);
	animation:
		${fadeInAndMoveDownAnimation} 500ms forwards,
		${backgroundColorAnimation} 600ms infinite;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);

	@media ${({ theme }) => theme.mobile} {
		${isMobileOnly && 'padding: 12px'}
	}
`;

interface WrapperStylePropsType {
	$bgColor?: string;
}

const Wrapper = styled.div<WrapperStylePropsType>`
	width: 100%;
	height: 100%;

	border-radius: 7px;
	border: 1px solid #999;
	background-color: ${({ $bgColor }) => $bgColor};
	box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.15);
`;

interface PopupBoxPropsType {
	children: React.ReactElement;
	bgColor?: string;
}

function PopupBox({
	children,
	bgColor,
}: PopupBoxPropsType): React.ReactElement {
	return (
		<Container>
			<Wrapper $bgColor={bgColor}>{children}</Wrapper>
		</Container>
	);
}

PopupBox.defaultProps = {
	bgColor: 'var(--sub-color-blue)',
};

export default PopupBox;
