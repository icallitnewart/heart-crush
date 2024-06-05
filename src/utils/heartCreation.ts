import HEART_ICONS from '../constants/heart.constant';
import { HeartType } from '../types/common.type';

export function getRandomHeart(): HeartType {
	const hearts: HeartType[] = Object.keys(HEART_ICONS).map(
		Number,
	) as HeartType[];
	return hearts[Math.floor(Math.random() * hearts.length)];
}
