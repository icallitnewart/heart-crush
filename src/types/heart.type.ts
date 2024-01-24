import HEART_ICONS, { MOVE_HEART } from '../constants/heart.constant';
import { CellInfoType } from './board.type';

// value
export type HeartIconType = (typeof HEART_ICONS)[keyof typeof HEART_ICONS];

export type HeartMovingDirectionType =
	(typeof MOVE_HEART)[keyof typeof MOVE_HEART];

export type MovingHeartInfoType = Omit<CellInfoType, 'id'> & {
	direction: HeartMovingDirectionType;
	isReturning: boolean;
};

export interface MovingHeartsType {
	[id: string]: MovingHeartInfoType;
}

export interface HeartCoordsType {
	x: number;
	y: number;
}

export interface HeartDistanceType {
	dx: number;
	dy: number;
}
