import React, {
	useRef,
	useLayoutEffect,
	useState,
	useContext,
	useEffect,
} from 'react';
import styled from 'styled-components';

import { GamePlayContext } from '../../states/GamePlayContext';
import {
	CHECK_MATCHING_HEARTS,
	DROP_HEARTS,
	REARRANGE_BOARD,
	STOP_MOVING_HEARTS,
	SWAP_HEARTS,
} from '../../constants/gamePlayActions.constant';
import { ANIMATION_DURATION } from '../../constants/settings.constant';

import Column from './Column';

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
	const {
		board,
		movingHearts,
		crushedHearts,
		fallingHearts,
		matchingCandidates,
		dispatchGamePlay,
	} = useContext(GamePlayContext);
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
		const isHeartsMoving =
			movingHearts && Object.keys(movingHearts).length === 2;

		if (isHeartsMoving) {
			animationTimer = setTimeout(() => {
				const [first, second] = Object.keys(movingHearts);
				if (
					movingHearts[first].isReturning &&
					movingHearts[second].isReturning
				) {
					dispatchGamePlay({ type: STOP_MOVING_HEARTS });
				} else {
					dispatchGamePlay({ type: SWAP_HEARTS });
				}
			}, animationDuration);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [movingHearts]);

	// 하트 크러쉬 애니메이션 모션이 끝나면
	// 하트 떨어뜨리기
	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;
		const animationDuration = ANIMATION_DURATION.CRUSHED_HEART;

		if (crushedHearts.length > 0) {
			animationTimer = setTimeout(() => {
				dispatchGamePlay({ type: DROP_HEARTS });
			}, animationDuration * 0.6);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [crushedHearts]);

	// 하트 떨어지는 애니메이션 모션이 끝나면
	// 보드 배열 재배치
	useEffect(() => {
		let animationTimer: ReturnType<typeof setTimeout> | undefined;
		const animationDuration = ANIMATION_DURATION.FALLING_HEART;

		if (fallingHearts.length > 0) {
			animationTimer = setTimeout(() => {
				dispatchGamePlay({ type: REARRANGE_BOARD });
			}, animationDuration);
		}

		return () => {
			if (animationTimer) clearTimeout(animationTimer);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fallingHearts]);

	// 하트 크러쉬 후 추가적인 매칭 검사
	useEffect(() => {
		if (matchingCandidates.length > 0) {
			dispatchGamePlay({ type: CHECK_MATCHING_HEARTS });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchingCandidates]);

	return (
		<Container>
			<Wrapper $isBoardReady={boardBoxHeight > 0}>
				<BoardBox $boardBoxHeight={boardBoxHeight}>
					{board.map((columnData, columnIndex) => (
						<Column
							key={columnData.id}
							ref={columnRef}
							columnData={columnData}
							columns={board.length}
							columnIndex={columnIndex}
						/>
					))}
				</BoardBox>
			</Wrapper>
		</Container>
	);
}

export default Board;
