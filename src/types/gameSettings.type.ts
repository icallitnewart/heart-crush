import {
	ScreenType,
	SoundOptionsType,
	StageNumberType,
} from './gameSettingsStates.type';

export interface GameSettingsStateType {
	screen: ScreenType;
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
	maxStageNumber?: StageNumberType;
	selectedStageNumber?: StageNumberType;
}
