import { BoardType } from './board.type';
import {
	CrushedHeartsType,
	FallingHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from './heart.type';

export interface GamePlayStateType {
	board: BoardType;
	score: number;
	move: number;
	crushedHearts: CrushedHeartsType;
	fallingHearts: FallingHeartsType;
	matchingCandidates: MatchingCandidatesType;
	movingHearts: MovingHeartsType | null;
	isSwipeEnabled: boolean;
	goal: {
		score?: number;
	};
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
	};
	movingHearts?: MovingHeartsType | null;
}
