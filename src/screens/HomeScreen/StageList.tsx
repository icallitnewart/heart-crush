import React, { useContext } from 'react';
import { styled } from 'styled-components';

import { GameSettingsContext } from '../../states/GameSettingsContext';
import { STAGE_FILES } from '../../constants/stage.constant';

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
	const { maxStageNumber } = useContext(GameSettingsContext);
	const stages = Object.keys(STAGE_FILES).map(Number);

	return (
		<Container>
			{stages.map(stageNumber => (
				<ButtonBox key={stageNumber}>
					<StageButton
						stageNumber={stageNumber}
						isStageUnlocked={
							!!(maxStageNumber && stageNumber <= maxStageNumber)
						}
					/>
				</ButtonBox>
			))}
		</Container>
	);
}

export default StageList;
