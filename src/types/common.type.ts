import HEART_ICONS from '../constants/heart.constant';

// key
export type HeartType = keyof typeof HEART_ICONS;

export interface HeartInfoType {
	id: string;
	heart: HeartType;
}
