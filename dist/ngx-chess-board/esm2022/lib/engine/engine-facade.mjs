import { HistoryMove } from '../history-move-provider/history-move';
import { AbstractEngineFacade } from './abstract-engine-facade';
import { BoardLoader } from './board-state-provider/board-loader/board-loader';
import { BoardState } from './board-state-provider/board-state/board-state';
import { BoardStateProvider } from './board-state-provider/board-state/board-state-provider';
import { ClickUtils } from './click/click-utils';
import { Arrow } from './drawing-tools/shapes/arrow';
import { Circle } from './drawing-tools/shapes/circle';
import { DrawProvider } from './drawing-tools/draw-provider';
import { Color } from '../models/pieces/color';
import { King } from '../models/pieces/king';
import { Pawn } from '../models/pieces/pawn';
import { Point } from '../models/pieces/point';
import { AvailableMoveDecorator } from './piece-decorator/available-move-decorator';
import { PiecePromotionResolver } from '../piece-promotion/piece-promotion-resolver';
import { MoveUtils } from '../utils/move-utils';
import { PieceFactory } from './utils/piece-factory';
export class EngineFacade extends AbstractEngineFacade {
    _selected = false;
    drawPoint;
    drawProvider = new DrawProvider();
    boardStateProvider;
    moveStateProvider;
    moveChange;
    historyMoveCandidate;
    constructor(board, moveChange) {
        super(board);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLWZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL2VuZ2luZS9lbmdpbmUtZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBRTdGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWhELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FB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RSxDQUFDO1lBQ2xFLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxzQkFBc0IsQ0FDMUMsTUFBTSxFQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUN0QixDQUFDO1lBQ0YsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQ3JDLE9BQU8sQ0FBQyxLQUFLLEVBQ2IsT0FBTyxDQUFDLEtBQUssQ0FDaEIsQ0FBQztZQUNGLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUN4QyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FDeEIsQ0FBQztZQUNOLENBQUM7WUFDRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUNsQyxPQUFPLEVBQ1AsY0FBYyxFQUNkLFVBQVUsRUFDVixJQUFJLENBQUMsS0FBSyxDQUNiLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhpc3RvcnlNb3ZlIH0gZnJvbSAnLi4vaGlzdG9yeS1tb3ZlLXByb3ZpZGVyL2hpc3RvcnktbW92ZSc7XG5pbXBvcnQgeyBDb2xvcklucHV0LCBQaWVjZVR5cGVJbnB1dCB9IGZyb20gJy4uL3V0aWxzL2lucHV0cy9waWVjZS10eXBlLWlucHV0JztcbmltcG9ydCB7IEFic3RyYWN0RW5naW5lRmFjYWRlIH0gZnJvbSAnLi9hYnN0cmFjdC1lbmdpbmUtZmFjYWRlJztcblxuaW1wb3J0IHsgQm9hcmRMb2FkZXIgfSBmcm9tICcuL2JvYXJkLXN0YXRlLXByb3ZpZGVyL2JvYXJkLWxvYWRlci9ib2FyZC1sb2FkZXInO1xuaW1wb3J0IHsgQm9hcmRTdGF0ZSB9IGZyb20gJy4vYm9hcmQtc3RhdGUtcHJvdmlkZXIvYm9hcmQtc3RhdGUvYm9hcmQtc3RhdGUnO1xuaW1wb3J0IHsgQm9hcmRTdGF0ZVByb3ZpZGVyIH0gZnJvbSAnLi9ib2FyZC1zdGF0ZS1wcm92aWRlci9ib2FyZC1zdGF0ZS9ib2FyZC1zdGF0ZS1wcm92aWRlcic7XG5pbXBvcnQgeyBNb3ZlU3RhdGVQcm92aWRlciB9IGZyb20gJy4vYm9hcmQtc3RhdGUtcHJvdmlkZXIvYm9hcmQtc3RhdGUvbW92ZS1zdGF0ZS1wcm92aWRlcic7XG5pbXBvcnQgeyBDbGlja1V0aWxzIH0gZnJvbSAnLi9jbGljay9jbGljay11dGlscyc7XG5pbXBvcnQgeyBBcnJvdyB9IGZyb20gJy4vZHJhd2luZy10b29scy9zaGFwZXMvYXJyb3cnO1xuaW1wb3J0IHsgQ2lyY2xlIH0gZnJvbSAnLi9kcmF3aW5nLXRvb2xzL3NoYXBlcy9jaXJjbGUnO1xuaW1wb3J0IHsgRHJhd1BvaW50IH0gZnJvbSAnLi9kcmF3aW5nLXRvb2xzL2RyYXctcG9pbnQnO1xuaW1wb3J0IHsgRHJhd1Byb3ZpZGVyIH0gZnJvbSAnLi9kcmF3aW5nLXRvb2xzL2RyYXctcHJvdmlkZXInO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tICcuLi9tb2RlbHMvYm9hcmQnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL2NvbG9yJztcbmltcG9ydCB7IEtpbmcgfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL2tpbmcnO1xuaW1wb3J0IHsgUGF3biB9IGZyb20gJy4uL21vZGVscy9waWVjZXMvcGF3bic7XG5pbXBvcnQgeyBQaWVjZSB9IGZyb20gJy4uL21vZGVscy9waWVjZXMvcGllY2UnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL3BvaW50JztcbmltcG9ydCB7IENvaW4gfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL2NvaW4nO1xuaW1wb3J0IHsgRGVmYXVsdFBnblByb2Nlc3NvciB9IGZyb20gJy4vcGduL2RlZmF1bHQtcGduLXByb2Nlc3Nvcic7XG5pbXBvcnQgeyBBdmFpbGFibGVNb3ZlRGVjb3JhdG9yIH0gZnJvbSAnLi9waWVjZS1kZWNvcmF0b3IvYXZhaWxhYmxlLW1vdmUtZGVjb3JhdG9yJztcbmltcG9ydCB7IFBpZWNlUHJvbW90aW9uUmVzb2x2ZXIgfSBmcm9tICcuLi9waWVjZS1wcm9tb3Rpb24vcGllY2UtcHJvbW90aW9uLXJlc29sdmVyJztcbmltcG9ydCB7IE1vdmVVdGlscyB9IGZyb20gJy4uL3V0aWxzL21vdmUtdXRpbHMnO1xuaW1wb3J0IHsgTW92ZUNoYW5nZSB9IGZyb20gJy4vb3V0cHV0cy9tb3ZlLWNoYW5nZS9tb3ZlLWNoYW5nZSc7XG5pbXBvcnQgeyBQaWVjZUZhY3RvcnkgfSBmcm9tICcuL3V0aWxzL3BpZWNlLWZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgRW5naW5lRmFjYWRlIGV4dGVuZHMgQWJzdHJhY3RFbmdpbmVGYWNhZGUge1xuICAgIF9zZWxlY3RlZCA9IGZhbHNlO1xuICAgIGRyYXdQb2ludDogRHJhd1BvaW50O1xuICAgIGRyYXdQcm92aWRlcjogRHJhd1Byb3ZpZGVyID0gbmV3IERyYXdQcm92aWRlcigpO1xuICAgIGJvYXJkU3RhdGVQcm92aWRlcjogQm9hcmRTdGF0ZVByb3ZpZGVyO1xuICAgIG1vdmVTdGF0ZVByb3ZpZGVyOiBNb3ZlU3RhdGVQcm92aWRlcjtcbiAgICBtb3ZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TW92ZUNoYW5nZT47XG5cbiAgICBwcml2YXRlIGhpc3RvcnlNb3ZlQ2FuZGlkYXRlOiBIaXN0b3J5TW92ZTtcblxuICAgIGNvbnN0cnVjdG9yKGJvYXJkOiBCb2FyZCwgbW92ZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1vdmVDaGFuZ2U+KSB7XG4gICAgICAgIHN1cGVyKGJvYXJkKTtcbiAgICAgICAgdGhpcy5tb3ZlQ2hhbmdlID0gbW92ZUNoYW5nZTtcbiAgICAgICAgdGhpcy5ib2FyZExvYWRlciA9IG5ldyBCb2FyZExvYWRlcih0aGlzKTtcbiAgICAgICAgdGhpcy5ib2FyZExvYWRlci5hZGRQaWVjZXMoKTtcbiAgICAgICAgdGhpcy5ib2FyZFN0YXRlUHJvdmlkZXIgPSBuZXcgQm9hcmRTdGF0ZVByb3ZpZGVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJvYXJkU3RhdGVQcm92aWRlci5jbGVhcigpO1xuICAgICAgICB0aGlzLm1vdmVIaXN0b3J5UHJvdmlkZXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5ib2FyZExvYWRlci5hZGRQaWVjZXMoKTtcbiAgICAgICAgdGhpcy5ib2FyZC5yZXNldCgpO1xuICAgICAgICB0aGlzLmNvb3Jkcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmRyYXdQcm92aWRlci5jbGVhcigpO1xuICAgICAgICB0aGlzLnBnblByb2Nlc3Nvci5yZXNldCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1bmRvKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYm9hcmRTdGF0ZVByb3ZpZGVyLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgY29uc3QgbGFzdEJvYXJkID0gdGhpcy5ib2FyZFN0YXRlUHJvdmlkZXIucG9wKCkuYm9hcmQ7XG4gICAgICAgICAgICBpZiAodGhpcy5ib2FyZC5yZXZlcnRlZCkge1xuICAgICAgICAgICAgICAgIGxhc3RCb2FyZC5yZXZlcnNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJvYXJkID0gbGFzdEJvYXJkO1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5wb3NzaWJsZUNhcHR1cmVzID0gW107XG4gICAgICAgICAgICB0aGlzLmJvYXJkLnBvc3NpYmxlTW92ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuYWN0aXZlUGllY2UgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5tb3ZlSGlzdG9yeVByb3ZpZGVyLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5jYWxjdWxhdGVGRU4oKTtcbiAgICAgICAgICAgIHRoaXMucGduUHJvY2Vzc29yLnJlbW92ZUxhc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVNb3ZlQ2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGNsb25lID0gdGhpcy5ib2FyZC5jbG9uZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmJvYXJkLnJldmVydGVkKSB7XG4gICAgICAgICAgICBjbG9uZS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3ZlU3RhdGVQcm92aWRlci5hZGRNb3ZlKG5ldyBCb2FyZFN0YXRlKGNsb25lKSk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmUoY29vcmRzOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNvb3Jkcykge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlSW5kZXhlcyA9IE1vdmVVdGlscy50cmFuc2xhdGVDb29yZHNUb0luZGV4KFxuICAgICAgICAgICAgICAgIGNvb3Jkcy5zdWJzdHJpbmcoMCwgMiksXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5yZXZlcnRlZCxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRlc3RJbmRleGVzID0gTW92ZVV0aWxzLnRyYW5zbGF0ZUNvb3Jkc1RvSW5kZXgoXG4gICAgICAgICAgICAgICAgY29vcmRzLnN1YnN0cmluZygyLCA0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLnJldmVydGVkLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3Qgc3JjUGllY2UgPSB0aGlzLmJvYXJkLmdldFBpZWNlQnlQb2ludChcbiAgICAgICAgICAgICAgICBzb3VyY2VJbmRleGVzLnlBeGlzLFxuICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ZXMueEF4aXMsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoc3JjUGllY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGllY2UuY29sb3IgPT09IENvbG9yLkJMQUNLKSB8fFxuICAgICAgICAgICAgICAgICAgICAoIXRoaXMuYm9hcmQuY3VycmVudFdoaXRlUGxheWVyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNQaWVjZS5jb2xvciA9PT0gQ29sb3IuV0hJVEUpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXBhcmVBY3RpdmVQaWVjZShzcmNQaWVjZSwgc3JjUGllY2UucG9pbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLmlzUG9pbnRJblBvc3NpYmxlTW92ZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUG9pbnQoZGVzdEluZGV4ZXMueUF4aXMsIGRlc3RJbmRleGVzLnhBeGlzKSxcbiAgICAgICAgICAgICAgICAgICAgKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLmlzUG9pbnRJblBvc3NpYmxlQ2FwdHVyZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUG9pbnQoZGVzdEluZGV4ZXMueUF4aXMsIGRlc3RJbmRleGVzLnhBeGlzKSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVDbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVQaWVjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY1BpZWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBvaW50KGRlc3RJbmRleGVzLnlBeGlzLCBkZXN0SW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yZHMubGVuZ3RoID09PSA1ID8gK2Nvb3Jkcy5zdWJzdHJpbmcoNCwgNSkgOiAwLFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQubGFzdE1vdmVTcmMgPSBuZXcgUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbmRleGVzLnlBeGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlSW5kZXhlcy54QXhpcyxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5sYXN0TW92ZURlc3QgPSBuZXcgUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0SW5kZXhlcy55QXhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RJbmRleGVzLnhBeGlzLFxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXBhcmVBY3RpdmVQaWVjZShwaWVjZUNsaWNrZWQ6IFBpZWNlLCBwb2ludENsaWNrZWQ6IFBvaW50KSB7XG4gICAgICAgIHRoaXMuYm9hcmQuYWN0aXZlUGllY2UgPSBwaWVjZUNsaWNrZWQ7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ib2FyZC5wb3NzaWJsZUNhcHR1cmVzID0gbmV3IEF2YWlsYWJsZU1vdmVEZWNvcmF0b3IoXG4gICAgICAgICAgICBwaWVjZUNsaWNrZWQsXG4gICAgICAgICAgICBwb2ludENsaWNrZWQsXG4gICAgICAgICAgICB0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllciA/IENvbG9yLldISVRFIDogQ29sb3IuQkxBQ0ssXG4gICAgICAgICAgICB0aGlzLmJvYXJkLFxuICAgICAgICApLmdldFBvc3NpYmxlQ2FwdHVyZXMoKTtcbiAgICAgICAgdGhpcy5ib2FyZC5wb3NzaWJsZU1vdmVzID0gbmV3IEF2YWlsYWJsZU1vdmVEZWNvcmF0b3IoXG4gICAgICAgICAgICBwaWVjZUNsaWNrZWQsXG4gICAgICAgICAgICBwb2ludENsaWNrZWQsXG4gICAgICAgICAgICB0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllciA/IENvbG9yLldISVRFIDogQ29sb3IuQkxBQ0ssXG4gICAgICAgICAgICB0aGlzLmJvYXJkLFxuICAgICAgICApLmdldFBvc3NpYmxlTW92ZXMoKTtcbiAgICB9XG5cbiAgICBvblBpZWNlQ2xpY2tlZChwaWVjZUNsaWNrZWQsIHBvaW50Q2xpY2tlZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAodGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgJiZcbiAgICAgICAgICAgICAgICBwaWVjZUNsaWNrZWQuY29sb3IgPT09IENvbG9yLkJMQUNLKSB8fFxuICAgICAgICAgICAgKCF0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllciAmJlxuICAgICAgICAgICAgICAgIHBpZWNlQ2xpY2tlZC5jb2xvciA9PT0gQ29sb3IuV0hJVEUpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmVwYXJlQWN0aXZlUGllY2UocGllY2VDbGlja2VkLCBwb2ludENsaWNrZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDbGlja0V2ZW50KHBvaW50Q2xpY2tlZDogUG9pbnQsIGlzTW91c2VEb3duOiBib29sZWFuKSB7XG4gICAgICAgIGxldCBtb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKHRoaXMuYm9hcmQuaXNQb2ludEluUG9zc2libGVNb3Zlcyhwb2ludENsaWNrZWQpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5pc1BvaW50SW5Qb3NzaWJsZUNhcHR1cmVzKHBvaW50Q2xpY2tlZCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVNb2RlKSAmJlxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLmlzSW5SYW5nZSgpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5zYXZlQ2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQubGFzdE1vdmVTcmMgPSBuZXcgUG9pbnQoXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5hY3RpdmVQaWVjZS5wb2ludC5yb3csXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5hY3RpdmVQaWVjZS5wb2ludC5jb2wsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5sYXN0TW92ZURlc3QgPSBwb2ludENsaWNrZWQuY2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZVBpZWNlKHRoaXMuYm9hcmQuYWN0aXZlUGllY2UsIHBvaW50Q2xpY2tlZCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ib2FyZC5hY3RpdmVQaWVjZS5wb2ludC5pc0VxdWFsKHRoaXMuYm9hcmQubGFzdE1vdmVTcmMpKSB7XG4gICAgICAgICAgICAgICAgbW92aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01vdXNlRG93biB8fCBtb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzYWJsZVNlbGVjdGlvbigpO1xuICAgICAgICBjb25zdCBwaWVjZUNsaWNrZWQgPSB0aGlzLmJvYXJkLmdldFBpZWNlQnlQb2ludChcbiAgICAgICAgICAgIHBvaW50Q2xpY2tlZC5yb3csXG4gICAgICAgICAgICBwb2ludENsaWNrZWQuY29sLFxuICAgICAgICApO1xuICAgICAgICBpZiAocGllY2VDbGlja2VkICYmICFtb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMub25GcmVlTW9kZShwaWVjZUNsaWNrZWQpO1xuICAgICAgICAgICAgdGhpcy5vblBpZWNlQ2xpY2tlZChwaWVjZUNsaWNrZWQsIHBvaW50Q2xpY2tlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihcbiAgICAgICAgZXZlbnQ6IE1vdXNlRXZlbnQsXG4gICAgICAgIHBvaW50Q2xpY2tlZDogUG9pbnQsXG4gICAgICAgIGxlZnQ/OiBudW1iZXIsXG4gICAgICAgIHRvcD86IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgdGhpcy5tb3ZlRG9uZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdQb2ludCA9IENsaWNrVXRpbHMuZ2V0RHJhd2luZ1BvaW50KFxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0QW5kV2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvclN0cmF0ZWd5LFxuICAgICAgICAgICAgICAgIGV2ZW50LngsXG4gICAgICAgICAgICAgICAgZXZlbnQueSxcbiAgICAgICAgICAgICAgICBldmVudC5jdHJsS2V5LFxuICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICBldmVudC5zaGlmdEtleSxcbiAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdQcm92aWRlci5jbGVhcigpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuYWN0aXZlUGllY2UgJiZcbiAgICAgICAgICAgIHBvaW50Q2xpY2tlZC5pc0VxdWFsKHRoaXMuYm9hcmQuYWN0aXZlUGllY2UucG9pbnQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGllY2VDbGlja2VkID0gdGhpcy5ib2FyZC5nZXRQaWVjZUJ5UG9pbnQoXG4gICAgICAgICAgICBwb2ludENsaWNrZWQucm93LFxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLmNvbCxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgaWYgKHBpZWNlQ2xpY2tlZCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQucGllY2VzID0gdGhpcy5ib2FyZC5waWVjZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgKGUpID0+IGUgIT09IHBpZWNlQ2xpY2tlZCxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllciA9XG4gICAgICAgICAgICAgICAgICAgIHBpZWNlQ2xpY2tlZC5jb2xvciA9PT0gQ29sb3IuV0hJVEU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1BpZWNlRGlzYWJsZWQocGllY2VDbGlja2VkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrRXZlbnQocG9pbnRDbGlja2VkLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwaWVjZUNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRnJlZU1vZGUocGllY2VDbGlja2VkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGllY2VDbGlja2VkKHBpZWNlQ2xpY2tlZCwgcG9pbnRDbGlja2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VVcChcbiAgICAgICAgZXZlbnQ6IE1vdXNlRXZlbnQsXG4gICAgICAgIHBvaW50Q2xpY2tlZDogUG9pbnQsXG4gICAgICAgIGxlZnQ6IG51bWJlcixcbiAgICAgICAgdG9wOiBudW1iZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubW92ZURvbmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCAmJiAhdGhpcy5kcmF3RGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRHJhd1BvaW50KFxuICAgICAgICAgICAgICAgIGV2ZW50LngsXG4gICAgICAgICAgICAgICAgZXZlbnQueSxcbiAgICAgICAgICAgICAgICBldmVudC5jdHJsS2V5LFxuICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICBldmVudC5zaGlmdEtleSxcbiAgICAgICAgICAgICAgICBsZWZ0LFxuICAgICAgICAgICAgICAgIHRvcCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdQcm92aWRlci5jbGVhcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmRyYWdEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5ib2FyZC5hY3RpdmVQaWVjZSAmJlxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLmlzRXF1YWwodGhpcy5ib2FyZC5hY3RpdmVQaWVjZS5wb2ludCkgJiZcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsaW5nXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBpZWNlQ2xpY2tlZCA9IHRoaXMuYm9hcmQuZ2V0UGllY2VCeVBvaW50KFxuICAgICAgICAgICAgcG9pbnRDbGlja2VkLnJvdyxcbiAgICAgICAgICAgIHBvaW50Q2xpY2tlZC5jb2wsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQaWVjZURpc2FibGVkKHBpZWNlQ2xpY2tlZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja0V2ZW50KHBvaW50Q2xpY2tlZCwgZmFsc2UpO1xuICAgICAgICAgICAgLy8gICB0aGlzLnBvc3NpYmxlTW92ZXMgPSBhY3RpdmVQaWVjZS5nZXRQb3NzaWJsZU1vdmVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlQ2xvbmUoKSB7XG4gICAgICAgIGNvbnN0IGNsb25lID0gdGhpcy5ib2FyZC5jbG9uZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmJvYXJkLnJldmVydGVkKSB7XG4gICAgICAgICAgICBjbG9uZS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ib2FyZFN0YXRlUHJvdmlkZXIuYWRkTW92ZShuZXcgQm9hcmRTdGF0ZShjbG9uZSkpO1xuICAgIH1cblxuICAgIG1vdmVQaWVjZSh0b01vdmVQaWVjZTogUGllY2UsIG5ld1BvaW50OiBQb2ludCwgcHJvbW90aW9uSW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGVzdFBpZWNlID0gdGhpcy5ib2FyZC5waWVjZXMuZmluZChcbiAgICAgICAgICAgIChwaWVjZSkgPT5cbiAgICAgICAgICAgICAgICBwaWVjZS5wb2ludC5jb2wgPT09IG5ld1BvaW50LmNvbCAmJlxuICAgICAgICAgICAgICAgIHBpZWNlLnBvaW50LnJvdyA9PT0gbmV3UG9pbnQucm93LFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucGduUHJvY2Vzc29yLnByb2Nlc3ModGhpcy5ib2FyZCwgdG9Nb3ZlUGllY2UsIG5ld1BvaW50LCBkZXN0UGllY2UpO1xuXG4gICAgICAgIGlmIChkZXN0UGllY2UgJiYgdG9Nb3ZlUGllY2UuY29sb3IgIT09IGRlc3RQaWVjZS5jb2xvcikge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5waWVjZXMgPSB0aGlzLmJvYXJkLnBpZWNlcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKHBpZWNlKSA9PiBwaWVjZSAhPT0gZGVzdFBpZWNlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkZXN0UGllY2UgJiYgdG9Nb3ZlUGllY2UuY29sb3IgPT09IGRlc3RQaWVjZS5jb2xvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGlzdG9yeU1vdmVDYW5kaWRhdGUgPSBuZXcgSGlzdG9yeU1vdmUoXG4gICAgICAgICAgICBNb3ZlVXRpbHMuZm9ybWF0KHRvTW92ZVBpZWNlLnBvaW50LCBuZXdQb2ludCwgdGhpcy5ib2FyZC5yZXZlcnRlZCksXG4gICAgICAgICAgICB0b01vdmVQaWVjZS5jb25zdGFudC5uYW1lLFxuICAgICAgICAgICAgdG9Nb3ZlUGllY2UuY29sb3IgPT09IENvbG9yLldISVRFID8gJ3doaXRlJyA6ICdibGFjaycsXG4gICAgICAgICAgICAhIWRlc3RQaWVjZSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tb3ZlSGlzdG9yeVByb3ZpZGVyLmFkZE1vdmUodGhpcy5oaXN0b3J5TW92ZUNhbmRpZGF0ZSk7XG5cbiAgICAgICAgaWYgKHRvTW92ZVBpZWNlIGluc3RhbmNlb2YgS2luZykge1xuICAgICAgICAgICAgY29uc3Qgc3F1YXJlc01vdmVkID0gTWF0aC5hYnMobmV3UG9pbnQuY29sIC0gdG9Nb3ZlUGllY2UucG9pbnQuY29sKTtcbiAgICAgICAgICAgIGlmIChzcXVhcmVzTW92ZWQgPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1BvaW50LmNvbCA8IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdFJvb2sgPSB0aGlzLmJvYXJkLmdldFBpZWNlQnlGaWVsZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvTW92ZVBpZWNlLnBvaW50LnJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFJvb2sucG9pbnQuY29sID0gdGhpcy5ib2FyZC5yZXZlcnRlZCA/IDIgOiAzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmlnaHRSb29rID0gdGhpcy5ib2FyZC5nZXRQaWVjZUJ5RmllbGQoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b01vdmVQaWVjZS5wb2ludC5yb3csXG4gICAgICAgICAgICAgICAgICAgICAgICA3LFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0Um9vay5wb2ludC5jb2wgPSB0aGlzLmJvYXJkLnJldmVydGVkID8gNCA6IDU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9Nb3ZlUGllY2UgaW5zdGFuY2VvZiBQYXduKSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmNoZWNrSWZQYXduVGFrZXNFblBhc3NhbnQobmV3UG9pbnQpO1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5jaGVja0lmUGF3bkVucGFzc2FudGVkKHRvTW92ZVBpZWNlLCBuZXdQb2ludCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmVuUGFzc2FudFBvaW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuZW5QYXNzYW50UGllY2UgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9Nb3ZlUGllY2UucG9pbnQgPSBuZXdQb2ludDtcbiAgICAgICAgdGhpcy5pbmNyZWFzZUZ1bGxNb3ZlQ291bnQoKTtcbiAgICAgICAgdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIgPSAhdGhpcy5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXI7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrRm9yUGF3blByb21vdGUodG9Nb3ZlUGllY2UsIHByb21vdGlvbkluZGV4KSkge1xuICAgICAgICAgICAgdGhpcy5hZnRlck1vdmVBY3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZvclBhd25Qcm9tb3RlKHRvUHJvbW90ZVBpZWNlOiBQaWVjZSwgcHJvbW90aW9uSW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCEodG9Qcm9tb3RlUGllY2UgaW5zdGFuY2VvZiBQYXduKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvUHJvbW90ZVBpZWNlLnBvaW50LnJvdyA9PT0gMCB8fCB0b1Byb21vdGVQaWVjZS5wb2ludC5yb3cgPT09IDcpIHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQucGllY2VzID0gdGhpcy5ib2FyZC5waWVjZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChwaWVjZSkgPT4gcGllY2UgIT09IHRvUHJvbW90ZVBpZWNlLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gV2hlbiB3ZSBtYWtlIG1vdmUgbWFudWFsbHksIHdlIHBhc3MgcHJvbW90aW9uIGluZGV4IGFscmVhZHksIHNvIHdlIGRvbid0IG5lZWRcbiAgICAgICAgICAgIC8vIHRvIGFjcXVpcmUgaXQgZnJvbSBwcm9tb3RlIGRpYWxvZ1xuICAgICAgICAgICAgaWYgKCFwcm9tb3Rpb25JbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlblByb21vdGVEaWFsb2codG9Qcm9tb3RlUGllY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQaWVjZVByb21vdGlvblJlc29sdmVyLnJlc29sdmVQcm9tb3Rpb25DaG9pY2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQsXG4gICAgICAgICAgICAgICAgICAgIHRvUHJvbW90ZVBpZWNlLFxuICAgICAgICAgICAgICAgICAgICBwcm9tb3Rpb25JbmRleCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJNb3ZlQWN0aW9ucyhwcm9tb3Rpb25JbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWZ0ZXJNb3ZlQWN0aW9ucyhwcm9tb3Rpb25JbmRleD86IG51bWJlcikge1xuICAgICAgICB0aGlzLmNoZWNrSWZQYXduRmlyc3RNb3ZlKHRoaXMuYm9hcmQuYWN0aXZlUGllY2UpO1xuICAgICAgICB0aGlzLmNoZWNrSWZSb29rTW92ZWQodGhpcy5ib2FyZC5hY3RpdmVQaWVjZSk7XG4gICAgICAgIHRoaXMuY2hlY2tJZktpbmdNb3ZlZCh0aGlzLmJvYXJkLmFjdGl2ZVBpZWNlKTtcblxuICAgICAgICB0aGlzLmJvYXJkLmJsYWNrS2luZ0NoZWNrZWQgPSB0aGlzLmJvYXJkLmlzS2luZ0luQ2hlY2soXG4gICAgICAgICAgICBDb2xvci5CTEFDSyxcbiAgICAgICAgICAgIHRoaXMuYm9hcmQucGllY2VzLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmJvYXJkLndoaXRlS2luZ0NoZWNrZWQgPSB0aGlzLmJvYXJkLmlzS2luZ0luQ2hlY2soXG4gICAgICAgICAgICBDb2xvci5XSElURSxcbiAgICAgICAgICAgIHRoaXMuYm9hcmQucGllY2VzLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjaGVjayA9XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmJsYWNrS2luZ0NoZWNrZWQgfHwgdGhpcy5ib2FyZC53aGl0ZUtpbmdDaGVja2VkO1xuICAgICAgICBjb25zdCBjaGVja21hdGUgPVxuICAgICAgICAgICAgdGhpcy5jaGVja0ZvclBvc3NpYmxlTW92ZXMoQ29sb3IuQkxBQ0spIHx8XG4gICAgICAgICAgICB0aGlzLmNoZWNrRm9yUG9zc2libGVNb3ZlcyhDb2xvci5XSElURSk7XG4gICAgICAgIGNvbnN0IHN0YWxlbWF0ZSA9XG4gICAgICAgICAgICB0aGlzLmNoZWNrRm9yUGF0KENvbG9yLkJMQUNLKSB8fCB0aGlzLmNoZWNrRm9yUGF0KENvbG9yLldISVRFKTtcblxuICAgICAgICB0aGlzLmhpc3RvcnlNb3ZlQ2FuZGlkYXRlLnNldEdhbWVTdGF0ZXMoY2hlY2ssIHN0YWxlbWF0ZSwgY2hlY2ttYXRlKTtcbiAgICAgICAgdGhpcy5wZ25Qcm9jZXNzb3IucHJvY2Vzc0NoZWNrcyhjaGVja21hdGUsIGNoZWNrLCBzdGFsZW1hdGUpO1xuICAgICAgICB0aGlzLnBnblByb2Nlc3Nvci5hZGRQcm9tb3Rpb25DaG9pY2UocHJvbW90aW9uSW5kZXgpO1xuXG4gICAgICAgIHRoaXMuZGlzYWJsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYm9hcmQuY2FsY3VsYXRlRkVOKCk7XG5cbiAgICAgICAgY29uc3QgbGFzdE1vdmUgPSB0aGlzLm1vdmVIaXN0b3J5UHJvdmlkZXIuZ2V0TGFzdE1vdmUoKTtcbiAgICAgICAgaWYgKGxhc3RNb3ZlICYmIHByb21vdGlvbkluZGV4KSB7XG4gICAgICAgICAgICBsYXN0TW92ZS5tb3ZlICs9IHByb21vdGlvbkluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgLi4ubGFzdE1vdmUsXG4gICAgICAgICAgICBjaGVjayxcbiAgICAgICAgICAgIGNoZWNrbWF0ZSxcbiAgICAgICAgICAgIHN0YWxlbWF0ZSxcbiAgICAgICAgICAgIGZlbjogdGhpcy5ib2FyZC5mZW4sXG4gICAgICAgICAgICBwZ246IHtcbiAgICAgICAgICAgICAgICBwZ246IHRoaXMucGduUHJvY2Vzc29yLmdldFBHTigpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyZWVNb2RlOiB0aGlzLmZyZWVNb2RlLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vdmVEb25lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjaGVja0ZvclBhdChjb2xvcjogQ29sb3IpIHtcbiAgICAgICAgaWYgKGNvbG9yID09PSBDb2xvci5XSElURSAmJiAhdGhpcy5ib2FyZC53aGl0ZUtpbmdDaGVja2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja0ZvclBvc3NpYmxlTW92ZXMoY29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbG9yID09PSBDb2xvci5CTEFDSyAmJiAhdGhpcy5ib2FyZC5ibGFja0tpbmdDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tGb3JQb3NzaWJsZU1vdmVzKGNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5Qcm9tb3RlRGlhbG9nKHBpZWNlOiBQaWVjZSkge1xuICAgICAgICBpZiAocGllY2UuY29sb3IgPT09IHRoaXMuYm9hcmQuYWN0aXZlUGllY2UuY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMubW9kYWwub3BlbigoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBQaWVjZVByb21vdGlvblJlc29sdmVyLnJlc29sdmVQcm9tb3Rpb25DaG9pY2UoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQsXG4gICAgICAgICAgICAgICAgICAgIHBpZWNlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJNb3ZlQWN0aW9ucyhpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrRm9yUG9zc2libGVNb3Zlcyhjb2xvcjogQ29sb3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmJvYXJkLnBpZWNlc1xuICAgICAgICAgICAgLmZpbHRlcigocGllY2UpID0+IHBpZWNlLmNvbG9yID09PSBjb2xvcilcbiAgICAgICAgICAgIC5zb21lKFxuICAgICAgICAgICAgICAgIChwaWVjZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgcGllY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRQb3NzaWJsZU1vdmVzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zb21lKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb3ZlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhTW92ZVV0aWxzLndpbGxNb3ZlQ2F1c2VDaGVjayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGllY2UucG9pbnQucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGllY2UucG9pbnQuY29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZS5yb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlLmNvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICApIHx8XG4gICAgICAgICAgICAgICAgICAgIHBpZWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0UG9zc2libGVDYXB0dXJlcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc29tZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2FwdHVyZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIU1vdmVVdGlscy53aWxsTW92ZUNhdXNlQ2hlY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlLnBvaW50LnJvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlLnBvaW50LmNvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmUucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZS5jb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgZGlzYWJsZVNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ib2FyZC5wb3NzaWJsZUNhcHR1cmVzID0gW107XG4gICAgICAgIHRoaXMuYm9hcmQuYWN0aXZlUGllY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmJvYXJkLnBvc3NpYmxlTW92ZXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZXMgbG9naWMgdG8gYWxsb3cgZnJlZU1vZGUgYmFzZWQgbG9naWMgcHJvY2Vzc2luZ1xuICAgICAqL1xuICAgIG9uRnJlZU1vZGUocGllY2VDbGlja2VkKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICF0aGlzLmZyZWVNb2RlIHx8XG4gICAgICAgICAgICBwaWVjZUNsaWNrZWQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgcGllY2VDbGlja2VkID09PSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldHMgcGxheWVyIGFzIHdoaXRlIGluLWNhc2Ugd2hpdGUgcGllY2VzIGFyZSBzZWxlY3RlZCwgYW5kIHZpY2UtdmVyc2Egd2hlbiBibGFjayBpcyBzZWxlY3RlZFxuICAgICAgICB0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllciA9IHBpZWNlQ2xpY2tlZC5jb2xvciA9PT0gQ29sb3IuV0hJVEU7XG4gICAgfVxuXG4gICAgaXNQaWVjZURpc2FibGVkKHBpZWNlQ2xpY2tlZDogUGllY2UpIHtcbiAgICAgICAgaWYgKHBpZWNlQ2xpY2tlZCAmJiBwaWVjZUNsaWNrZWQucG9pbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kQ2FwdHVyZSA9IHRoaXMuYm9hcmQucG9zc2libGVDYXB0dXJlcy5maW5kKFxuICAgICAgICAgICAgICAgIChjYXB0dXJlKSA9PlxuICAgICAgICAgICAgICAgICAgICBjYXB0dXJlLmNvbCA9PT0gcGllY2VDbGlja2VkLnBvaW50LmNvbCAmJlxuICAgICAgICAgICAgICAgICAgICBjYXB0dXJlLnJvdyA9PT0gcGllY2VDbGlja2VkLnBvaW50LnJvdyxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChmb3VuZENhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHBpZWNlQ2xpY2tlZCAmJlxuICAgICAgICAgICAgKCh0aGlzLmxpZ2h0RGlzYWJsZWQgJiYgcGllY2VDbGlja2VkLmNvbG9yID09PSBDb2xvci5XSElURSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5kYXJrRGlzYWJsZWQgJiYgcGllY2VDbGlja2VkLmNvbG9yID09PSBDb2xvci5CTEFDSykpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkRHJhd1BvaW50KFxuICAgICAgICB4OiBudW1iZXIsXG4gICAgICAgIHk6IG51bWJlcixcbiAgICAgICAgY3J0bDogYm9vbGVhbixcbiAgICAgICAgYWx0OiBib29sZWFuLFxuICAgICAgICBzaGlmdDogYm9vbGVhbixcbiAgICAgICAgbGVmdDogbnVtYmVyLFxuICAgICAgICB0b3A6IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgY29uc3QgdXBQb2ludCA9IENsaWNrVXRpbHMuZ2V0RHJhd2luZ1BvaW50KFxuICAgICAgICAgICAgdGhpcy5oZWlnaHRBbmRXaWR0aCxcbiAgICAgICAgICAgIHRoaXMuY29sb3JTdHJhdGVneSxcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgY3J0bCxcbiAgICAgICAgICAgIGFsdCxcbiAgICAgICAgICAgIHNoaWZ0LFxuICAgICAgICAgICAgbGVmdCxcbiAgICAgICAgICAgIHRvcCxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5kcmF3UG9pbnQuaXNFcXVhbCh1cFBvaW50KSkge1xuICAgICAgICAgICAgY29uc3QgY2lyY2xlID0gbmV3IENpcmNsZSgpO1xuICAgICAgICAgICAgY2lyY2xlLmRyYXdQb2ludCA9IHVwUG9pbnQ7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJhd1Byb3ZpZGVyLmNvbnRhaW5zQ2lyY2xlKGNpcmNsZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQcm92aWRlci5hZGRDaXJjbGUoY2lyY2xlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3UHJvdmlkZXIucmVvbXZlQ2lyY2xlKGNpcmNsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhcnJvdyA9IG5ldyBBcnJvdygpO1xuICAgICAgICAgICAgYXJyb3cuc3RhcnQgPSB0aGlzLmRyYXdQb2ludDtcbiAgICAgICAgICAgIGFycm93LmVuZCA9IHVwUG9pbnQ7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5kcmF3UHJvdmlkZXIuY29udGFpbnNBcnJvdyhhcnJvdykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdQcm92aWRlci5hZGRBcnJvdyhhcnJvdyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1Byb3ZpZGVyLnJlbW92ZUFycm93KGFycm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluY3JlYXNlRnVsbE1vdmVDb3VudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJvYXJkLmN1cnJlbnRXaGl0ZVBsYXllcikge1xuICAgICAgICAgICAgKyt0aGlzLmJvYXJkLmZ1bGxNb3ZlQ291bnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRQaWVjZShcbiAgICAgICAgcGllY2VUeXBlSW5wdXQ6IFBpZWNlVHlwZUlucHV0LFxuICAgICAgICBjb2xvcklucHV0OiBDb2xvcklucHV0LFxuICAgICAgICBjb29yZHM6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuZnJlZU1vZGUgJiYgY29vcmRzICYmIHBpZWNlVHlwZUlucHV0ID4gMCAmJiBjb2xvcklucHV0ID4gMCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ZXMgPSBNb3ZlVXRpbHMudHJhbnNsYXRlQ29vcmRzVG9JbmRleChcbiAgICAgICAgICAgICAgICBjb29yZHMsXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5yZXZlcnRlZCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBsZXQgZXhpc3RpbmcgPSB0aGlzLmJvYXJkLmdldFBpZWNlQnlQb2ludChcbiAgICAgICAgICAgICAgICBpbmRleGVzLnlBeGlzLFxuICAgICAgICAgICAgICAgIGluZGV4ZXMueEF4aXMsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5waWVjZXMgPSB0aGlzLmJvYXJkLnBpZWNlcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIChlKSA9PiBlICE9PSBleGlzdGluZyxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNyZWF0ZWRQaWVjZSA9IFBpZWNlRmFjdG9yeS5jcmVhdGUoXG4gICAgICAgICAgICAgICAgaW5kZXhlcyxcbiAgICAgICAgICAgICAgICBwaWVjZVR5cGVJbnB1dCxcbiAgICAgICAgICAgICAgICBjb2xvcklucHV0LFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zYXZlQ2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQucGllY2VzLnB1c2goY3JlYXRlZFBpZWNlKTtcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJNb3ZlQWN0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19