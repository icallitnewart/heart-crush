import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { ColumnType } from '../../types/board';

import Cell from './Cell';

interface ColumnStyleProps {
	$columns: number;
}

const Container = styled.li<ColumnStyleProps>`
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: ${({ $columns }) => `calc(100% / ${$columns})`};
	height: 100%;
	padding-bottom: 3px;
	transform: translateY(calc(-50% + 5px));
`;

interface ColumnProps {
	columnData: ColumnType;
	columns: number;
	columnIndex: number;
}

function Column(
	{ columnData, columns, columnIndex }: ColumnProps,
	ref: React.Ref<HTMLLIElement>,
): React.ReactElement {
	return (
		<Container ref={ref} $columns={columns}>
			{columnData.cells.map((cellData, cellIndex) => (
				<Cell
					key={cellData.id}
					cellData={cellData}
					columnIndex={columnIndex}
					cellIndex={cellIndex}
					rows={columnData.cells.length}
				/>
			))}
		</Container>
	);
}

export default forwardRef<HTMLLIElement, any>(Column);
