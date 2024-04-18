import React, {
	useRef,
	useLayoutEffect,
	useState,
	useContext,
	useEffect,
} from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import { ANIMATION_DURATION } from '../../constants/ui.constant';
import { SOUND_EFFECT_TYPE } from '../../constants/audio.constant';

import { SoundEffectContext } from '../../context/SoundManager';
import {
	checkExtraMatchingHearts,
	dropHearts,
	rearrangeBoard,
	resetBoard,
	returnHearts,
	swapHearts,
} from '../../redux/slices/gameSlice';
import { calculateLongestFallingSpeed } from '../../utils/heartFallingSpeed';

import Column from './Column';
import ResetAlert from './ResetAlert';

const Container = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-grow: 1;
`;

interface WrapperStyleProps {
	$isBoardReady?: boolean;
}

const Wrapper = styled.div<WrapperStyleProps>`
	opacity: ${props => (props.$isBoardReady ? 1 : 0)};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 480px;
	padding: 12px;
	transition: opacity 1s;

	background: repeating-linear-gradient(
		45deg,
		var(--main-color-yellow) 15px,
		#888 15px,
		var(--main-color-purple) 16px,
		var(--main-color-purple) 30px,
		#888 30px,
		var(--main-color-yellow) 31px,
		var(--main-color-yellow) 45px
	);
	border: 1px solid #888;
	border-radius: 5px;
	box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
`;

interface BoardBoxStyleProps {
	$boardBoxHeight: number;
}

const BoardBox = styled.ul<BoardBoxStyleProps>`
	position: relative;
	display: flex;
	width: 100%;
	height: ${props =>
		props.$boardBoxHeight > 0
			? `calc(${props.$boardBoxHeight}px + 5px)`
			: '100%'};
	padding: 0px 5px;
	overflow: hidden;

	background-color: #f9f3cf;
	border: 1px solid #888;
	border-radius: 5px;
	box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

function Board() {
	const isMountedRef = useRef(false);
	const dispatch = useAppDispatch();
	const board = useAppSelector(state => state.game.board);
	const isBoardValid = useAppSelector(state => state.game.boardStatus.isValid);
	const movingHearts = useAppSelector(state => state.game.movingHearts);
	const crushedHearts = useAppSelector(state => state.game.crushedHearts);
	const fallingHearts = useAppSelector(state => state.game.fallingHearts);
	const matchingCandidates = useAppSelector(
		state => state.game.matchingCandidates,
	);
	const { playSoundEffect } = useContext(SoundEffectContext);
	const [resetAlert, setResetAlert] = useState<boolean>(false);
	const [boardBoxHeight, setBoardBoxHeight] = useState<number>(0);
	const columnRef = useRef<HTMLLIElement>(null);

	// 게임 보드 높이 설정
	useLayoutEffect(() => {
		if (!isMountedRef.current && board.length > 0 && columnRef.current) {
			const columnHeight = columnRef.current.offsetHeight;
			setBoardBoxHeight(columnHeight / 2);
			isMountedRef.current = true;
		}
	}, [isMountedRef, columnRef, board]);

	// 하트 이동 애니메이션 모션이 끝나면
	// 하트 원위치로 되돌리기 or 하트 교환
	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;
		const animationDuration = ANIMATION_DURATION.MOVING_HEART;

		if (movingHearts) {
			const canHeartSwap = Object.values(movingHearts).every(
				heart => !heart.isReturning,
			);

			if (!canHeartSwap) {
				playSoundEffect(SOUND_EFFECT_TYPE.HEART_SWAP_FAIL);
			}

			animationTimer = setTimeout(() => {
				if (canHeartSwap) {
					dispatch(swapHearts());
				} else {
					dispatch(returnHearts());
				}
			}, animationDuration);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};
	}, [movingHearts, dispatch, playSoundEffect]);

	// 하트 크러쉬 효과음 재생
	// 하트 크러쉬 애니메이션 모션이 끝나면 하트 떨어뜨리기
	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;
		const animationDuration = ANIMATION_DURATION.CRUSHED_HEART;

		if (crushedHearts.length > 0) {
			playSoundEffect(SOUND_EFFECT_TYPE.HEART_CRUSH);

			animationTimer = setTimeout(() => {
				dispatch(dropHearts());
			}, animationDuration * 0.6);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};
	}, [crushedHearts, dispatch, playSoundEffect]);

	// 하트 떨어지는 애니메이션 모션이 끝나면
	// 보드 배열 재배치
	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;
		const animationDuration = calculateLongestFallingSpeed(fallingHearts);

		if (fallingHearts.length > 0) {
			animationTimer = setTimeout(() => {
				dispatch(rearrangeBoard());
			}, animationDuration);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};
	}, [fallingHearts, dispatch]);

	// 보드 재배치 후 추가적인 매칭 검사
	useEffect(() => {
		if (matchingCandidates.length > 0) {
			dispatch(checkExtraMatchingHearts());
		}
	}, [matchingCandidates, dispatch]);

	// 보드가 유효하지 않으면 보드 초기화
	useEffect(() => {
		let alertTimer: ReturnType<typeof setTimeout> | undefined;
		if (isBoardValid === false) {
			setResetAlert(true);

			alertTimer = setTimeout(() => {
				dispatch(resetBoard());
				setResetAlert(false);
			}, ANIMATION_DURATION.RESET_BOARD_ALERT);
		}

		return () => {
			if (alertTimer) clearTimeout(alertTimer);
		};
	}, [isBoardValid, dispatch]);

	return (
		<Container>
			<Wrapper $isBoardReady={boardBoxHeight > 0}>
				<BoardBox $boardBoxHeight={boardBoxHeight}>
					{resetAlert ? (
						<ResetAlert /> // TODO: BoardBox 밖으로 빼기
					) : (
						board.map((columnData, columnIndex) => (
							<Column
								key={columnData.id}
								ref={columnRef}
								columnData={columnData}
								columns={board.length}
								columnIndex={columnIndex}
							/>
						))
					)}
				</BoardBox>
			</Wrapper>
		</Container>
	);
}

export default Board;
