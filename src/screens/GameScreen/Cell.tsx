import React from 'react';
import styled from 'styled-components';

import HEART_ICONS from '../../constants/heart';
import { CellType } from '../../types/board';

import Heart from '../../components/Heart';

const Container = styled.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	padding: 5px;
`;

interface CellProps {
	cellData: CellType;
}

function Cell({ cellData }: CellProps): React.ReactElement {
	const heartColor = HEART_ICONS[cellData.heart];

	return (
		<Container>
			<Heart heartColor={heartColor} />
		</Container>
	);
}

export default React.memo(Cell);
