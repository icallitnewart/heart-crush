import { STAGE_FILES } from '../constants/stage.constant';
import { StageNumberType } from '../types/state.type';

export function isStageNumberValid(value: number): value is StageNumberType {
	return Object.keys(STAGE_FILES).includes(value.toString());
}
