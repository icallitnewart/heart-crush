import { POPUP, SCREEN } from '../constants/screen.constant';
import { STAGE_FILES } from '../constants/stage.constant';

// DisplaySliceStateType : Start
export interface DisplaySliceStateType {
	screen: keyof typeof SCREEN;
	popup: keyof typeof POPUP | null;
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

interface CurrentStageType {
	stageNumber: StageNumberType;
	move: number;
	columns: number;
	rows: number;
	goal: {
		score?: number;
	};
}

interface SelectedStageType {
	stageNumber: StageNumberType;
	timestamp: number;
}

export interface UnlockedStageType {
	maxStageNumber: StageNumberType;
}

export interface StageSliceStateType {
	unlockedStage: UnlockedStageType;
	selectedStage: SelectedStageType | null;
	currentStage: CurrentStageType | null;
}
// StageSliceStateType : End

export interface StoreStateType {
	display: DisplaySliceStateType;
	sound: SoundSliceStateType;
	stage: StageSliceStateType;
}
