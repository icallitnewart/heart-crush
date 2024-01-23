import HEART_ICONS, { MOVE_HEART } from '../constants/heart.constant';

// value
export type HeartIconType = (typeof HEART_ICONS)[keyof typeof HEART_ICONS];

// key
export type HeartType = keyof typeof HEART_ICONS;

export type HeartMovingDirectionType =
	(typeof MOVE_HEART)[keyof typeof MOVE_HEART];

export interface HeartPositionType {
	columnIndex: number;
	cellIndex: number;
}

export interface MovingHeartInfoType {
	heart: HeartType;
	direction: HeartMovingDirectionType;
	position: HeartPositionType;
	isReturning: boolean;
}

export interface MovingHeartsType {
	[id: string]: MovingHeartInfoType;
}

export interface HeartInfoType {
	id: string;
	heart: HeartType;
	position: HeartPositionType;
}

export interface HeartCoordsType {
	x: number;
	y: number;
}

export interface HeartDistanceType {
	dx: number;
	dy: number;
}
