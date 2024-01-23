import { BoardType, CellType } from './board.type';
import { MovingHeartsType } from './heart.type';

export interface GamePlayStateType {
	board: BoardType;
	score: number;
	move: number;
	crushedHearts: CellType[] | [];
	movingHearts: MovingHeartsType | null;
	isSwipeEnabled: boolean;
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
