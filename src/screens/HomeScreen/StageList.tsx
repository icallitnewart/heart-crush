import React from 'react';
import { styled } from 'styled-components';
import { useAppSelector } from '../../redux/store';

import { STAGE_FILES } from '../../constants/stage.constant';

import StageNumberButton from './StageNumberButton';

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

interface StageListPropsType {
	createAlertMessage: () => void;
	removeAlertMessage: () => void;
}

function StageList({
	createAlertMessage,
	removeAlertMessage,
}: StageListPropsType): React.ReactElement {
	const unlockedMaxStageNumber = useAppSelector(
		state => state.stage.unlockedStage.maxStageNumber,
	);
	const stages = Object.keys(STAGE_FILES).map(Number);

	return (
		<Container>
			{stages.map(stageNumber => (
				<ButtonBox key={stageNumber}>
					<StageNumberButton
						stageNumber={stageNumber}
						isStageUnlocked={
							!!(
								unlockedMaxStageNumber && stageNumber <= unlockedMaxStageNumber
							)
						}
						createAlertMessage={createAlertMessage}
						removeAlertMessage={removeAlertMessage}
					/>
				</ButtonBox>
			))}
		</Container>
	);
}

export default StageList;
