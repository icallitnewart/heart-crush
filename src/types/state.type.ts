import { POPUP, SCREEN } from '../constants/screen.constant';
import { STAGE_FILES } from '../constants/stage.constant';

// DisplaySliceStateType : Start
export type ScreenType = keyof typeof SCREEN;
export type PopupType = keyof typeof POPUP | null;

export interface DisplaySliceStateType {
	screen: ScreenType;
	popup: PopupType;
}
// DisplaySliceStateType : End

// SoundSliceStateType : Start
export interface SoundSliceStateType {
	isSoundActivated: boolean;
	bgMusic: boolean;
	soundEffect: boolean;
}
// SoundSliceStateType : End

// StageSliceStateType : Start
export type StageNumberType = keyof typeof STAGE_FILES;

interface StageConfigType {
	stageNumber: StageNumberType;
	move: number;
	columns: number;
	rows: number;
	goal: {
		score?: number;
	};
}

export interface CurrentStageType {
	data: StageConfigType | null;
	timestamp: number | null;
	loading: boolean;
	error: null | string;
}

export interface UnlockedStageType {
	maxStageNumber: StageNumberType;
}

export interface StageSliceStateType {
	unlockedStage: UnlockedStageType;
	currentStage: CurrentStageType;
}
// StageSliceStateType : End

export interface StoreStateType {
	display: DisplaySliceStateType;
	sound: SoundSliceStateType;
	stage: StageSliceStateType;
}
