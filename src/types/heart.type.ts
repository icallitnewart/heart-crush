import HEART_ICONS, { MOVE_HEART } from '../constants/heart.contsant';

// value
export type HeartIconType = (typeof HEART_ICONS)[keyof typeof HEART_ICONS];

// key
export type HeartType = keyof typeof HEART_ICONS;

// Cell.tsx ~
export type HeartMovingDirectionType =
	(typeof MOVE_HEART)[keyof typeof MOVE_HEART];

export interface HeartPositionType {
	columnIndex: number;
	cellIndex: number;
}

export interface MovingHeartInfoType {
	direction: HeartMovingDirectionType;
	position: HeartPositionType;
	isReturning: boolean;
}

export interface MovingHeartsType {
	[id: string]: MovingHeartInfoType;
}

export interface HeartCoordsType {
	x: number;
	y: number;
}

export interface HeartInfoType {
	id: string;
	position: {
		columnIndex: number;
		cellIndex: number;
	};
}
// ~ Cell.tsx
