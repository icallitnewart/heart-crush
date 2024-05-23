import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	width: 100%;
	max-width: 480px;
	height: 100vh;
	max-height: 1000px;

	background-color: var(--sub-color-blue);
`;

interface ScreenContainerPropsType {
	children: React.ReactNode;
}

function ScreenContainer({
	children,
}: ScreenContainerPropsType): React.ReactElement {
	return <Container id="screen-container">{children}</Container>;
}

export default ScreenContainer;
