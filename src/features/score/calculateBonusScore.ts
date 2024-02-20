import { BONUS_SCORE_PER_MOVE } from '../../constants/score.constant';
import { ScoreType } from '../../types/gamePlayStates.type';

function calculateBonusScore(score: ScoreType) {
	return score + BONUS_SCORE_PER_MOVE;
}

export default calculateBonusScore;
