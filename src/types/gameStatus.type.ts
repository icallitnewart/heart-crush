import { POPUP, RESULT } from '../constants/status.constant';

export type ScoreType = number;

export type MoveType = number;

export type ResultType = typeof RESULT.WIN | typeof RESULT.LOSE | null;

export interface GoalType {
	score?: number;
}

export type IsSwipeEnabledType = boolean;

export type PopupType = (typeof POPUP)[keyof typeof POPUP] | null;
