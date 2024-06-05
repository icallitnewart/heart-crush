import React from 'react';
import styled from 'styled-components';
import { isMobileOnly } from 'react-device-detect';

import Goal from './Goal';
import Move from './Move';
import Score from './Score';

const Container = styled.ul`
	display: flex;
	justify-content: space-between;
	gap: 15px;
	width: 100%;
	height: 85px;
	margin-bottom: 20px;

	@media ${({ theme }) => theme.mobile} {
		${isMobileOnly && `height: 65px;`}
	}
`;

function Information(): React.ReactElement {
	return (
		<Container>
			<Move />
			<Goal />
			<Score />
		</Container>
	);
}

export default Information;
