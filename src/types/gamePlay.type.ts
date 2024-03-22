import { BoardType } from './board.type';
import {
	CrushedHeartsType,
	FallingHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from './heart.type';
import {
	BoardStatusType,
	GoalType,
	IsSwipeEnabledType,
	MoveType,
	ResultType,
	ScoreType,
	StageNumberType,
} from './gamePlayStates.type';

export interface GamePlayStateType {
	board: BoardType;
	boardStatus: BoardStatusType;
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
