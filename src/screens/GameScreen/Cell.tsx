import React from 'react';
import styled from 'styled-components';

import Heart from '../../components/Heart';

const Container = styled.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	padding: 5px;
`;

function Cell(): React.ReactElement {
	return (
		<Container>
			<Heart heartColor="purple" />
		</Container>
	);
}

export default Cell;
