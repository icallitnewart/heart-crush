import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { ColumnType } from '../../types/board';

import Cell from './Cell';

interface ColumnStyleProps {
	$columnLength: number;
}

const Container = styled.li<ColumnStyleProps>`
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: ${({ $columnLength }) => `calc(100% / ${$columnLength})`};
	height: 100%;
	padding-bottom: 3px;
	transform: translateY(calc(-50% + 5px));
`;

interface ColumnProps {
	columnData: ColumnType;
	columnLength: number;
}

function Column(
	{ columnData, columnLength }: ColumnProps,
	ref: React.Ref<HTMLLIElement>,
): React.ReactElement {
	return (
		<Container ref={ref} $columnLength={columnLength}>
			{columnData.cells.map(cellData => (
				<Cell key={cellData.id} cellData={cellData} />
			))}
		</Container>
	);
}

export default forwardRef<HTMLLIElement, any>(Column);
