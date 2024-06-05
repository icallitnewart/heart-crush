import { SOUND_EFFECT_TYPE } from '../constants/audio.constant';
import HEART_ICONS from '../constants/heart.constant';
import {
	ERROR_REASON,
	ERROR_SLICE,
	ERROR_TYPE,
} from '../constants/error.constant';

// key
export type HeartType = keyof typeof HEART_ICONS;

export interface HeartInfoType {
	id: string;
	heart: HeartType;
}

export type SoundEffectType =
	(typeof SOUND_EFFECT_TYPE)[keyof typeof SOUND_EFFECT_TYPE];

export type ErrorTypeType = keyof typeof ERROR_TYPE;
export type ErrorSliceType = keyof typeof ERROR_SLICE;
export type ErrorReasonType = keyof typeof ERROR_REASON;

interface ErrorBaseType {
	message: string;
}

// ErrorBoundary
export interface RenderErrorType extends ErrorBaseType {
	reason?: ErrorReasonType;
}

export interface StateErrorType extends ErrorBaseType {
	reason: ErrorReasonType;
	sliceName: ErrorSliceType;
}

export interface ErrorType {
	error: StateErrorType | RenderErrorType;
}
