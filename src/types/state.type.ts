import { POPUP, SCREEN } from '../constants/screen.constant';

export interface DisplaySliceStateType {
	screen: keyof typeof SCREEN;
	popup: keyof typeof POPUP | null;
}

export interface SoundSliceStateType {
	isSoundActivated: boolean;
	bgMusic: boolean;
	soundEffect: boolean;
}

export interface StoreStateType {
	display: DisplaySliceStateType;
	sound: SoundSliceStateType;
}
