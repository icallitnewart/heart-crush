import { HeartInfoType } from './common.type';
import { BoardType } from './board.type';
import { MovingHeartsType } from './heart.type';

export interface GamePlayStateType {
	board: BoardType;
	score: number;
	move: number;
	crushedHearts: HeartInfoType[] | [];
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
