import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Cell from './Cell';

const Container = styled.li`
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: calc(100% / 8);
	height: 100%;
	padding-bottom: 3px;
	transform: translateY(calc(-50% + 5px));
`;

function Column(props: any, ref: React.Ref<HTMLLIElement>): React.ReactElement {
	return (
		<Container ref={ref}>
			{new Array(20).fill(0).map(__ => (
				// 추후 key값 추가 예정
				<Cell />
			))}
		</Container>
	);
}

export default forwardRef<HTMLLIElement, any>(Column);
