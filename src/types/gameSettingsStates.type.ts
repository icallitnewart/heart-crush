import { SCREEN } from '../constants/screen.constant';

export type ScreenType = (typeof SCREEN)[keyof typeof SCREEN];

export type StageNumberType = number;

export interface SoundOptionsType {
	bgMusic: boolean;
	soundEffect: boolean;
}
