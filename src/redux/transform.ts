import { createTransform } from 'redux-persist';

import {
	StageNumberType,
	StageSliceStateType,
	UnlockedStageType,
} from '../types/state.type';
import { FIRST_STAGE, LAST_STAGE } from '../constants/stage.constant';
import { initialCurrentStage } from './slices/stageSlice';

export const StageTransform = createTransform(
	(inboundState: StageSliceStateType) => {
		return {
			maxStageNumber: inboundState.unlockedStage.maxStageNumber,
		};
	},
	(outboundState: UnlockedStageType) => {
		const storedMaxStageNumber: StageNumberType = outboundState.maxStageNumber;
		const adjustMaxStageNumber = (stageNumber: StageNumberType) => {
			if (!stageNumber) {
				return FIRST_STAGE;
			}
			if (stageNumber > LAST_STAGE) {
				return LAST_STAGE;
			}
			return stageNumber;
		};

		return {
			unlockedStage: {
				maxStageNumber: adjustMaxStageNumber(storedMaxStageNumber),
			},
			currentStage: initialCurrentStage,
		};
	},
	{ whitelist: ['stage'] },
);
