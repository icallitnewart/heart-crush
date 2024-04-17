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

export interface ValidSwapCellInfoType {
	[id: string]: CellType;
}

export type ValidSwapType = ValidSwapCellInfoType | null;

export interface BoardStatusType {
	isValid: IsBoardValidType;
	validSwap: ValidSwapType;
}
