import React from 'react';
import styled from 'styled-components';

import Cell from './Cell';

const Container = styled.li`
	transform: translateY(-50%);
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: calc(100% / 8);
	height: 100%;
`;

function Column(): React.ReactElement {
	return (
		<Container>
			{new Array(20).fill(0).map(_ => (
				// 추후 key값 추가 예정
				<Cell />
			))}
		</Container>
	);
}

export default Column;
