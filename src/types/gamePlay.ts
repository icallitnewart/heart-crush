import { BoardType } from './board';
import { MovingHeartsType } from './heart';

export interface GamePlayStateType {
	board: BoardType;
	score: number;
	move: number;
	movingHearts: MovingHeartsType | null;
	isSwiping: boolean;
	goal: {
		score?: number;
	};
}

export interface GamePlayContextType extends GamePlayStateType {
	dispatch: React.Dispatch<any>;
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
