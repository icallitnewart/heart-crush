import { POPUP, SCREEN } from '../constants/screen.constant';

export type ScreenType = (typeof SCREEN)[keyof typeof SCREEN];

export type PopupType = (typeof POPUP)[keyof typeof POPUP] | null;

export type StageNumberType = number;

export interface SoundOptionsType {
	bgMusic: boolean;
	soundEffect: boolean;
}
