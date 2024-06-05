import { ANIMATION_DURATION } from '../constants/ui.constant';
import { FallingHeartsType } from '../types/heart.type';

export function calculateLongestFallingSpeed(fallingHearts: FallingHeartsType) {
	const longestDistance = Math.max(
		...fallingHearts.map(heart => heart.distance),
	);

	const animationDuration =
		ANIMATION_DURATION.FALLING_HEART_BASE +
		(longestDistance - 1) * ANIMATION_DURATION.FALLING_HEART_EXTRA;

	return animationDuration;
}

export function calculateFallingSpeed(distance: number) {
	const animationDuration =
		ANIMATION_DURATION.FALLING_HEART_BASE +
		(distance - 1) * ANIMATION_DURATION.FALLING_HEART_EXTRA;

	return animationDuration;
}
