import HEART_ICONS from '../constants/heart';

// value
export type HeartIconType = (typeof HEART_ICONS)[keyof typeof HEART_ICONS];

// key
export type HeartType = keyof typeof HEART_ICONS;
