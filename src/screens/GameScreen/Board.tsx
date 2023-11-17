import React from 'react';
import styled from 'styled-components';

import Column from './Column';

const Container = styled.main`
	display: flex;
	align-items: center;
	width: 100%;
	flex-grow: 1;
	max-height: calc(100% - 160px); //임시
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%; //가변적 (수정 필요)

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

const GameBoard = styled.ul`
	display: flex;
	width: calc(100% - 5vw);
	max-height: calc(100% - 5vw);
	padding: 5px;
	overflow: hidden;

	background-color: #f9f3cf;
	border: 1px solid #888;
	border-radius: 5px;
	box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

function Board() {
	return (
		<Container>
			<Wrapper>
				<GameBoard>
					{new Array(8).fill(0).map(_ => (
						// 추후 key값 추가 예정
						<Column />
					))}
				</GameBoard>
			</Wrapper>
		</Container>
	);
}

export default Board;
