import { RESULT } from '../constants/gameStatus.constant';
import { POPUP } from '../constants/screen.constant';

export type StageNumberType = number;

export type ScoreType = number;

export type MoveType = number;

export type ResultType = typeof RESULT.WIN | typeof RESULT.LOSE | null;

export interface GoalType {
	score?: number;
}

export type IsSwipeEnabledType = boolean;

export type PopupType = (typeof POPUP)[keyof typeof POPUP] | null;
