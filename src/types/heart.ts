import HEART_ICONS, { MOVE_HEART } from '../constants/heart';

// value
export type HeartIconType = (typeof HEART_ICONS)[keyof typeof HEART_ICONS];

// key
export type HeartType = keyof typeof HEART_ICONS;

// Cell.tsx ~
export type HeartMovingDirectionType =
	(typeof MOVE_HEART)[keyof typeof MOVE_HEART];

export interface MovingHeartsType {
	[x: string]: HeartMovingDirectionType;
}

export interface HeartCoordsType {
	x: number;
	y: number;
}

export interface HeartInfoType {
	id: string;
	location: {
		columnIndex: number;
		cellIndex: number;
	};
}
// ~ Cell.tsx
