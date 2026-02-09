import { Board } from '../../../../../models/board';
import { Bishop } from '../../../../../models/pieces/bishop';
import { Color } from '../../../../../models/pieces/color';
import { King } from '../../../../../models/pieces/king';
import { Knight } from '../../../../../models/pieces/knight';
import { Pawn } from '../../../../../models/pieces/pawn';
import { Point } from '../../../../../models/pieces/point';
import { Queen } from '../../../../../models/pieces/queen';
import { Rook } from '../../../../../models/pieces/rook';
import { Coin } from '../../../../../models/pieces/coin';
import { UnicodeConstants } from '../../../../../utils/unicode-constants';
import { AbstractEngineFacade } from '../../../../abstract-engine-facade';
import { NotationProcessor } from '../notation-processor';

export class DefaultFenProcessor implements NotationProcessor {
    public process(notation: string, engineFacade: AbstractEngineFacade): void {
        let fen = notation;
        if (notation) {
            engineFacade.board.reverted = false;
            engineFacade.board.pieces = [];
            const split = fen.split('/');
            for (let i = 0; i < 8; ++i) {
                let pointer = 0;
                for (let j = 0; j < split[i].split(' ')[0].length; ++j) {
                    const chunk = split[i].charAt(j);
                    if (chunk.match(/[0-9]/)) {
                        pointer += Number(chunk);
                    } else {
                        switch (chunk) {
                            case 'c':
                                engineFacade.board.pieces.push(
                                    new Coin(
                                        new Point(i, pointer),
                                        Color.BLACK,
                                        UnicodeConstants.BLACK_COIN,
                                        engineFacade.board,
                                    ),
                                );
                                break;
                            case 'r':
                                engineFacade.board.pieces.push(
                                    new Rook(
                                        new Point(i, pointer),
                                        Color.BLACK,
                                        UnicodeConstants.BLACK_ROOK,
                                        engineFacade.board,
                                    ),
                                );
                                break;
                            case 'n':
                                engineFacade.board.pieces.push(
                                    new Knight(
                                        new Point(i, pointer),
                                        Color.BLACK,
                                        UnicodeConstants.BLACK_KNIGHT,
                                        engineFacade.board,
                                    ),
                                );

                                break;
                            case 'b':
                                engineFacade.board.pieces.push(
                                    new Bishop(
                                        new Point(i, pointer),
                                        Color.BLACK,
                                        UnicodeConstants.BLACK_BISHOP,
                                        engineFacade.board,
                                    ),
                                );
                                break;
                            case 'q':
                                engineFacade.board.pieces.push(
                                    new Queen(
                                        new Point(i, pointer),
                                        Color.BLACK,
                                        UnicodeConstants.BLACK_QUEEN,
                                        engineFacade.board,
                                    ),
                                );
                                break;
                            case 'k':
                                engineFacade.board.pieces.push(
                                    new King(
                                        new Point(i, pointer),
                                        Color.BLACK,
                                        UnicodeConstants.BLACK_KING,
                                        engineFacade.board,
                                    ),
                                );
                                break;
                            case 'p': {
                                const pawn = new Pawn(
                                    new Point(i, pointer),
                                    Color.BLACK,
                                    UnicodeConstants.BLACK_PAWN,
                                    engineFacade.board,
                                );
                                if (
                                    (pawn.color === Color.BLACK &&
                                        pawn.point.row !== 1) ||
                                    (pawn.color === Color.WHITE &&
                                        pawn.point.row !== 6)
                                ) {
                                    pawn.isMovedAlready = true;
                                }
                                engineFacade.board.pieces.push(pawn);
                                break;
                            }
                            case 'R':
                                engineFacade.board.pieces.push(
                                    new Rook(
                                        new Point(i, pointer),
                                        Color.WHITE,
                                        UnicodeConstants.WHITE_ROOK,
                                        engineFacade.board,
                                    ),
                                );

                                break;
                            case 'N':
                                engineFacade.board.pieces.push(
                                    new Knight(
                                        new Point(i, pointer),
                                        Color.WHITE,
                                        UnicodeConstants.WHITE_KNIGHT,
                                        engineFacade.board,
                                    ),
                                );
                                break;

                            case 'B':
                                engineFacade.board.pieces.push(
                                    new Bishop(
                                        new Point(i, pointer),
                                        Color.WHITE,
                                        UnicodeConstants.WHITE_BISHOP,
                                        engineFacade.board,
                                    ),
                                );
                                break;

                            case 'Q':
                                engineFacade.board.pieces.push(
                                    new Queen(
                                        new Point(i, pointer),
                                        Color.WHITE,
                                        UnicodeConstants.WHITE_QUEEN,
                                        engineFacade.board,
                                    ),
                                );
                                break;

                            case 'K':
                                engineFacade.board.pieces.push(
                                    new King(
                                        new Point(i, pointer),
                                        Color.WHITE,
                                        UnicodeConstants.WHITE_KING,
                                        engineFacade.board,
                                    ),
                                );
                                break;

                            case 'P': {
                                const pawn = new Pawn(
                                    new Point(i, pointer),
                                    Color.WHITE,
                                    UnicodeConstants.WHITE_PAWN,
                                    engineFacade.board,
                                );
                                if (
                                    (pawn.color === Color.BLACK &&
                                        pawn.point.row !== 1) ||
                                    (pawn.color === Color.WHITE &&
                                        pawn.point.row !== 6)
                                ) {
                                    pawn.isMovedAlready = true;
                                }
                                engineFacade.board.pieces.push(pawn);
                                break;
                            }
                        }
                        ++pointer;
                    }
                }
            }

            this.setCurrentPlayer(engineFacade.board, fen);
            this.setCastles(engineFacade.board, fen);
            this.setEnPassant(engineFacade.board, fen);
            this.setFullMoveCount(fen);
            engineFacade.board.fen = fen;
        } else {
            throw Error('Incorrect FEN provided');
        }
    }

