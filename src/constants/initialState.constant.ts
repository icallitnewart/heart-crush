import { GamePlayStateType } from '../types/gamePlay.type';

export const GAME_PLAY: GamePlayStateType = {
	board: [],
	currentStageNumber: null,
	score: 0,
	move: 0,
	goal: {},
	result: null,
	crushedHearts: [],
	fallingHearts: [],
	matchingCandidates: [],
	movingHearts: null,
	isSwipeEnabled: true,
	isBonusTime: false,
};

const INITIAL_STATE = {
	GAME_PLAY,
};

export default INITIAL_STATE;
