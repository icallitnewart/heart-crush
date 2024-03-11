import {
	PopupType,
	ScreenType,
	SelectedStageType,
	SoundOptionsType,
	StageNumberType,
	UnlockedStageNumberType,
} from './gameSettingsStates.type';

export interface GameSettingsStateType {
	screen: ScreenType;
	popup: PopupType;
	soundOptions: SoundOptionsType;
	unlockedStageNumber: UnlockedStageNumberType | null;
	selectedStage: SelectedStageType | null;
}

export interface GameSettingsContextType extends GameSettingsStateType {
	dispatchGameSettings: React.Dispatch<GameSettingsActionType>;
	playSoundEffect: (src: string) => void;
}

export interface GameSettingsActionType {
	type: string;
	screen?: ScreenType;
	popup?: PopupType;
	maxStageNumber?: StageNumberType;
	selectedStageNumber?: StageNumberType;
}
