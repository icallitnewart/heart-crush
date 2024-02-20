import { HOME_SCREEN, GAME_SCREEN } from '../constants/screen.constant';

export type ScreenType = typeof GAME_SCREEN | typeof HOME_SCREEN;

export type StageNumberType = number;

export interface SoundOptionsType {
	bgMusic: boolean;
	soundEffect: boolean;
}
