import { BoardType } from './board.type';
import {
	CrushedHeartsType,
	FallingHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from './heart.type';
import {
	GoalType,
	IsSwipeEnabledType,
	MoveType,
	PopupType,
	ResultType,
	ScoreType,
	StageNumberType,
} from './gamePlayStates.type';

export interface GamePlayStateType {
	board: BoardType;
	currentStageNumber: StageNumberType | null;
	score: ScoreType;
	move: MoveType;
	goal: GoalType;
	result: ResultType;
	crushedHearts: CrushedHeartsType;
	fallingHearts: FallingHeartsType;
	matchingCandidates: MatchingCandidatesType;
	movingHearts: MovingHeartsType | null;
	isSwipeEnabled: IsSwipeEnabledType;
	popup: PopupType;
	isBonusTime: boolean;
}

export interface GamePlayContextType extends GamePlayStateType {
	dispatchGamePlay: React.Dispatch<GamePlayActionType>;
}

export interface GamePlayActionType {
	type: string;
	stage?: {
		stageNumber: StageNumberType;
		columns: number;
		rows: number;
		move: number;
		goal: GoalType;
	};
	movingHearts?: MovingHeartsType | null;
}
