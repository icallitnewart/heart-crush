import { POPUP, SCREEN } from '../constants/screen.constant';
import { STAGE_FILES } from '../constants/stage.constant';

export type ScreenType = (typeof SCREEN)[keyof typeof SCREEN];

export type PopupType = (typeof POPUP)[keyof typeof POPUP] | null;

export type StageNumberType = keyof typeof STAGE_FILES;

export interface SelectedStageType {
	stageNumber: StageNumberType;
	timestamp: number;
}

export type UnlockedStageNumberType = StageNumberType;

export interface SoundOptionsType {
	bgMusic: boolean;
	soundEffect: boolean;
}
