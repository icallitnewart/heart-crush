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
} from './gameStatus.type';

export interface GamePlayStateType {
	board: BoardType;
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
}

export interface GamePlayContextType extends GamePlayStateType {
	dispatch: React.Dispatch<GamePlayActionType>;
}

export interface GamePlayActionType {
	type: string;
	stage?: {
		columns: number;
		rows: number;
		move: number;
		goal: GoalType;
	};
	movingHearts?: MovingHeartsType | null;
}
