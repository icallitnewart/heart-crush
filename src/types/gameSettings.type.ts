export interface GameSettingsStateType {
	soundOptions: {
		bgMusic: boolean;
		soundEffect: boolean;
	};
	maxStageNumber: number | null;
	selectedStageNumber: number | null;
}

export interface GameSettingsContextType extends GameSettingsStateType {
	dispatch: React.Dispatch<GameSettingsActionType>;
}

export interface GameSettingsActionType {
	type: string;
	maxStageNumber?: number;
}
