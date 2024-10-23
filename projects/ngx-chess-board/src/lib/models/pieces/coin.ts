import { PieceConstant } from '../../utils/unicode-constants';
import { Board } from '../board';
import { Color } from './color';
import { Piece } from './piece';
import { Point } from './point';

export class Coin extends Piece {
    constructor(
        point: Point,
        color: Color,
        constant: PieceConstant,
        board: Board,
    ) {
        super(point, color, constant, 1, board);
    }

    getPossibleMoves(): Point[] {
        const possiblePoints = [];
        return possiblePoints;
    }

    getPossibleCaptures(): Point[] {
        const possiblePoints = [];
        return possiblePoints;
    }

    getCoveredFields(): Point[] {
        const possiblePoints = [];
        return possiblePoints;
    }
}
