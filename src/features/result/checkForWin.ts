import { RESULT } from '../../constants/gameStatus.constant';
import {
	GoalType,
	MoveType,
	ResultType,
	ScoreType,
} from '../../types/gamePlayStates.type';

function hasScoreReachedGoal(currentScore: ScoreType, goalScore: ScoreType) {
	return currentScore >= goalScore;
}

function isConditionExist<T>(value: T | undefined): value is T {
	return value !== undefined;
}

function checkForWin(
	currentScore: ScoreType,
	goal: GoalType,
	move: MoveType,
): ResultType {
	const { score } = goal;

	if (isConditionExist(score) && hasScoreReachedGoal(currentScore, score)) {
		return RESULT.WIN;
	}

	if (move > 0) return null;
	return RESULT.LOSE;
}

export default checkForWin;
