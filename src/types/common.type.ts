import { SOUND_EFFECT_TYPE } from '../constants/audio.constant';
import HEART_ICONS from '../constants/heart.constant';

// key
export type HeartType = keyof typeof HEART_ICONS;

export interface HeartInfoType {
	id: string;
	heart: HeartType;
}

export type SoundEffectType =
	(typeof SOUND_EFFECT_TYPE)[keyof typeof SOUND_EFFECT_TYPE];
