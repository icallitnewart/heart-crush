import { HeartInfoType } from './common.type';

export type CellType = HeartInfoType;

export interface CellPositionType {
	columnIndex: number;
	rowIndex: number;
}

export interface CellInfoType extends CellType {
	position: CellPositionType;
}

export interface ColumnType {
	id: string;
	cells: CellType[];
}

export type BoardType = ColumnType[];

export type IsBoardValidType = boolean | null;

type IsSwapHintType = boolean | null;

export interface SwappableCellsInfoType {
	[id: string]: CellType;
}

export type SwappableCellsType = SwappableCellsInfoType | null;

export interface BoardStatusType {
	isValid: IsBoardValidType;
	swappableCells: SwappableCellsType;
	isSwapHint: IsSwapHintType;
}
