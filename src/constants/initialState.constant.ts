import { GamePlayStateType } from '../types/gamePlay.type';
import { GameSettingsStateType } from '../types/gameSettings.type';
import { POPUP, SCREEN } from './screen.constant';

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

export const GAME_SETTINGS_INITIAL_STATE: GameSettingsStateType = {
	screen: SCREEN.HOME,
	popup: POPUP.SOUND_ALERT,
	soundOptions: {
		bgMusic: true,
		soundEffect: true,
	},
	unlockedStageNumber: null,
	selectedStage: null,
};
