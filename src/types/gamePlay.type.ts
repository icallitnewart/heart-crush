import { BoardType } from './board.type';
import { MovingHeartsType } from './heart.type';

interface GamePlaySettingsType {
	animationDuration: {
		movingHearts: number;
	};
}

export interface GamePlayStateType {
	board: BoardType;
	score: number;
	move: number;
	movingHearts: MovingHeartsType | null;
	isSwipeEnabled: boolean;
	goal: {
		score?: number;
	};
	settings: GamePlaySettingsType;
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
	settings?: GamePlaySettingsType;
	movingHearts?: MovingHeartsType | null;
}
