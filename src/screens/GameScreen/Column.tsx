import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { ColumnType } from '../../types/board.type';
import { BOARD_HIDDEN_ROWS_MULTIPLIER } from '../../constants/board.constant';

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
	transform: translateY(
		calc(${-(BOARD_HIDDEN_ROWS_MULTIPLIER - 1) * 50}% + 7px)
	);
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
			{columnData.cells.map((cellData, rowIndex) => (
				<Cell
					key={cellData.id}
					cellData={cellData}
					columnIndex={columnIndex}
					rowIndex={rowIndex}
				/>
			))}
		</Container>
	);
}

export default forwardRef<HTMLLIElement, any>(Column);
