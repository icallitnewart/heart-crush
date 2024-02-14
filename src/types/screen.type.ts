import { HOME_SCREEN, GAME_SCREEN } from '../constants/screen.constant';

export type Screen = typeof GAME_SCREEN | typeof HOME_SCREEN;

export type SwitchScreenFunction = (newScreen: Screen) => void;
