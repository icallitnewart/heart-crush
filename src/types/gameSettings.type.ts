import {
	PopupType,
	ScreenType,
	SoundOptionsType,
	StageNumberType,
} from './gameSettingsStates.type';

export interface GameSettingsStateType {
	screen: ScreenType;
	popup: PopupType;
	soundOptions: SoundOptionsType;
	maxStageNumber: StageNumberType | null;
	selectedStageNumber: StageNumberType | null;
}

export interface GameSettingsContextType extends GameSettingsStateType {
	dispatchGameSettings: React.Dispatch<GameSettingsActionType>;
}

export interface GameSettingsActionType {
	type: string;
	screen?: ScreenType;
	popup?: PopupType;
	maxStageNumber?: StageNumberType;
	selectedStageNumber?: StageNumberType;
}
