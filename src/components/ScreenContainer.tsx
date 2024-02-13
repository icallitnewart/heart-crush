import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	width: 100%;
	max-width: 480px;
	height: 100vh;
	max-height: 1000px;
`;

interface ScreenContainerPropsType {
	children: React.ReactElement | false; // TODO: false 제거 예정
}

function ScreenContainer({
	children,
}: ScreenContainerPropsType): React.ReactElement {
	return <Container>{children}</Container>;
}

export default ScreenContainer;
