import { BoardType, CellInfoType } from './board.type';
import {
	FallingHeartsType,
	MatchingCandidatesType,
	MovingHeartsType,
} from './heart.type';

export interface GamePlayStateType {
	board: BoardType;
	score: number;
	move: number;
	crushedHearts: CellInfoType[] | [];
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
