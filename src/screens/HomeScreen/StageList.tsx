import React from 'react';
import { styled } from 'styled-components';

import StageButton from './StageButton';

const Container = styled.ul`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;

const ButtonBox = styled.li`
	display: flex;
	justify-content: center;
	width: 20%;
	margin-bottom: 22px;
`;

function StageList(): React.ReactElement {
	return (
		<Container>
			{new Array(10).fill(0).map((_, index) => (
				<ButtonBox>
					<StageButton stageNumber={index + 1} isStageUnlocked={false} />
				</ButtonBox>
			))}
		</Container>
	);
}

export default StageList;
