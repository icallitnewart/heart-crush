import { RESULT } from '../constants/gameStatus.constant';
import { POPUP, SCREEN } from '../constants/screen.constant';
import { STAGE_FILES } from '../constants/stage.constant';
import { BoardStatusType, BoardType } from './board.type';
import { StateErrorType } from './common.type';
import {
	CrushedHeartsType,
	FallingHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from './heart.type';

// DisplaySliceStateType : Start
export type ScreenType = keyof typeof SCREEN;
export type PopupType = keyof typeof POPUP | null;

export interface DisplaySliceStateType {
	error: StateErrorType | null;
	screen: ScreenType;
	popup: PopupType;
}
// DisplaySliceStateType : End

// SoundSliceStateType : Start
export interface SoundSliceStateType {
	error: StateErrorType | null;
	isSoundActivated: boolean;
	bgMusic: boolean;
	soundEffect: boolean;
}
// SoundSliceStateType : End

// StageSliceStateType : Start
export type StageNumberType = keyof typeof STAGE_FILES;

interface StageConfigType {
	stageNumber: StageNumberType;
	move: number;
	columns: number;
	rows: number;
	goal: {
		score?: number;
	};
}

export interface CurrentStageType {
	data: StageConfigType | null;
	timestamp: number | null;
	loading: boolean;
	error: null | string;
}

export interface UnlockedStageType {
	maxStageNumber: StageNumberType;
}

export interface StageSliceStateType {
	error: StateErrorType | null;
	unlockedStage: UnlockedStageType;
	currentStage: CurrentStageType;
}
// StageSliceStateType : End

// GameSliceStateType : Start
export type ScoreType = number;

export type MoveType = number;

export type ResultType = typeof RESULT.WIN | typeof RESULT.LOSE | null;

export interface GoalType {
	score?: number;
}

export type IsSwipeEnabledType = boolean;

export type IsBonusTimeType = boolean;

export interface GameSliceStateType {
	error: StateErrorType | null;
	board: BoardType;
	boardStatus: BoardStatusType;
	score: ScoreType;
	move: MoveType;
	goal: GoalType;
	result: ResultType;
	crushedHearts: CrushedHeartsType;
	fallingHearts: FallingHeartsType;
	matchingCandidates: MatchingCandidatesType;
	movingHearts: MovingHeartsType | null;
	isSwipeEnabled: IsSwipeEnabledType;
	isBonusTime: IsBonusTimeType;
}
// GameSliceStateType : End

export interface StoreStateType {
	display: DisplaySliceStateType;
	sound: SoundSliceStateType;
	stage: StageSliceStateType;
	game: GameSliceStateType;
}
