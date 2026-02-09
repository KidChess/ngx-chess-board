import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MoveChange,
    NgxChessBoardComponent,
    PieceIconInput,
} from 'ngx-chess-board';
import {
    ColorInput,
    PieceTypeInput,
} from 'projects/ngx-chess-board/src/lib/utils/inputs/piece-type-input';
// import {
//     ColorInput,
//     PieceTypeInput,
// } from 'ngx-chess-board/src/lib/utils/inputs/piece-type-input';
import { FenComponent } from './components/fen/fen.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'], // Add it to standalone
    imports: [NgxChessBoardComponent, FormsModule]
})
export class AppComponent implements AfterViewInit {
    @ViewChild('board')
    boardManager: NgxChessBoardComponent;

    @ViewChild('fenManager') fenManager: FenComponent;
    public fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
    private currentStateIndex: number;
    manualMove = 'd2d4';
    icons: PieceIconInput = {
        blackCoinUrl: '',
        blackBishopUrl: '',
        blackKingUrl: '',
        blackKnightUrl: '',
        blackPawnUrl: '',
        blackQueenUrl: '',
        blackRookUrl: '',
        whiteCoinUrl: '',
        whiteBishopUrl: '',
        whiteKingUrl: '',
        whiteKnightUrl: '',
        whitePawnUrl: '',
        whiteQueenUrl: '',
        whiteRookUrl: '',
    };

    public darkTileColor = 'rgb(97, 84, 61)';
    public lightTileColor = '#BAA378';
    public size = 400;
    public dragDisabled = false;
    public drawDisabled = false;
    public lightDisabled = false;
    public darkDisabled = false;
    public freeMode = false;
    public addPieceCoords: string = 'a4';
    public selectedPiece = '1';
    public selectedColor = '1';
    public pgn: string = '';

    ngAfterViewInit(): void {
        // Automatically load the en passant test position
        setTimeout(() => {
            this.setFen();
        }, 100);
    }

    public reset(): void {
        alert('Resetting board');
        this.boardManager.reset();
        this.fen = this.boardManager.getFEN();
        this.freeMode = false;
    }

    public reverse(): void {
        this.boardManager.reverse();
    }

    public undo(): void {
        this.boardManager.undo();
        this.fen = this.boardManager.getFEN();
        this.pgn = this.boardManager.getPGN();
    }

    public setFen(): void {
        if (this.fen) {
            this.boardManager.setFEN(this.fen);
            
            // Debug: Check en passant state after setting FEN
            const board = (this.boardManager as any).engineFacade.board;
            console.log('En passant point:', board.enPassantPoint);
            console.log('En passant piece:', board.enPassantPiece);
            
            let debugMessage = 'En Passant Debug:\n';
            if (board.enPassantPoint) {
                const square = `${String.fromCharCode(97 + board.enPassantPoint.col)}${8 - board.enPassantPoint.row}`;
                debugMessage += `✓ En passant target square: ${square}\n`;
                debugMessage += `✓ Point: row=${board.enPassantPoint.row}, col=${board.enPassantPoint.col}\n`;
                
                if (board.enPassantPiece) {
                    const pieceSquare = `${String.fromCharCode(97 + board.enPassantPiece.point.col)}${8 - board.enPassantPiece.point.row}`;
                    debugMessage += `✓ Capturable piece: ${board.enPassantPiece.color === 0 ? 'White' : 'Black'} pawn at ${pieceSquare}`;
                } else {
                    debugMessage += '✗ No capturable piece found';
                }
            } else {
                debugMessage += '✗ No en passant target detected';
            }
            
            alert(debugMessage);
        }
    }

    public moveCallback(move: MoveChange): void {
        this.fen = this.boardManager.getFEN();
        this.pgn = this.boardManager.getPGN();
        console.log(move);
    }

    public moveManual(): void {
        this.boardManager.move(this.manualMove);
    }

    getFEN() {
        let fen = this.boardManager.getFEN();
        alert(fen);
    }

    testEnPassant() {
        // Test FEN with c3 en passant square - black to play
        const testFen = 'rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 2';
        this.fen = testFen;
        this.setFen();
    }

    testEnPassantKingSafety() {
        // Test a position where en passant might be blocked due to king safety
        // Black king on e8, White rook on e1, Black pawn on d4, White pawn just moved c2-c4
        const testFen = 'r3k2r/pp1ppppp/8/2p5/2P1P3/8/PP1P1PPP/R3K2R b KQkq c3 0 2';
        this.fen = testFen;
        this.setFen();
        
        // This should allow en passant if our fix works correctly
        console.log('Testing en passant with king safety considerations...');
    }

    testEnPassantMove() {
        // Try to execute the en passant move d4xc3
        try {
            this.boardManager.move('d4c3');
            console.log('✅ En passant move d4xc3 executed successfully!');
            this.fen = this.boardManager.getFEN();
        } catch (error) {
            console.log('❌ En passant move d4xc3 failed:', error);
        }
    }

    showMoveHistory() {
        alert(JSON.stringify(this.boardManager.getMoveHistory()));
    }

    switchDrag() {
        this.dragDisabled = !this.dragDisabled;
    }

    switchDraw() {
        this.drawDisabled = !this.drawDisabled;
    }

    switchDarkDisabled() {
        this.darkDisabled = !this.darkDisabled;
    }

    switchLightDisabled() {
        this.lightDisabled = !this.lightDisabled;
    }

    switchFreeMode() {
        this.freeMode = !this.freeMode;
    }

    addPiece() {
        let piece = this.resolveSelectedPiece();
        let color = this.resolveSelectedColor();
        this.boardManager.addPiece(piece, color, this.addPieceCoords);
    }

    private resolveSelectedPiece(): PieceTypeInput {
        switch (this.selectedPiece) {
            case '1':
                return PieceTypeInput.QUEEN;
            case '2':
                return PieceTypeInput.KING;
            case '3':
                return PieceTypeInput.ROOK;
            case '4':
                return PieceTypeInput.BISHOP;
            case '5':
                return PieceTypeInput.KNIGHT;
            case '6':
                return PieceTypeInput.PAWN;
        }
    }

    private resolveSelectedColor(): ColorInput {
        switch (this.selectedColor) {
            case '1':
                return ColorInput.LIGHT;
            case '2':
                return ColorInput.DARK;
        }
    }

    public setPgn() {
        this.boardManager.setPGN(this.pgn);
    }

    loadDefaultPgn() {
        this.pgn =
            '1. c4 b5 2. cxb5 c6 3. bxc6 Nxc6 4. Qa4 a6\n' +
            '5. Qxa6 Rb8 6. b3 d5 7. f4 e5 8. fxe5 f6\n' +
            '9. exf6 gxf6 10. Nf3 f5 11. Ne5 Bb7 12. Qxb7 Na7\n' +
            '13. Qxb8 Qxb8 14. Kf2 Kd8 15. Nc3 Be7 16. Nc4 Bf6\n' +
            '17. Nb6 Nb5 18. Nbxd5 f4 19. Ne4 Na7 20. Nexf6';
        this.setPgn();
    }

    getPGN() {
        alert(this.boardManager.getPGN());
    }
}
