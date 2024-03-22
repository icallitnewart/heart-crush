import { RESULT } from '../constants/gameStatus.constant';
import { STAGE_FILES } from '../constants/stage.constant';
import { CellType } from './board.type';

export type StageNumberType = keyof typeof STAGE_FILES;

export type ScoreType = number;

export type MoveType = number;

export type ResultType = typeof RESULT.WIN | typeof RESULT.LOSE | null;

export interface GoalType {
	score?: number;
}

export type IsSwipeEnabledType = boolean;

export type IsBoardValidType = boolean | null;

export interface ValidSwapCellInfoType {
	[id: string]: CellType;
}

export type ValidSwapType = ValidSwapCellInfoType | null;

export interface BoardStatusType {
	isValid: IsBoardValidType;
	validSwap: ValidSwapType;
}
