import { HistoryMove } from '../history-move-provider/history-move';
import { AbstractEngineFacade } from './abstract-engine-facade';
import { BoardLoader } from './board-state-provider/board-loader/board-loader';
import { BoardState } from './board-state-provider/board-state/board-state';
import { BoardStateProvider } from './board-state-provider/board-state/board-state-provider';
import { ClickUtils } from './click/click-utils';
import { Arrow } from './drawing-tools/shapes/arrow';
import { Circle } from './drawing-tools/shapes/circle';
import { Color } from '../models/pieces/color';
import { King } from '../models/pieces/king';
import { Pawn } from '../models/pieces/pawn';
import { Point } from '../models/pieces/point';
import { AvailableMoveDecorator } from './piece-decorator/available-move-decorator';
import { PiecePromotionResolver } from '../piece-promotion/piece-promotion-resolver';
import { MoveUtils } from '../utils/move-utils';
import { PieceFactory } from './utils/piece-factory';
export class EngineFacade extends AbstractEngineFacade {
    constructor(board, moveChange) {
        super(board);
        this._selected = false;
        this.moveChange = moveChange;
        this.boardLoader = new BoardLoader(this);
        this.boardLoader.addPieces();
        this.boardStateProvider = new BoardStateProvider();
    }
    reset() {
        this.boardStateProvider.clear();
        this.moveHistoryProvider.clear();
        this.boardLoader.addPieces();
        this.board.reset();
        this.coords.reset();
        this.drawProvider.clear();
        this.pgnProcessor.reset();
    }
    undo() {
        if (!this.boardStateProvider.isEmpty()) {
            const lastBoard = this.boardStateProvider.pop().board;
            if (this.board.reverted) {
                lastBoard.reverse();
            }
            this.board = lastBoard;
            this.board.possibleCaptures = [];
            this.board.possibleMoves = [];
            this.board.activePiece = null;
            this.moveHistoryProvider.pop();
            this.board.calculateFEN();
            this.pgnProcessor.removeLast();
        }
    }
    saveMoveClone() {
        const clone = this.board.clone();
        if (this.board.reverted) {
            clone.reverse();
        }
        this.moveStateProvider.addMove(new BoardState(clone));
    }
    move(coords) {
        if (coords) {
            const sourceIndexes = MoveUtils.translateCoordsToIndex(coords.substring(0, 2), this.board.reverted);
            const destIndexes = MoveUtils.translateCoordsToIndex(coords.substring(2, 4), this.board.reverted);
            const srcPiece = this.board.getPieceByPoint(sourceIndexes.yAxis, sourceIndexes.xAxis);
            if (srcPiece) {
                if ((this.board.currentWhitePlayer &&
                    srcPiece.color === Color.BLACK) ||
                    (!this.board.currentWhitePlayer &&
                        srcPiece.color === Color.WHITE)) {
                    return;
                }
                this.prepareActivePiece(srcPiece, srcPiece.point);
                if (this.board.isPointInPossibleMoves(new Point(destIndexes.yAxis, destIndexes.xAxis)) ||
                    this.board.isPointInPossibleCaptures(new Point(destIndexes.yAxis, destIndexes.xAxis))) {
                    this.saveClone();
                    this.movePiece(srcPiece, new Point(destIndexes.yAxis, destIndexes.xAxis), coords.length === 5 ? +coords.substring(4, 5) : 0);
                    this.board.lastMoveSrc = new Point(sourceIndexes.yAxis, sourceIndexes.xAxis);
                    this.board.lastMoveDest = new Point(destIndexes.yAxis, destIndexes.xAxis);
                    this.disableSelection();
                }
                else {
                    this.disableSelection();
                }
            }
        }
    }
    prepareActivePiece(pieceClicked, pointClicked) {
        this.board.activePiece = pieceClicked;
        this._selected = true;
        this.board.possibleCaptures = new AvailableMoveDecorator(pieceClicked, pointClicked, this.board.currentWhitePlayer ? Color.WHITE : Color.BLACK, this.board).getPossibleCaptures();
        this.board.possibleMoves = new AvailableMoveDecorator(pieceClicked, pointClicked, this.board.currentWhitePlayer ? Color.WHITE : Color.BLACK, this.board).getPossibleMoves();
    }
    onPieceClicked(pieceClicked, pointClicked) {
        if ((this.board.currentWhitePlayer &&
            pieceClicked.color === Color.BLACK) ||
            (!this.board.currentWhitePlayer &&
                pieceClicked.color === Color.WHITE)) {
            return;
        }
        this.prepareActivePiece(pieceClicked, pointClicked);
    }
    handleClickEvent(pointClicked, isMouseDown) {
        let moving = false;
        if ((this.board.isPointInPossibleMoves(pointClicked) ||
            this.board.isPointInPossibleCaptures(pointClicked) ||
            this.freeMode) &&
            pointClicked.isInRange()) {
            this.saveClone();
            this.board.lastMoveSrc = new Point(this.board.activePiece.point.row, this.board.activePiece.point.col);
            this.board.lastMoveDest = pointClicked.clone();
            this.movePiece(this.board.activePiece, pointClicked);
            if (!this.board.activePiece.point.isEqual(this.board.lastMoveSrc)) {
                moving = true;
            }
        }
        if (isMouseDown || moving) {
            this.disableSelection();
        }
        this.disableSelection();
        const pieceClicked = this.board.getPieceByPoint(pointClicked.row, pointClicked.col);
        if (pieceClicked && !moving) {
            this.onFreeMode(pieceClicked);
            this.onPieceClicked(pieceClicked, pointClicked);
        }
    }
    onMouseDown(event, pointClicked, left, top) {
        this.moveDone = false;
        if (event.button !== 0) {
            this.drawPoint = ClickUtils.getDrawingPoint(this.heightAndWidth, this.colorStrategy, event.x, event.y, event.ctrlKey, event.altKey, event.shiftKey, left, top);
            return;
        }
        this.drawProvider.clear();
        if (this.board.activePiece &&
            pointClicked.isEqual(this.board.activePiece.point)) {
            this.disabling = true;
            return;
        }
        const pieceClicked = this.board.getPieceByPoint(pointClicked.row, pointClicked.col);
        if (this.freeMode) {
            if (pieceClicked) {
                if (event.ctrlKey) {
                    this.board.pieces = this.board.pieces.filter((e) => e !== pieceClicked);
                    return;
                }
                this.board.currentWhitePlayer =
                    pieceClicked.color === Color.WHITE;
            }
        }
        if (this.isPieceDisabled(pieceClicked)) {
            return;
        }
        if (this._selected) {
            this.handleClickEvent(pointClicked, true);
        }
        else {
            if (pieceClicked) {
                this.onFreeMode(pieceClicked);
                this.onPieceClicked(pieceClicked, pointClicked);
            }
        }
    }
    onMouseUp(event, pointClicked, left, top) {
        this.moveDone = false;
        if (event.button !== 0 && !this.drawDisabled) {
            this.addDrawPoint(event.x, event.y, event.ctrlKey, event.altKey, event.shiftKey, left, top);
            return;
        }
        this.drawProvider.clear();
        if (this.dragDisabled) {
            return;
        }
        if (this.board.activePiece &&
            pointClicked.isEqual(this.board.activePiece.point) &&
            this.disabling) {
            this.disableSelection();
            this.disabling = false;
            return;
        }
        const pieceClicked = this.board.getPieceByPoint(pointClicked.row, pointClicked.col);
        if (this.isPieceDisabled(pieceClicked)) {
            return;
        }
        if (this._selected) {
            this.handleClickEvent(pointClicked, false);
            //   this.possibleMoves = activePiece.getPossibleMoves();
        }
    }
    saveClone() {
        const clone = this.board.clone();
        if (this.board.reverted) {
            clone.reverse();
        }
        this.boardStateProvider.addMove(new BoardState(clone));
    }
    movePiece(toMovePiece, newPoint, promotionIndex) {
        const destPiece = this.board.pieces.find((piece) => piece.point.col === newPoint.col &&
            piece.point.row === newPoint.row);
        this.pgnProcessor.process(this.board, toMovePiece, newPoint, destPiece);
        if (destPiece && toMovePiece.color !== destPiece.color) {
            this.board.pieces = this.board.pieces.filter((piece) => piece !== destPiece);
        }
        else {
            if (destPiece && toMovePiece.color === destPiece.color) {
                return;
            }
        }
        this.historyMoveCandidate = new HistoryMove(MoveUtils.format(toMovePiece.point, newPoint, this.board.reverted), toMovePiece.constant.name, toMovePiece.color === Color.WHITE ? 'white' : 'black', !!destPiece);
        this.moveHistoryProvider.addMove(this.historyMoveCandidate);
        if (toMovePiece instanceof King) {
            const squaresMoved = Math.abs(newPoint.col - toMovePiece.point.col);
            if (squaresMoved > 1) {
                if (newPoint.col < 3) {
                    const leftRook = this.board.getPieceByField(toMovePiece.point.row, 0);
                    if (!this.freeMode) {
                        leftRook.point.col = this.board.reverted ? 2 : 3;
                    }
                }
                else {
                    const rightRook = this.board.getPieceByField(toMovePiece.point.row, 7);
                    if (!this.freeMode) {
                        rightRook.point.col = this.board.reverted ? 4 : 5;
                    }
                }
            }
        }
        if (toMovePiece instanceof Pawn) {
            this.board.checkIfPawnTakesEnPassant(newPoint);
            this.board.checkIfPawnEnpassanted(toMovePiece, newPoint);
        }
        else {
            this.board.enPassantPoint = null;
            this.board.enPassantPiece = null;
        }
        toMovePiece.point = newPoint;
        this.increaseFullMoveCount();
        this.board.currentWhitePlayer = !this.board.currentWhitePlayer;
        if (!this.checkForPawnPromote(toMovePiece, promotionIndex)) {
            this.afterMoveActions();
        }
    }
    checkForPawnPromote(toPromotePiece, promotionIndex) {
        if (!(toPromotePiece instanceof Pawn)) {
            return;
        }
        if (toPromotePiece.point.row === 0 || toPromotePiece.point.row === 7) {
            this.board.pieces = this.board.pieces.filter((piece) => piece !== toPromotePiece);
            // When we make move manually, we pass promotion index already, so we don't need
            // to acquire it from promote dialog
            if (!promotionIndex) {
                this.openPromoteDialog(toPromotePiece);
            }
            else {
                PiecePromotionResolver.resolvePromotionChoice(this.board, toPromotePiece, promotionIndex);
                this.afterMoveActions(promotionIndex);
            }
            return true;
        }
    }
    afterMoveActions(promotionIndex) {
        this.checkIfPawnFirstMove(this.board.activePiece);
        this.checkIfRookMoved(this.board.activePiece);
        this.checkIfKingMoved(this.board.activePiece);
        this.board.blackKingChecked = this.board.isKingInCheck(Color.BLACK, this.board.pieces);
        this.board.whiteKingChecked = this.board.isKingInCheck(Color.WHITE, this.board.pieces);
        const check = this.board.blackKingChecked || this.board.whiteKingChecked;
        const checkmate = this.checkForPossibleMoves(Color.BLACK) ||
            this.checkForPossibleMoves(Color.WHITE);
        const stalemate = this.checkForPat(Color.BLACK) || this.checkForPat(Color.WHITE);
        this.historyMoveCandidate.setGameStates(check, stalemate, checkmate);
        this.pgnProcessor.processChecks(checkmate, check, stalemate);
        this.pgnProcessor.addPromotionChoice(promotionIndex);
        this.disabling = false;
        this.board.calculateFEN();
        const lastMove = this.moveHistoryProvider.getLastMove();
        if (lastMove && promotionIndex) {
            lastMove.move += promotionIndex;
        }
        this.moveChange.emit({
            ...lastMove,
            check,
            checkmate,
            stalemate,
            fen: this.board.fen,
            pgn: {
                pgn: this.pgnProcessor.getPGN(),
            },
            freeMode: this.freeMode,
        });
        this.moveDone = true;
    }
    checkForPat(color) {
        if (color === Color.WHITE && !this.board.whiteKingChecked) {
            return this.checkForPossibleMoves(color);
        }
        else {
            if (color === Color.BLACK && !this.board.blackKingChecked) {
                return this.checkForPossibleMoves(color);
            }
        }
    }
    openPromoteDialog(piece) {
        if (piece.color === this.board.activePiece.color) {
            this.modal.open((index) => {
                PiecePromotionResolver.resolvePromotionChoice(this.board, piece, index);
                this.afterMoveActions(index);
            });
        }
    }
    checkForPossibleMoves(color) {
        return !this.board.pieces
            .filter((piece) => piece.color === color)
            .some((piece) => piece
            .getPossibleMoves()
            .some((move) => !MoveUtils.willMoveCauseCheck(color, piece.point.row, piece.point.col, move.row, move.col, this.board)) ||
            piece
                .getPossibleCaptures()
                .some((capture) => !MoveUtils.willMoveCauseCheck(color, piece.point.row, piece.point.col, capture.row, capture.col, this.board)));
    }
    disableSelection() {
        this._selected = false;
        this.board.possibleCaptures = [];
        this.board.activePiece = null;
        this.board.possibleMoves = [];
    }
    /**
     * Processes logic to allow freeMode based logic processing
     */
    onFreeMode(pieceClicked) {
        if (!this.freeMode ||
            pieceClicked === undefined ||
            pieceClicked === null) {
            return;
        }
        // sets player as white in-case white pieces are selected, and vice-versa when black is selected
        this.board.currentWhitePlayer = pieceClicked.color === Color.WHITE;
    }
    isPieceDisabled(pieceClicked) {
        if (pieceClicked && pieceClicked.point) {
            const foundCapture = this.board.possibleCaptures.find((capture) => capture.col === pieceClicked.point.col &&
                capture.row === pieceClicked.point.row);
            if (foundCapture) {
                return false;
            }
        }
        return (pieceClicked &&
            ((this.lightDisabled && pieceClicked.color === Color.WHITE) ||
                (this.darkDisabled && pieceClicked.color === Color.BLACK)));
    }
    addDrawPoint(x, y, crtl, alt, shift, left, top) {
        const upPoint = ClickUtils.getDrawingPoint(this.heightAndWidth, this.colorStrategy, x, y, crtl, alt, shift, left, top);
        if (this.drawPoint.isEqual(upPoint)) {
            const circle = new Circle();
            circle.drawPoint = upPoint;
            if (!this.drawProvider.containsCircle(circle)) {
                this.drawProvider.addCircle(circle);
            }
            else {
                this.drawProvider.reomveCircle(circle);
            }
        }
        else {
            const arrow = new Arrow();
            arrow.start = this.drawPoint;
            arrow.end = upPoint;
            if (!this.drawProvider.containsArrow(arrow)) {
                this.drawProvider.addArrow(arrow);
            }
            else {
                this.drawProvider.removeArrow(arrow);
            }
        }
    }
    increaseFullMoveCount() {
        if (!this.board.currentWhitePlayer) {
            ++this.board.fullMoveCount;
        }
    }
    addPiece(pieceTypeInput, colorInput, coords) {
        if (this.freeMode && coords && pieceTypeInput > 0 && colorInput > 0) {
            let indexes = MoveUtils.translateCoordsToIndex(coords, this.board.reverted);
            let existing = this.board.getPieceByPoint(indexes.yAxis, indexes.xAxis);
            if (existing) {
                this.board.pieces = this.board.pieces.filter((e) => e !== existing);
            }
            let createdPiece = PieceFactory.create(indexes, pieceTypeInput, colorInput, this.board);
            this.saveClone();
            this.board.pieces.push(createdPiece);
            this.afterMoveActions();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLWZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL2VuZ2luZS9lbmdpbmUtZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBRTdGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSXZELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUcvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXJELE1BQU0sT0FBTyxZQUFhLFNBQVEsb0JBQW9CO0lBVWxELFlB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U0FDOUI7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUNKLGNBQThCLEVBQzlCLFVBQXNCLEVBQ3RCLE1BQWM7UUFFZCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxJQUFJLGNBQWMsR0FBRyxDQUFDLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNqRSxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsc0JBQXNCLENBQzFDLE1BQU0sRUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FDdEIsQ0FBQztZQUNGLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUNyQyxPQUFPLENBQUMsS0FBSyxFQUNiLE9BQU8sQ0FBQyxLQUFLLENBQ2hCLENBQUM7WUFDRixJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ3hDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUN4QixDQUFDO2FBQ0w7WUFDRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUNsQyxPQUFPLEVBQ1AsY0FBYyxFQUNkLFVBQVUsRUFDVixJQUFJLENBQUMsS0FBSyxDQUNiLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIaXN0b3J5TW92ZSB9IGZyb20gJy4uL2hpc3RvcnktbW92ZS1wcm92aWRlci9oaXN0b3J5LW1vdmUnO1xuaW1wb3J0IHsgQ29sb3JJbnB1dCwgUGllY2VUeXBlSW5wdXQgfSBmcm9tICcuLi91dGlscy9pbnB1dHMvcGllY2UtdHlwZS1pbnB1dCc7XG5pbXBvcnQgeyBBYnN0cmFjdEVuZ2luZUZhY2FkZSB9IGZyb20gJy4vYWJzdHJhY3QtZW5naW5lLWZhY2FkZSc7XG5cbmltcG9ydCB7IEJvYXJkTG9hZGVyIH0gZnJvbSAnLi9ib2FyZC1zdGF0ZS1wcm92aWRlci9ib2FyZC1sb2FkZXIvYm9hcmQtbG9hZGVyJztcbmltcG9ydCB7IEJvYXJkU3RhdGUgfSBmcm9tICcuL2JvYXJkLXN0YXRlLXByb3ZpZGVyL2JvYXJkLXN0YXRlL2JvYXJkLXN0YXRlJztcbmltcG9ydCB7IEJvYXJkU3RhdGVQcm92aWRlciB9IGZyb20gJy4vYm9hcmQtc3RhdGUtcHJvdmlkZXIvYm9hcmQtc3RhdGUvYm9hcmQtc3RhdGUtcHJvdmlkZXInO1xuaW1wb3J0IHsgTW92ZVN0YXRlUHJvdmlkZXIgfSBmcm9tICcuL2JvYXJkLXN0YXRlLXByb3ZpZGVyL2JvYXJkLXN0YXRlL21vdmUtc3RhdGUtcHJvdmlkZXInO1xuaW1wb3J0IHsgQ2xpY2tVdGlscyB9IGZyb20gJy4vY2xpY2svY2xpY2stdXRpbHMnO1xuaW1wb3J0IHsgQXJyb3cgfSBmcm9tICcuL2RyYXdpbmctdG9vbHMvc2hhcGVzL2Fycm93JztcbmltcG9ydCB7IENpcmNsZSB9IGZyb20gJy4vZHJhd2luZy10b29scy9zaGFwZXMvY2lyY2xlJztcbmltcG9ydCB7IERyYXdQb2ludCB9IGZyb20gJy4vZHJhd2luZy10b29scy9kcmF3LXBvaW50JztcbmltcG9ydCB7IERyYXdQcm92aWRlciB9IGZyb20gJy4vZHJhd2luZy10b29scy9kcmF3LXByb3ZpZGVyJztcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSAnLi4vbW9kZWxzL2JvYXJkJztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vbW9kZWxzL3BpZWNlcy9jb2xvcic7XG5pbXBvcnQgeyBLaW5nIH0gZnJvbSAnLi4vbW9kZWxzL3BpZWNlcy9raW5nJztcbmltcG9ydCB7IFBhd24gfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL3Bhd24nO1xuaW1wb3J0IHsgUGllY2UgfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL3BpZWNlJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vbW9kZWxzL3BpZWNlcy9wb2ludCc7XG5pbXBvcnQgeyBDb2luIH0gZnJvbSAnLi4vbW9kZWxzL3BpZWNlcy9jb2luJztcbmltcG9ydCB7IERlZmF1bHRQZ25Qcm9jZXNzb3IgfSBmcm9tICcuL3Bnbi9kZWZhdWx0LXBnbi1wcm9jZXNzb3InO1xuaW1wb3J0IHsgQXZhaWxhYmxlTW92ZURlY29yYXRvciB9IGZyb20gJy4vcGllY2UtZGVjb3JhdG9yL2F2YWlsYWJsZS1tb3ZlLWRlY29yYXRvcic7XG5pbXBvcnQgeyBQaWVjZVByb21vdGlvblJlc29sdmVyIH0gZnJvbSAnLi4vcGllY2UtcHJvbW90aW9uL3BpZWNlLXByb21vdGlvbi1yZXNvbHZlcic7XG5pbXBvcnQgeyBNb3ZlVXRpbHMgfSBmcm9tICcuLi91dGlscy9tb3ZlLXV0aWxzJztcbmltcG9ydCB7IE1vdmVDaGFuZ2UgfSBmcm9tICcuL291dHB1dHMvbW92ZS1jaGFuZ2UvbW92ZS1jaGFuZ2UnO1xuaW1wb3J0IHsgUGllY2VGYWN0b3J5IH0gZnJvbSAnLi91dGlscy9waWVjZS1mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIEVuZ2luZUZhY2FkZSBleHRlbmRzIEFic3RyYWN0RW5naW5lRmFjYWRlIHtcbiAgICBfc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBkcmF3UG9pbnQ6IERyYXdQb2ludDtcbiAgICBkcmF3UHJvdmlkZXI6IERyYXdQcm92aWRlcjtcbiAgICBib2FyZFN0YXRlUHJvdmlkZXI6IEJvYXJkU3RhdGVQcm92aWRlcjtcbiAgICBtb3ZlU3RhdGVQcm92aWRlcjogTW92ZVN0YXRlUHJvdmlkZXI7XG4gICAgbW92ZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1vdmVDaGFuZ2U+O1xuXG4gICAgcHJpdmF0ZSBoaXN0b3J5TW92ZUNhbmRpZGF0ZTogSGlzdG9yeU1vdmU7XG5cbiAgICBjb25zdHJ1Y3Rvcihib2FyZDogQm9hcmQsIG1vdmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNb3ZlQ2hhbmdlPikge1xuICAgICAgICBzdXBlcihib2FyZCk7XG4gICAgICAgIHRoaXMubW92ZUNoYW5nZSA9IG1vdmVDaGFuZ2U7XG4gICAgICAgIHRoaXMuYm9hcmRMb2FkZXIgPSBuZXcgQm9hcmRMb2FkZXIodGhpcyk7XG4gICAgICAgIHRoaXMuYm9hcmRMb2FkZXIuYWRkUGllY2VzKCk7XG4gICAgICAgIHRoaXMuYm9hcmRTdGF0ZVByb3ZpZGVyID0gbmV3IEJvYXJkU3RhdGVQcm92aWRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ib2FyZFN0YXRlUHJvdmlkZXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tb3ZlSGlzdG9yeVByb3ZpZGVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYm9hcmRMb2FkZXIuYWRkUGllY2VzKCk7XG4gICAgICAgIHRoaXMuYm9hcmQucmVzZXQoKTtcbiAgICAgICAgdGhpcy5jb29yZHMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5kcmF3UHJvdmlkZXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5wZ25Qcm9jZXNzb3IucmVzZXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdW5kbygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmJvYXJkU3RhdGVQcm92aWRlci5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RCb2FyZCA9IHRoaXMuYm9hcmRTdGF0ZVByb3ZpZGVyLnBvcCgpLmJvYXJkO1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9hcmQucmV2ZXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICBsYXN0Qm9hcmQucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ib2FyZCA9IGxhc3RCb2FyZDtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wb3NzaWJsZU1vdmVzID0gW107XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubW92ZUhpc3RvcnlQcm92aWRlci5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuY2FsY3VsYXRlRkVOKCk7XG4gICAgICAgICAgICB0aGlzLnBnblByb2Nlc3Nvci5yZW1vdmVMYXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlTW92ZUNsb25lKCkge1xuICAgICAgICBjb25zdCBjbG9uZSA9IHRoaXMuYm9hcmQuY2xvbmUoKTtcblxuICAgICAgICBpZiAodGhpcy5ib2FyZC5yZXZlcnRlZCkge1xuICAgICAgICAgICAgY2xvbmUucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW92ZVN0YXRlUHJvdmlkZXIuYWRkTW92ZShuZXcgQm9hcmRTdGF0ZShjbG9uZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlKGNvb3Jkczogc3RyaW5nKSB7XG4gICAgICAgIGlmIChjb29yZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUluZGV4ZXMgPSBNb3ZlVXRpbHMudHJhbnNsYXRlQ29vcmRzVG9JbmRleChcbiAgICAgICAgICAgICAgICBjb29yZHMuc3Vic3RyaW5nKDAsIDIpLFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQucmV2ZXJ0ZWQsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBkZXN0SW5kZXhlcyA9IE1vdmVVdGlscy50cmFuc2xhdGVDb29yZHNUb0luZGV4KFxuICAgICAgICAgICAgICAgIGNvb3Jkcy5zdWJzdHJpbmcoMiwgNCksXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5yZXZlcnRlZCxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNyY1BpZWNlID0gdGhpcy5ib2FyZC5nZXRQaWVjZUJ5UG9pbnQoXG4gICAgICAgICAgICAgICAgc291cmNlSW5kZXhlcy55QXhpcyxcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleGVzLnhBeGlzLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHNyY1BpZWNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY1BpZWNlLmNvbG9yID09PSBDb2xvci5CTEFDSykgfHxcbiAgICAgICAgICAgICAgICAgICAgKCF0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGllY2UuY29sb3IgPT09IENvbG9yLldISVRFKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlQWN0aXZlUGllY2Uoc3JjUGllY2UsIHNyY1BpZWNlLnBvaW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5pc1BvaW50SW5Qb3NzaWJsZU1vdmVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBvaW50KGRlc3RJbmRleGVzLnlBeGlzLCBkZXN0SW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgICkgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5pc1BvaW50SW5Qb3NzaWJsZUNhcHR1cmVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBvaW50KGRlc3RJbmRleGVzLnlBeGlzLCBkZXN0SW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQ2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlUGllY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNQaWVjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQb2ludChkZXN0SW5kZXhlcy55QXhpcywgZGVzdEluZGV4ZXMueEF4aXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzLmxlbmd0aCA9PT0gNSA/ICtjb29yZHMuc3Vic3RyaW5nKDQsIDUpIDogMCxcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLmxhc3RNb3ZlU3JjID0gbmV3IFBvaW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlSW5kZXhlcy55QXhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ZXMueEF4aXMsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQubGFzdE1vdmVEZXN0ID0gbmV3IFBvaW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdEluZGV4ZXMueUF4aXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0SW5kZXhlcy54QXhpcyxcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlQWN0aXZlUGllY2UocGllY2VDbGlja2VkOiBQaWVjZSwgcG9pbnRDbGlja2VkOiBQb2ludCkge1xuICAgICAgICB0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlID0gcGllY2VDbGlja2VkO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IG5ldyBBdmFpbGFibGVNb3ZlRGVjb3JhdG9yKFxuICAgICAgICAgICAgcGllY2VDbGlja2VkLFxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLFxuICAgICAgICAgICAgdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgPyBDb2xvci5XSElURSA6IENvbG9yLkJMQUNLLFxuICAgICAgICAgICAgdGhpcy5ib2FyZCxcbiAgICAgICAgKS5nZXRQb3NzaWJsZUNhcHR1cmVzKCk7XG4gICAgICAgIHRoaXMuYm9hcmQucG9zc2libGVNb3ZlcyA9IG5ldyBBdmFpbGFibGVNb3ZlRGVjb3JhdG9yKFxuICAgICAgICAgICAgcGllY2VDbGlja2VkLFxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLFxuICAgICAgICAgICAgdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgPyBDb2xvci5XSElURSA6IENvbG9yLkJMQUNLLFxuICAgICAgICAgICAgdGhpcy5ib2FyZCxcbiAgICAgICAgKS5nZXRQb3NzaWJsZU1vdmVzKCk7XG4gICAgfVxuXG4gICAgb25QaWVjZUNsaWNrZWQocGllY2VDbGlja2VkLCBwb2ludENsaWNrZWQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKHRoaXMuYm9hcmQuY3VycmVudFdoaXRlUGxheWVyICYmXG4gICAgICAgICAgICAgICAgcGllY2VDbGlja2VkLmNvbG9yID09PSBDb2xvci5CTEFDSykgfHxcbiAgICAgICAgICAgICghdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgJiZcbiAgICAgICAgICAgICAgICBwaWVjZUNsaWNrZWQuY29sb3IgPT09IENvbG9yLldISVRFKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJlcGFyZUFjdGl2ZVBpZWNlKHBpZWNlQ2xpY2tlZCwgcG9pbnRDbGlja2VkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQ2xpY2tFdmVudChwb2ludENsaWNrZWQ6IFBvaW50LCBpc01vdXNlRG93bjogYm9vbGVhbikge1xuICAgICAgICBsZXQgbW92aW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICh0aGlzLmJvYXJkLmlzUG9pbnRJblBvc3NpYmxlTW92ZXMocG9pbnRDbGlja2VkKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQuaXNQb2ludEluUG9zc2libGVDYXB0dXJlcyhwb2ludENsaWNrZWQpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlTW9kZSkgJiZcbiAgICAgICAgICAgIHBvaW50Q2xpY2tlZC5pc0luUmFuZ2UoKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmxhc3RNb3ZlU3JjID0gbmV3IFBvaW50KFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQuYWN0aXZlUGllY2UucG9pbnQucm93LFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQuYWN0aXZlUGllY2UucG9pbnQuY29sLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQubGFzdE1vdmVEZXN0ID0gcG9pbnRDbGlja2VkLmNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLm1vdmVQaWVjZSh0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlLCBwb2ludENsaWNrZWQpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYm9hcmQuYWN0aXZlUGllY2UucG9pbnQuaXNFcXVhbCh0aGlzLmJvYXJkLmxhc3RNb3ZlU3JjKSkge1xuICAgICAgICAgICAgICAgIG1vdmluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNNb3VzZURvd24gfHwgbW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc2FibGVTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgcGllY2VDbGlja2VkID0gdGhpcy5ib2FyZC5nZXRQaWVjZUJ5UG9pbnQoXG4gICAgICAgICAgICBwb2ludENsaWNrZWQucm93LFxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLmNvbCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHBpZWNlQ2xpY2tlZCAmJiAhbW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm9uRnJlZU1vZGUocGllY2VDbGlja2VkKTtcbiAgICAgICAgICAgIHRoaXMub25QaWVjZUNsaWNrZWQocGllY2VDbGlja2VkLCBwb2ludENsaWNrZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oXG4gICAgICAgIGV2ZW50OiBNb3VzZUV2ZW50LFxuICAgICAgICBwb2ludENsaWNrZWQ6IFBvaW50LFxuICAgICAgICBsZWZ0PzogbnVtYmVyLFxuICAgICAgICB0b3A/OiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubW92ZURvbmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kcmF3UG9pbnQgPSBDbGlja1V0aWxzLmdldERyYXdpbmdQb2ludChcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodEFuZFdpZHRoLFxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JTdHJhdGVneSxcbiAgICAgICAgICAgICAgICBldmVudC54LFxuICAgICAgICAgICAgICAgIGV2ZW50LnksXG4gICAgICAgICAgICAgICAgZXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICBldmVudC5hbHRLZXksXG4gICAgICAgICAgICAgICAgZXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3UHJvdmlkZXIuY2xlYXIoKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlICYmXG4gICAgICAgICAgICBwb2ludENsaWNrZWQuaXNFcXVhbCh0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlLnBvaW50KVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBpZWNlQ2xpY2tlZCA9IHRoaXMuYm9hcmQuZ2V0UGllY2VCeVBvaW50KFxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLnJvdyxcbiAgICAgICAgICAgIHBvaW50Q2xpY2tlZC5jb2wsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICAgIGlmIChwaWVjZUNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLnBpZWNlcyA9IHRoaXMuYm9hcmQucGllY2VzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIChlKSA9PiBlICE9PSBwaWVjZUNsaWNrZWQsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgPVxuICAgICAgICAgICAgICAgICAgICBwaWVjZUNsaWNrZWQuY29sb3IgPT09IENvbG9yLldISVRFO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQaWVjZURpc2FibGVkKHBpZWNlQ2xpY2tlZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja0V2ZW50KHBvaW50Q2xpY2tlZCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGllY2VDbGlja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkZyZWVNb2RlKHBpZWNlQ2xpY2tlZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblBpZWNlQ2xpY2tlZChwaWVjZUNsaWNrZWQsIHBvaW50Q2xpY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoXG4gICAgICAgIGV2ZW50OiBNb3VzZUV2ZW50LFxuICAgICAgICBwb2ludENsaWNrZWQ6IFBvaW50LFxuICAgICAgICBsZWZ0OiBudW1iZXIsXG4gICAgICAgIHRvcDogbnVtYmVyLFxuICAgICkge1xuICAgICAgICB0aGlzLm1vdmVEb25lID0gZmFsc2U7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDAgJiYgIXRoaXMuZHJhd0Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZERyYXdQb2ludChcbiAgICAgICAgICAgICAgICBldmVudC54LFxuICAgICAgICAgICAgICAgIGV2ZW50LnksXG4gICAgICAgICAgICAgICAgZXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICBldmVudC5hbHRLZXksXG4gICAgICAgICAgICAgICAgZXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgICAgICB0b3AsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3UHJvdmlkZXIuY2xlYXIoKTtcblxuICAgICAgICBpZiAodGhpcy5kcmFnRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuYWN0aXZlUGllY2UgJiZcbiAgICAgICAgICAgIHBvaW50Q2xpY2tlZC5pc0VxdWFsKHRoaXMuYm9hcmQuYWN0aXZlUGllY2UucG9pbnQpICYmXG4gICAgICAgICAgICB0aGlzLmRpc2FibGluZ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwaWVjZUNsaWNrZWQgPSB0aGlzLmJvYXJkLmdldFBpZWNlQnlQb2ludChcbiAgICAgICAgICAgIHBvaW50Q2xpY2tlZC5yb3csXG4gICAgICAgICAgICBwb2ludENsaWNrZWQuY29sLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUGllY2VEaXNhYmxlZChwaWVjZUNsaWNrZWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2tFdmVudChwb2ludENsaWNrZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIC8vICAgdGhpcy5wb3NzaWJsZU1vdmVzID0gYWN0aXZlUGllY2UuZ2V0UG9zc2libGVNb3ZlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUNsb25lKCkge1xuICAgICAgICBjb25zdCBjbG9uZSA9IHRoaXMuYm9hcmQuY2xvbmUoKTtcblxuICAgICAgICBpZiAodGhpcy5ib2FyZC5yZXZlcnRlZCkge1xuICAgICAgICAgICAgY2xvbmUucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYm9hcmRTdGF0ZVByb3ZpZGVyLmFkZE1vdmUobmV3IEJvYXJkU3RhdGUoY2xvbmUpKTtcbiAgICB9XG5cbiAgICBtb3ZlUGllY2UodG9Nb3ZlUGllY2U6IFBpZWNlLCBuZXdQb2ludDogUG9pbnQsIHByb21vdGlvbkluZGV4PzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRlc3RQaWVjZSA9IHRoaXMuYm9hcmQucGllY2VzLmZpbmQoXG4gICAgICAgICAgICAocGllY2UpID0+XG4gICAgICAgICAgICAgICAgcGllY2UucG9pbnQuY29sID09PSBuZXdQb2ludC5jb2wgJiZcbiAgICAgICAgICAgICAgICBwaWVjZS5wb2ludC5yb3cgPT09IG5ld1BvaW50LnJvdyxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnBnblByb2Nlc3Nvci5wcm9jZXNzKHRoaXMuYm9hcmQsIHRvTW92ZVBpZWNlLCBuZXdQb2ludCwgZGVzdFBpZWNlKTtcblxuICAgICAgICBpZiAoZGVzdFBpZWNlICYmIHRvTW92ZVBpZWNlLmNvbG9yICE9PSBkZXN0UGllY2UuY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQucGllY2VzID0gdGhpcy5ib2FyZC5waWVjZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChwaWVjZSkgPT4gcGllY2UgIT09IGRlc3RQaWVjZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGVzdFBpZWNlICYmIHRvTW92ZVBpZWNlLmNvbG9yID09PSBkZXN0UGllY2UuY29sb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpc3RvcnlNb3ZlQ2FuZGlkYXRlID0gbmV3IEhpc3RvcnlNb3ZlKFxuICAgICAgICAgICAgTW92ZVV0aWxzLmZvcm1hdCh0b01vdmVQaWVjZS5wb2ludCwgbmV3UG9pbnQsIHRoaXMuYm9hcmQucmV2ZXJ0ZWQpLFxuICAgICAgICAgICAgdG9Nb3ZlUGllY2UuY29uc3RhbnQubmFtZSxcbiAgICAgICAgICAgIHRvTW92ZVBpZWNlLmNvbG9yID09PSBDb2xvci5XSElURSA/ICd3aGl0ZScgOiAnYmxhY2snLFxuICAgICAgICAgICAgISFkZXN0UGllY2UsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubW92ZUhpc3RvcnlQcm92aWRlci5hZGRNb3ZlKHRoaXMuaGlzdG9yeU1vdmVDYW5kaWRhdGUpO1xuXG4gICAgICAgIGlmICh0b01vdmVQaWVjZSBpbnN0YW5jZW9mIEtpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZXNNb3ZlZCA9IE1hdGguYWJzKG5ld1BvaW50LmNvbCAtIHRvTW92ZVBpZWNlLnBvaW50LmNvbCk7XG4gICAgICAgICAgICBpZiAoc3F1YXJlc01vdmVkID4gMSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdQb2ludC5jb2wgPCAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRSb29rID0gdGhpcy5ib2FyZC5nZXRQaWVjZUJ5RmllbGQoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b01vdmVQaWVjZS5wb2ludC5yb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRSb29rLnBvaW50LmNvbCA9IHRoaXMuYm9hcmQucmV2ZXJ0ZWQgPyAyIDogMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpZ2h0Um9vayA9IHRoaXMuYm9hcmQuZ2V0UGllY2VCeUZpZWxkKFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9Nb3ZlUGllY2UucG9pbnQucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgNyxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodFJvb2sucG9pbnQuY29sID0gdGhpcy5ib2FyZC5yZXZlcnRlZCA/IDQgOiA1O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvTW92ZVBpZWNlIGluc3RhbmNlb2YgUGF3bikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5jaGVja0lmUGF3blRha2VzRW5QYXNzYW50KG5ld1BvaW50KTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuY2hlY2tJZlBhd25FbnBhc3NhbnRlZCh0b01vdmVQaWVjZSwgbmV3UG9pbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5lblBhc3NhbnRQb2ludCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmVuUGFzc2FudFBpZWNlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvTW92ZVBpZWNlLnBvaW50ID0gbmV3UG9pbnQ7XG4gICAgICAgIHRoaXMuaW5jcmVhc2VGdWxsTW92ZUNvdW50KCk7XG4gICAgICAgIHRoaXMuYm9hcmQuY3VycmVudFdoaXRlUGxheWVyID0gIXRoaXMuYm9hcmQuY3VycmVudFdoaXRlUGxheWVyO1xuXG4gICAgICAgIGlmICghdGhpcy5jaGVja0ZvclBhd25Qcm9tb3RlKHRvTW92ZVBpZWNlLCBwcm9tb3Rpb25JbmRleCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJNb3ZlQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tGb3JQYXduUHJvbW90ZSh0b1Byb21vdGVQaWVjZTogUGllY2UsIHByb21vdGlvbkluZGV4PzogbnVtYmVyKSB7XG4gICAgICAgIGlmICghKHRvUHJvbW90ZVBpZWNlIGluc3RhbmNlb2YgUGF3bikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b1Byb21vdGVQaWVjZS5wb2ludC5yb3cgPT09IDAgfHwgdG9Qcm9tb3RlUGllY2UucG9pbnQucm93ID09PSA3KSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnBpZWNlcyA9IHRoaXMuYm9hcmQucGllY2VzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAocGllY2UpID0+IHBpZWNlICE9PSB0b1Byb21vdGVQaWVjZSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIFdoZW4gd2UgbWFrZSBtb3ZlIG1hbnVhbGx5LCB3ZSBwYXNzIHByb21vdGlvbiBpbmRleCBhbHJlYWR5LCBzbyB3ZSBkb24ndCBuZWVkXG4gICAgICAgICAgICAvLyB0byBhY3F1aXJlIGl0IGZyb20gcHJvbW90ZSBkaWFsb2dcbiAgICAgICAgICAgIGlmICghcHJvbW90aW9uSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Qcm9tb3RlRGlhbG9nKHRvUHJvbW90ZVBpZWNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGllY2VQcm9tb3Rpb25SZXNvbHZlci5yZXNvbHZlUHJvbW90aW9uQ2hvaWNlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLFxuICAgICAgICAgICAgICAgICAgICB0b1Byb21vdGVQaWVjZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvbW90aW9uSW5kZXgsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyTW92ZUFjdGlvbnMocHJvbW90aW9uSW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFmdGVyTW92ZUFjdGlvbnMocHJvbW90aW9uSW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jaGVja0lmUGF3bkZpcnN0TW92ZSh0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlKTtcbiAgICAgICAgdGhpcy5jaGVja0lmUm9va01vdmVkKHRoaXMuYm9hcmQuYWN0aXZlUGllY2UpO1xuICAgICAgICB0aGlzLmNoZWNrSWZLaW5nTW92ZWQodGhpcy5ib2FyZC5hY3RpdmVQaWVjZSk7XG5cbiAgICAgICAgdGhpcy5ib2FyZC5ibGFja0tpbmdDaGVja2VkID0gdGhpcy5ib2FyZC5pc0tpbmdJbkNoZWNrKFxuICAgICAgICAgICAgQ29sb3IuQkxBQ0ssXG4gICAgICAgICAgICB0aGlzLmJvYXJkLnBpZWNlcyxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5ib2FyZC53aGl0ZUtpbmdDaGVja2VkID0gdGhpcy5ib2FyZC5pc0tpbmdJbkNoZWNrKFxuICAgICAgICAgICAgQ29sb3IuV0hJVEUsXG4gICAgICAgICAgICB0aGlzLmJvYXJkLnBpZWNlcyxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY2hlY2sgPVxuICAgICAgICAgICAgdGhpcy5ib2FyZC5ibGFja0tpbmdDaGVja2VkIHx8IHRoaXMuYm9hcmQud2hpdGVLaW5nQ2hlY2tlZDtcbiAgICAgICAgY29uc3QgY2hlY2ttYXRlID1cbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb3JQb3NzaWJsZU1vdmVzKENvbG9yLkJMQUNLKSB8fFxuICAgICAgICAgICAgdGhpcy5jaGVja0ZvclBvc3NpYmxlTW92ZXMoQ29sb3IuV0hJVEUpO1xuICAgICAgICBjb25zdCBzdGFsZW1hdGUgPVxuICAgICAgICAgICAgdGhpcy5jaGVja0ZvclBhdChDb2xvci5CTEFDSykgfHwgdGhpcy5jaGVja0ZvclBhdChDb2xvci5XSElURSk7XG5cbiAgICAgICAgdGhpcy5oaXN0b3J5TW92ZUNhbmRpZGF0ZS5zZXRHYW1lU3RhdGVzKGNoZWNrLCBzdGFsZW1hdGUsIGNoZWNrbWF0ZSk7XG4gICAgICAgIHRoaXMucGduUHJvY2Vzc29yLnByb2Nlc3NDaGVja3MoY2hlY2ttYXRlLCBjaGVjaywgc3RhbGVtYXRlKTtcbiAgICAgICAgdGhpcy5wZ25Qcm9jZXNzb3IuYWRkUHJvbW90aW9uQ2hvaWNlKHByb21vdGlvbkluZGV4KTtcblxuICAgICAgICB0aGlzLmRpc2FibGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvYXJkLmNhbGN1bGF0ZUZFTigpO1xuXG4gICAgICAgIGNvbnN0IGxhc3RNb3ZlID0gdGhpcy5tb3ZlSGlzdG9yeVByb3ZpZGVyLmdldExhc3RNb3ZlKCk7XG4gICAgICAgIGlmIChsYXN0TW92ZSAmJiBwcm9tb3Rpb25JbmRleCkge1xuICAgICAgICAgICAgbGFzdE1vdmUubW92ZSArPSBwcm9tb3Rpb25JbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZUNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIC4uLmxhc3RNb3ZlLFxuICAgICAgICAgICAgY2hlY2ssXG4gICAgICAgICAgICBjaGVja21hdGUsXG4gICAgICAgICAgICBzdGFsZW1hdGUsXG4gICAgICAgICAgICBmZW46IHRoaXMuYm9hcmQuZmVuLFxuICAgICAgICAgICAgcGduOiB7XG4gICAgICAgICAgICAgICAgcGduOiB0aGlzLnBnblByb2Nlc3Nvci5nZXRQR04oKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcmVlTW9kZTogdGhpcy5mcmVlTW9kZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb3ZlRG9uZSA9IHRydWU7XG4gICAgfVxuXG4gICAgY2hlY2tGb3JQYXQoY29sb3I6IENvbG9yKSB7XG4gICAgICAgIGlmIChjb2xvciA9PT0gQ29sb3IuV0hJVEUgJiYgIXRoaXMuYm9hcmQud2hpdGVLaW5nQ2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tGb3JQb3NzaWJsZU1vdmVzKGNvbG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb2xvciA9PT0gQ29sb3IuQkxBQ0sgJiYgIXRoaXMuYm9hcmQuYmxhY2tLaW5nQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrRm9yUG9zc2libGVNb3Zlcyhjb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuUHJvbW90ZURpYWxvZyhwaWVjZTogUGllY2UpIHtcbiAgICAgICAgaWYgKHBpZWNlLmNvbG9yID09PSB0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlLmNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLm9wZW4oKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgUGllY2VQcm9tb3Rpb25SZXNvbHZlci5yZXNvbHZlUHJvbW90aW9uQ2hvaWNlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLFxuICAgICAgICAgICAgICAgICAgICBwaWVjZSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyTW92ZUFjdGlvbnMoaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZvclBvc3NpYmxlTW92ZXMoY29sb3I6IENvbG9yKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5ib2FyZC5waWVjZXNcbiAgICAgICAgICAgIC5maWx0ZXIoKHBpZWNlKSA9PiBwaWVjZS5jb2xvciA9PT0gY29sb3IpXG4gICAgICAgICAgICAuc29tZShcbiAgICAgICAgICAgICAgICAocGllY2UpID0+XG4gICAgICAgICAgICAgICAgICAgIHBpZWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0UG9zc2libGVNb3ZlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc29tZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW92ZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIU1vdmVVdGlscy53aWxsTW92ZUNhdXNlQ2hlY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlLnBvaW50LnJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlLnBvaW50LmNvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmUucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZS5jb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSB8fFxuICAgICAgICAgICAgICAgICAgICBwaWVjZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldFBvc3NpYmxlQ2FwdHVyZXMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNvbWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNhcHR1cmUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFNb3ZlVXRpbHMud2lsbE1vdmVDYXVzZUNoZWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWVjZS5wb2ludC5yb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaWVjZS5wb2ludC5jb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlLnJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmUuY29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGRpc2FibGVTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IFtdO1xuICAgICAgICB0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5ib2FyZC5wb3NzaWJsZU1vdmVzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIGxvZ2ljIHRvIGFsbG93IGZyZWVNb2RlIGJhc2VkIGxvZ2ljIHByb2Nlc3NpbmdcbiAgICAgKi9cbiAgICBvbkZyZWVNb2RlKHBpZWNlQ2xpY2tlZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpcy5mcmVlTW9kZSB8fFxuICAgICAgICAgICAgcGllY2VDbGlja2VkID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHBpZWNlQ2xpY2tlZCA9PT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXRzIHBsYXllciBhcyB3aGl0ZSBpbi1jYXNlIHdoaXRlIHBpZWNlcyBhcmUgc2VsZWN0ZWQsIGFuZCB2aWNlLXZlcnNhIHdoZW4gYmxhY2sgaXMgc2VsZWN0ZWRcbiAgICAgICAgdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgPSBwaWVjZUNsaWNrZWQuY29sb3IgPT09IENvbG9yLldISVRFO1xuICAgIH1cblxuICAgIGlzUGllY2VEaXNhYmxlZChwaWVjZUNsaWNrZWQ6IFBpZWNlKSB7XG4gICAgICAgIGlmIChwaWVjZUNsaWNrZWQgJiYgcGllY2VDbGlja2VkLnBvaW50KSB7XG4gICAgICAgICAgICBjb25zdCBmb3VuZENhcHR1cmUgPSB0aGlzLmJvYXJkLnBvc3NpYmxlQ2FwdHVyZXMuZmluZChcbiAgICAgICAgICAgICAgICAoY2FwdHVyZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgY2FwdHVyZS5jb2wgPT09IHBpZWNlQ2xpY2tlZC5wb2ludC5jb2wgJiZcbiAgICAgICAgICAgICAgICAgICAgY2FwdHVyZS5yb3cgPT09IHBpZWNlQ2xpY2tlZC5wb2ludC5yb3csXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoZm91bmRDYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBwaWVjZUNsaWNrZWQgJiZcbiAgICAgICAgICAgICgodGhpcy5saWdodERpc2FibGVkICYmIHBpZWNlQ2xpY2tlZC5jb2xvciA9PT0gQ29sb3IuV0hJVEUpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuZGFya0Rpc2FibGVkICYmIHBpZWNlQ2xpY2tlZC5jb2xvciA9PT0gQ29sb3IuQkxBQ0spKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFkZERyYXdQb2ludChcbiAgICAgICAgeDogbnVtYmVyLFxuICAgICAgICB5OiBudW1iZXIsXG4gICAgICAgIGNydGw6IGJvb2xlYW4sXG4gICAgICAgIGFsdDogYm9vbGVhbixcbiAgICAgICAgc2hpZnQ6IGJvb2xlYW4sXG4gICAgICAgIGxlZnQ6IG51bWJlcixcbiAgICAgICAgdG9wOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHVwUG9pbnQgPSBDbGlja1V0aWxzLmdldERyYXdpbmdQb2ludChcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0QW5kV2lkdGgsXG4gICAgICAgICAgICB0aGlzLmNvbG9yU3RyYXRlZ3ksXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIGNydGwsXG4gICAgICAgICAgICBhbHQsXG4gICAgICAgICAgICBzaGlmdCxcbiAgICAgICAgICAgIGxlZnQsXG4gICAgICAgICAgICB0b3AsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhd1BvaW50LmlzRXF1YWwodXBQb2ludCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZSA9IG5ldyBDaXJjbGUoKTtcbiAgICAgICAgICAgIGNpcmNsZS5kcmF3UG9pbnQgPSB1cFBvaW50O1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRyYXdQcm92aWRlci5jb250YWluc0NpcmNsZShjaXJjbGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UHJvdmlkZXIuYWRkQ2lyY2xlKGNpcmNsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Byb3ZpZGVyLnJlb212ZUNpcmNsZShjaXJjbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYXJyb3cgPSBuZXcgQXJyb3coKTtcbiAgICAgICAgICAgIGFycm93LnN0YXJ0ID0gdGhpcy5kcmF3UG9pbnQ7XG4gICAgICAgICAgICBhcnJvdy5lbmQgPSB1cFBvaW50O1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJhd1Byb3ZpZGVyLmNvbnRhaW5zQXJyb3coYXJyb3cpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UHJvdmlkZXIuYWRkQXJyb3coYXJyb3cpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQcm92aWRlci5yZW1vdmVBcnJvdyhhcnJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmNyZWFzZUZ1bGxNb3ZlQ291bnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIpIHtcbiAgICAgICAgICAgICsrdGhpcy5ib2FyZC5mdWxsTW92ZUNvdW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkUGllY2UoXG4gICAgICAgIHBpZWNlVHlwZUlucHV0OiBQaWVjZVR5cGVJbnB1dCxcbiAgICAgICAgY29sb3JJbnB1dDogQ29sb3JJbnB1dCxcbiAgICAgICAgY29vcmRzOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmZyZWVNb2RlICYmIGNvb3JkcyAmJiBwaWVjZVR5cGVJbnB1dCA+IDAgJiYgY29sb3JJbnB1dCA+IDApIHtcbiAgICAgICAgICAgIGxldCBpbmRleGVzID0gTW92ZVV0aWxzLnRyYW5zbGF0ZUNvb3Jkc1RvSW5kZXgoXG4gICAgICAgICAgICAgICAgY29vcmRzLFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQucmV2ZXJ0ZWQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbGV0IGV4aXN0aW5nID0gdGhpcy5ib2FyZC5nZXRQaWVjZUJ5UG9pbnQoXG4gICAgICAgICAgICAgICAgaW5kZXhlcy55QXhpcyxcbiAgICAgICAgICAgICAgICBpbmRleGVzLnhBeGlzLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQucGllY2VzID0gdGhpcy5ib2FyZC5waWVjZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAoZSkgPT4gZSAhPT0gZXhpc3RpbmcsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjcmVhdGVkUGllY2UgPSBQaWVjZUZhY3RvcnkuY3JlYXRlKFxuICAgICAgICAgICAgICAgIGluZGV4ZXMsXG4gICAgICAgICAgICAgICAgcGllY2VUeXBlSW5wdXQsXG4gICAgICAgICAgICAgICAgY29sb3JJbnB1dCxcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnBpZWNlcy5wdXNoKGNyZWF0ZWRQaWVjZSk7XG4gICAgICAgICAgICB0aGlzLmFmdGVyTW92ZUFjdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==