    private setCurrentPlayer(board: Board, fen: string) {
        if (fen) {
            const split = fen.split(' ');
            board.currentWhitePlayer = split[1] === 'w';
        }
    }

    private setCastles(board: Board, fen: string) {
        if (fen) {
            const split = fen.split(' ');
            const castleChunk = split[2];

            if (!castleChunk.includes('K')) {
                this.setRookAlreadyMoved(board, Color.WHITE, 7);
            }

            if (!castleChunk.includes('Q')) {
                this.setRookAlreadyMoved(board, Color.WHITE, 0);
            }

            if (!castleChunk.includes('k')) {
                this.setRookAlreadyMoved(board, Color.BLACK, 7);
            }

            if (!castleChunk.includes('q')) {
                this.setRookAlreadyMoved(board, Color.BLACK, 0);
            }
        }
    }

    private setFullMoveCount(fen: string) {}

    private setEnPassant(board: Board, fen: string) {
        if (fen) {
            const split = fen.split(' ');
            const enPassantSquare = split[3];

            if (enPassantSquare === '-') {
                board.enPassantPoint = null;
                board.enPassantPiece = null;
                return;
            }

            // Parse the en passant square (e.g., "e3" or "d6")
            const col = enPassantSquare.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
            const row = 8 - parseInt(enPassantSquare.charAt(1)); // Convert to 0-based board coordinates

            // Validate the square is within board bounds
            if (row < 0 || row > 7 || col < 0 || col > 7) {
                board.enPassantPoint = null;
                board.enPassantPiece = null;
                return;
            }

            board.enPassantPoint = new Point(row, col);

            // Find the pawn that can be captured via en passant
            // The pawn should be on the adjacent row to the en passant square
            const pawnRow = board.currentWhitePlayer ? row + 1 : row - 1;
            const targetPawn = board.getPieceByPoint(pawnRow, col);

            // Validate that there's actually a pawn of the opposite color that can be captured
            if (targetPawn && 
                targetPawn instanceof Pawn && 
                targetPawn.color !== (board.currentWhitePlayer ? Color.WHITE : Color.BLACK)) {
                board.enPassantPiece = targetPawn;
            } else {
                // Invalid en passant state, clear it
                board.enPassantPoint = null;
                board.enPassantPiece = null;
            }
        }
    }

    private setRookAlreadyMoved(board: Board, color: Color, col: number) {
        const rook = board.pieces.find(
            (piece) =>
                piece.color === color &&
                piece instanceof Rook &&
                piece.point.col === col,
        ) as Rook;

        if (rook) {
            rook.isMovedAlready = true;
        }
    }
}
