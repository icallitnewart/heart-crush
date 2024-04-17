import { GamePlayStateType } from '../types/gamePlay.type';

export const GAME_PLAY_INITIAL_STATE: GamePlayStateType = {
	board: [],
	boardStatus: {
		isValid: null,
		validSwap: null,
	},
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
