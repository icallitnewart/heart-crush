import { GamePlayStateType } from '../types/gamePlay.type';
import { GameSettingsStateType } from '../types/gameSettings.type';
import { SCREEN } from './screen.constant';

export const GAME_PLAY_INITIAL_STATE: GamePlayStateType = {
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

export const GAME_SETTINGS_INITIAL_STATE: GameSettingsStateType = {
	screen: SCREEN.HOME,
	popup: null,
	soundOptions: {
		bgMusic: true,
		soundEffect: true,
	},
	maxStageNumber: null,
	selectedStage: null,
};
