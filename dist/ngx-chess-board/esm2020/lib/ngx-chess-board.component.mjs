import { Component, EventEmitter, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { NotationProcessorFactory, NotationType, } from './engine/board-state-provider/board-loader/notation-processors/notation-processor-factory';
import { ClickUtils } from './engine/click/click-utils';
import { EngineFacade } from './engine/engine-facade';
import { Board } from './models/board';
import { Constants } from './utils/constants';
import * as i0 from "@angular/core";
import * as i1 from "./service/ngx-chess-board.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/drag-drop";
import * as i4 from "./piece-promotion/piece-promotion-modal/piece-promotion-modal.component";
const _c0 = ["boardRef"];
const _c1 = ["modal"];
function NgxChessBoardComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵlistener("cdkDragEnded", function NgxChessBoardComponent_div_3_Template_div_cdkDragEnded_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.dragEnded($event); })("cdkDragMoved", function NgxChessBoardComponent_div_3_Template_div_cdkDragMoved_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.dragMoved($event); })("cdkDragStarted", function NgxChessBoardComponent_div_3_Template_div_cdkDragStarted_0_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.dragStart($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const piece_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("transform", "translate3d(" + piece_r7.point.col * ctx_r1.pieceSize + "px, " + piece_r7.point.row * ctx_r1.pieceSize + "px,0px)")("max-height", ctx_r1.pieceSize + "px")("font-size", ctx_r1.pieceSize * 0.8 + "px")("width", ctx_r1.pieceSize + "px")("height", ctx_r1.pieceSize + "px");
    i0.ɵɵproperty("cdkDragDisabled", ctx_r1.engineFacade.dragDisabled)("innerHTML", ctx_r1.engineFacade.pieceIconManager.isDefaultIcons() ? piece_r7.constant.icon : "", i0.ɵɵsanitizeHtml)("ngStyle", ctx_r1.engineFacade.pieceIconManager.isDefaultIcons() ? "" : ctx_r1.getCustomPieceIcons(piece_r7));
} }
function NgxChessBoardComponent_div_4_div_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r14 = i0.ɵɵnextContext(2).index;
    const ctx_r18 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("color", i_r14 % 2 === 0 ? ctx_r18.lightTileColor : ctx_r18.darkTileColor)("font-size", ctx_r18.pieceSize / 4, "px");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r18.engineFacade.coords.yCoords[i_r14], " ");
} }
function NgxChessBoardComponent_div_4_div_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const j_r17 = i0.ɵɵnextContext().index;
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("color", j_r17 % 2 === 0 ? ctx_r19.lightTileColor : ctx_r19.darkTileColor)("font-size", ctx_r19.pieceSize / 4, "px");
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r19.engineFacade.coords.xCoords[j_r17], " ");
} }
function NgxChessBoardComponent_div_4_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "div", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("font-size", ctx_r20.pieceSize + "px");
    i0.ɵɵproperty("ngClass", "piece");
} }
function NgxChessBoardComponent_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, NgxChessBoardComponent_div_4_div_1_span_1_Template, 2, 5, "span", 15);
    i0.ɵɵtemplate(2, NgxChessBoardComponent_div_4_div_1_span_2_Template, 2, 5, "span", 16);
    i0.ɵɵtemplate(3, NgxChessBoardComponent_div_4_div_1_div_3_Template, 2, 3, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const j_r17 = ctx.index;
    const i_r14 = i0.ɵɵnextContext().index;
    const ctx_r15 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background-color", ctx_r15.getTileBackgroundColor(i_r14, j_r17));
    i0.ɵɵclassProp("current-selection", ctx_r15.showActivePiece && ctx_r15.engineFacade.board.isXYInActiveMove(i_r14, j_r17))("king-check", ctx_r15.engineFacade.board.isKingChecked(ctx_r15.engineFacade.board.getPieceByPoint(i_r14, j_r17)))("point-circle", ctx_r15.engineFacade.board.isXYInPointSelection(i_r14, j_r17))("possible-capture", ctx_r15.showPossibleCaptures && ctx_r15.engineFacade.board.isXYInPossibleCaptures(i_r14, j_r17))("possible-point", ctx_r15.engineFacade.board.isXYInPossibleMoves(i_r14, j_r17) && ctx_r15.showLegalMoves);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.showCoords && j_r17 === 7);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.showCoords && i_r14 === 7);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r15.engineFacade.board.getPieceByPoint(i_r14, j_r17));
} }
function NgxChessBoardComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtemplate(1, NgxChessBoardComponent_div_4_div_1_Template, 4, 15, "div", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r13 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", row_r13);
} }
function NgxChessBoardComponent__svg_defs_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "defs");
    i0.ɵɵelementStart(1, "marker", 22);
    i0.ɵɵelement(2, "path", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r25 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("id", color_r25 + "Arrow");
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("fill", color_r25);
} }
function NgxChessBoardComponent__svg_line_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "line", 24);
} if (rf & 2) {
    const arrow_r26 = ctx.$implicit;
    i0.ɵɵattribute("marker-end", "url(#" + arrow_r26.end.color + "Arrow)")("stroke", arrow_r26.end.color)("x1", arrow_r26.start.x)("x2", arrow_r26.end.x)("y1", arrow_r26.start.y)("y2", arrow_r26.end.y);
} }
function NgxChessBoardComponent__svg_circle_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 25);
} if (rf & 2) {
    const circle_r27 = ctx.$implicit;
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵattribute("cx", circle_r27.drawPoint.x)("cy", circle_r27.drawPoint.y)("r", ctx_r5.engineFacade.heightAndWidth / 18)("stroke", circle_r27.drawPoint.color);
} }
const _c2 = function () { return ["red", "green", "blue", "orange"]; };
export class NgxChessBoardComponent {
    constructor(ngxChessBoardService) {
        this.ngxChessBoardService = ngxChessBoardService;
        this.darkTileColor = Constants.DEFAULT_DARK_TILE_COLOR;
        this.lightTileColor = Constants.DEFAULT_LIGHT_TILE_COLOR;
        this.showCoords = true;
        this.sourcePointColor = Constants.DEFAULT_SOURCE_POINT_COLOR;
        this.destinationPointColor = Constants.DEFAULT_DESTINATION_POINT_COLOR;
        this.legalMovesPointColor = Constants.DEFAULT_LEGAL_MOVE_POINT_COLOR;
        this.showLastMove = true;
        this.showLegalMoves = true;
        this.showActivePiece = true;
        this.showPossibleCaptures = true;
        /**
         * Enabling free mode removes turn-based restriction and allows to move any piece freely!
         */
        this.moveChange = new EventEmitter();
        this.checkmate = new EventEmitter();
        this.stalemate = new EventEmitter();
        this.selected = false;
        this.isDragging = false;
        this.startTransition = '';
        this.engineFacade = new EngineFacade(new Board(), this.moveChange);
    }
    set size(size) {
        if (size &&
            size >= Constants.MIN_BOARD_SIZE &&
            size <= Constants.MAX_BOARD_SIZE) {
            this.engineFacade.heightAndWidth = size;
        }
        else {
            this.engineFacade.heightAndWidth = Constants.DEFAULT_SIZE;
        }
        this.engineFacade.drawProvider.clear();
        this.calculatePieceSize();
    }
    set freeMode(freeMode) {
        this.engineFacade.freeMode = freeMode;
    }
    set dragDisabled(dragDisabled) {
        this.engineFacade.dragDisabled = dragDisabled;
    }
    set drawDisabled(drawDisabled) {
        this.engineFacade.drawDisabled = drawDisabled;
    }
    set pieceIcons(pieceIcons) {
        this.engineFacade.pieceIconManager.pieceIconInput = pieceIcons;
    }
    set lightDisabled(lightDisabled) {
        this.engineFacade.lightDisabled = lightDisabled;
    }
    set darkDisabled(darkDisabled) {
        this.engineFacade.darkDisabled = darkDisabled;
    }
    onRightClick(event) {
        event.preventDefault();
    }
    ngOnChanges(changes) {
        if ((changes.lightDisabled &&
            this.lightDisabled &&
            this.engineFacade.board.currentWhitePlayer) ||
            (changes.darkDisabled &&
                this.darkDisabled &&
                !this.engineFacade.board.currentWhitePlayer)) {
            this.engineFacade.board.possibleCaptures = [];
            this.engineFacade.board.possibleMoves = [];
        }
    }
    ngOnInit() {
        this.ngxChessBoardService.componentMethodCalled$.subscribe(() => {
            this.engineFacade.reset();
        });
    }
    ngAfterViewInit() {
        this.engineFacade.modal = this.modal;
        this.calculatePieceSize();
    }
    onMouseUp(event) {
        this.engineFacade.onMouseUp(event, this.getClickPoint(event), this.boardRef.nativeElement.getBoundingClientRect().left, this.boardRef.nativeElement.getBoundingClientRect().top);
    }
    reverse() {
        this.selected = false;
        this.engineFacade.board.reverse();
        this.engineFacade.coords.reverse();
    }
    updateBoard(board) {
        this.engineFacade.board = board;
        this.boardLoader.setEngineFacade(this.engineFacade);
        this.engineFacade.board.possibleCaptures = [];
        this.engineFacade.board.possibleMoves = [];
    }
    setFEN(fen) {
        try {
            this.engineFacade.boardLoader.setNotationProcessor(NotationProcessorFactory.getProcessor(NotationType.FEN));
            this.engineFacade.boardLoader.loadFEN(fen);
            this.engineFacade.board.possibleCaptures = [];
            this.engineFacade.board.possibleMoves = [];
            this.engineFacade.coords.reset();
        }
        catch (exception) {
            this.engineFacade.boardLoader.addPieces();
        }
    }
    setPGN(pgn) {
        try {
            this.engineFacade.pgnProcessor.reset();
            this.engineFacade.boardLoader.setNotationProcessor(NotationProcessorFactory.getProcessor(NotationType.PGN));
            this.engineFacade.boardLoader.loadPGN(pgn);
            this.engineFacade.board.possibleCaptures = [];
            this.engineFacade.board.possibleMoves = [];
            this.engineFacade.coords.reset();
        }
        catch (exception) {
            console.log(exception);
            this.engineFacade.boardLoader.addPieces();
        }
    }
    getFEN() {
        return this.engineFacade.board.fen;
    }
    dragEnded(event) {
        this.isDragging = false;
        this.engineFacade.dragEndStrategy.process(event, this.engineFacade.moveDone, this.startTransition);
    }
    dragStart(event) {
        this.isDragging = true;
        let trans = event.source.getRootElement().style.transform.split(') ');
        //   this.startTrans= trans;
        this.startTransition = trans.length === 2 ? trans[1] : trans[0];
        this.engineFacade.dragStartStrategy.process(event);
    }
    onMouseDown(event) {
        this.engineFacade.onMouseDown(event, this.getClickPoint(event), this.boardRef.nativeElement.getBoundingClientRect().left, this.boardRef.nativeElement.getBoundingClientRect().top);
    }
    getClickPoint(event) {
        return ClickUtils.getClickPoint(event, this.boardRef.nativeElement.getBoundingClientRect().top, this.boardRef.nativeElement.getBoundingClientRect().height, this.boardRef.nativeElement.getBoundingClientRect().left, this.boardRef.nativeElement.getBoundingClientRect().width);
    }
    calculatePieceSize() {
        this.pieceSize = this.engineFacade.heightAndWidth / 8;
    }
    getCustomPieceIcons(piece) {
        return JSON.parse(`{ "background-image": "url('${this.engineFacade.pieceIconManager.getPieceIcon(piece)}')"}`);
    }
    move(coords) {
        this.engineFacade.move(coords);
    }
    getMoveHistory() {
        return this.engineFacade.getMoveHistory();
    }
    reset() {
        this.engineFacade.reset();
    }
    undo() {
        this.engineFacade.undo();
    }
    addPiece(pieceTypeInput, colorInput, coords) {
        this.engineFacade.addPiece(pieceTypeInput, colorInput, coords);
    }
    getPGN() {
        return this.engineFacade.pgnProcessor.getPGN();
    }
    dragMoved($event) {
        let x = ($event.pointerPosition.x - $event.source.getRootElement().parentElement.getBoundingClientRect().left) - (this.pieceSize / 2);
        let y = ($event.pointerPosition.y - $event.source.getRootElement().parentElement.getBoundingClientRect().top) - (this.pieceSize / 2);
        $event.source.getRootElement().style.transform = 'translate3d(' + x + 'px, '
            + (y) + 'px,0px)';
    }
    getTileBackgroundColor(i, j) {
        let color = ((i + j) % 2 === 0) ? this.lightTileColor : this.darkTileColor;
        if (this.showLastMove) {
            if (this.engineFacade.board.isXYInSourceMove(i, j)) {
                color = this.sourcePointColor;
            }
            if (this.engineFacade.board.isXYInDestMove(i, j)) {
                color = this.destinationPointColor;
            }
        }
        return color;
    }
}
NgxChessBoardComponent.ɵfac = function NgxChessBoardComponent_Factory(t) { return new (t || NgxChessBoardComponent)(i0.ɵɵdirectiveInject(i1.NgxChessBoardService)); };
NgxChessBoardComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgxChessBoardComponent, selectors: [["ngx-chess-board"]], viewQuery: function NgxChessBoardComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.boardRef = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.modal = _t.first);
    } }, hostBindings: function NgxChessBoardComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("contextmenu", function NgxChessBoardComponent_contextmenu_HostBindingHandler($event) { return ctx.onRightClick($event); });
    } }, inputs: { darkTileColor: "darkTileColor", lightTileColor: "lightTileColor", showCoords: "showCoords", sourcePointColor: "sourcePointColor", destinationPointColor: "destinationPointColor", legalMovesPointColor: "legalMovesPointColor", showLastMove: "showLastMove", showLegalMoves: "showLegalMoves", showActivePiece: "showActivePiece", showPossibleCaptures: "showPossibleCaptures", size: "size", freeMode: "freeMode", dragDisabled: "dragDisabled", drawDisabled: "drawDisabled", pieceIcons: "pieceIcons", lightDisabled: "lightDisabled", darkDisabled: "darkDisabled" }, outputs: { moveChange: "moveChange", checkmate: "checkmate", stalemate: "stalemate" }, features: [i0.ɵɵNgOnChangesFeature], decls: 13, vars: 18, consts: [["id", "board", 3, "pointerdown", "pointerup"], ["boardRef", ""], ["id", "drag"], ["class", "single-piece", "cdkDrag", "", 3, "cdkDragDisabled", "innerHTML", "ngStyle", "transform", "max-height", "font-size", "width", "height", "cdkDragEnded", "cdkDragMoved", "cdkDragStarted", 4, "ngFor", "ngForOf"], ["class", "board-row", 4, "ngFor", "ngForOf"], [2, "position", "absolute", "top", "0", "pointer-events", "none"], [4, "ngFor", "ngForOf"], ["class", "arrow", 4, "ngFor", "ngForOf"], ["fill-opacity", "0.0", "stroke-width", "2", 4, "ngFor", "ngForOf"], [3, "pieceIconInput", "color"], ["modal", ""], ["cdkDrag", "", 1, "single-piece", 3, "cdkDragDisabled", "innerHTML", "ngStyle", "cdkDragEnded", "cdkDragMoved", "cdkDragStarted"], [1, "board-row"], ["class", "board-col", 3, "current-selection", "king-check", "point-circle", "possible-capture", "possible-point", "background-color", 4, "ngFor", "ngForOf"], [1, "board-col"], ["class", "yCoord", 3, "color", "font-size", 4, "ngIf"], ["class", "xCoord", 3, "color", "font-size", 4, "ngIf"], ["style", "height:100%; width:100%", 4, "ngIf"], [1, "yCoord"], [1, "xCoord"], [2, "height", "100%", "width", "100%"], [3, "ngClass"], ["markerHeight", "13", "markerWidth", "13", "orient", "auto", "refX", "9", "refY", "6", 3, "id"], ["d", "M2,2 L2,11 L10,6 L2,2"], [1, "arrow"], ["fill-opacity", "0.0", "stroke-width", "2"]], template: function NgxChessBoardComponent_Template(rf, ctx) { if (rf & 1) {
        const _r28 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵlistener("pointerdown", function NgxChessBoardComponent_Template_div_pointerdown_0_listener($event) { i0.ɵɵrestoreView(_r28); const _r6 = i0.ɵɵreference(12); return !_r6.opened && ctx.onMouseDown($event); })("pointerup", function NgxChessBoardComponent_Template_div_pointerup_0_listener($event) { i0.ɵɵrestoreView(_r28); const _r6 = i0.ɵɵreference(12); return !_r6.opened && ctx.onMouseUp($event); });
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtemplate(3, NgxChessBoardComponent_div_3_Template, 1, 13, "div", 3);
        i0.ɵɵtemplate(4, NgxChessBoardComponent_div_4_Template, 2, 1, "div", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(5, "svg", 5);
        i0.ɵɵtemplate(6, NgxChessBoardComponent__svg_defs_6_Template, 3, 3, "defs", 6);
        i0.ɵɵtemplate(7, NgxChessBoardComponent__svg_line_7_Template, 1, 6, "line", 7);
        i0.ɵɵpipe(8, "async");
        i0.ɵɵtemplate(9, NgxChessBoardComponent__svg_circle_9_Template, 1, 4, "circle", 8);
        i0.ɵɵpipe(10, "async");
        i0.ɵɵelementEnd();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelement(11, "app-piece-promotion-modal", 9, 10);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵstyleProp("height", ctx.engineFacade.heightAndWidth, "px")("width", ctx.engineFacade.heightAndWidth, "px");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.engineFacade.board.pieces);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.engineFacade.board.board);
        i0.ɵɵadvance(1);
        i0.ɵɵattribute("height", ctx.engineFacade.heightAndWidth)("width", ctx.engineFacade.heightAndWidth);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(17, _c2));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(8, 13, ctx.engineFacade.drawProvider.arrows$));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(10, 15, ctx.engineFacade.drawProvider.circles$));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("pieceIconInput", ctx.engineFacade.pieceIconManager.pieceIconInput)("color", ctx.engineFacade.board.getCurrentPlayerColor() ? "white" : "black");
    } }, directives: [i2.NgForOf, i3.CdkDrag, i2.NgStyle, i2.NgIf, i2.NgClass, i4.PiecePromotionModalComponent], pipes: [i2.AsyncPipe], styles: ["@charset \"UTF-8\";#board[_ngcontent-%COMP%]{font-family:Courier New,serif;position:relative}.board-row[_ngcontent-%COMP%]{display:block;width:100%;height:12.5%;position:relative}.board-col[_ngcontent-%COMP%]{position:relative;display:inline-block;width:12.5%;vertical-align:top;cursor:default;height:100%}.piece[_ngcontent-%COMP%]{height:100%;cursor:-webkit-grab;cursor:grab;width:100%;-moz-user-select:none;user-select:none;-webkit-user-select:none;background-size:cover;justify-content:center;text-align:center;color:#000!important;box-sizing:border-box}.piece[_ngcontent-%COMP%]:after{content:\"\\200b\";box-sizing:border-box}#drag[_ngcontent-%COMP%]{height:100%;width:100%}.possible-point[_ngcontent-%COMP%]{background:radial-gradient(#13262F 15%,transparent 20%)}.possible-point[_ngcontent-%COMP%]:hover, .possible-capture[_ngcontent-%COMP%]:hover{opacity:.4}.possible-capture[_ngcontent-%COMP%]{background:radial-gradient(transparent 0%,transparent 80%,#13262F 80%);opacity:.5;box-sizing:border-box;margin:0;padding:0}.king-check[_ngcontent-%COMP%]{background:radial-gradient(ellipse at center,red 0%,#e70000 25%,rgba(169,0,0,0) 89%,rgba(158,0,0,0) 100%)}.current-selection[_ngcontent-%COMP%]{background-color:#72620b!important}.yCoord[_ngcontent-%COMP%]{position:absolute;-moz-user-select:none;user-select:none;-webkit-user-select:none;cursor:pointer;right:.2em;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.xCoord[_ngcontent-%COMP%]{position:absolute;-moz-user-select:none;user-select:none;-webkit-user-select:none;cursor:pointer;left:.2em;bottom:0;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.hovering[_ngcontent-%COMP%]{background-color:red!important}.arrow[_ngcontent-%COMP%]{stroke-width:2}svg[_ngcontent-%COMP%]{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111)}[_nghost-%COMP%]{display:inline-block!important}.single-piece[_ngcontent-%COMP%]{position:absolute;z-index:999;justify-content:center;text-align:center;-moz-user-select:none;user-select:none;-webkit-user-select:none;color:#000!important;cursor:-webkit-grab;cursor:grab;background-size:cover}.single-piece[_ngcontent-%COMP%]:after{content:\"\\200b\";box-sizing:border-box}.cdk-drag[_ngcontent-%COMP%]:not(.cdk-drag-dragging){transition:transform .2s cubic-bezier(0,.3,.14,.49)}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChessBoardComponent, [{
        type: Component,
        args: [{ selector: 'ngx-chess-board', template: "<div\n    id=\"board\"\n    [style.height.px]=\"engineFacade.heightAndWidth\"\n    [style.width.px]=\"engineFacade.heightAndWidth\"\n    (pointerdown)=\"!modal.opened && onMouseDown($event)\"\n    (pointerup)=\"!modal.opened && onMouseUp($event)\"\n    #boardRef\n>\n    <div id=\"drag\">\n        <div\n            [cdkDragDisabled]=\"engineFacade.dragDisabled\"\n            (cdkDragEnded)=\"dragEnded($event)\"\n            (cdkDragMoved)=\"dragMoved($event)\"\n            (cdkDragStarted)=\"dragStart($event)\"\n            class=\"single-piece\" [innerHTML]=\"engineFacade.pieceIconManager.isDefaultIcons() ? piece.constant.icon : ''\"\n            [ngStyle]=\"engineFacade.pieceIconManager.isDefaultIcons() ? '' : getCustomPieceIcons(piece)\"\n            [style.transform]=\"'translate3d(' + piece.point.col * pieceSize + 'px, ' + piece.point.row * pieceSize + 'px,0px)'\"\n            [style.max-height]=\"pieceSize + 'px'\"\n            [style.font-size]=\"pieceSize * 0.8 + 'px'\"\n            [style.width]=\"pieceSize + 'px'\"\n            [style.height]=\"pieceSize + 'px'\"\n            cdkDrag\n            *ngFor=\"let piece of engineFacade.board.pieces; let i = index\"\n        >\n        </div>\n        <div\n            class=\"board-row\"\n            *ngFor=\"let row of engineFacade.board.board; let i = index\"\n        >\n            <div\n                class=\"board-col\"\n                [class.current-selection]=\"showActivePiece && engineFacade.board.isXYInActiveMove(i,j)\"\n                [class.king-check]=\" engineFacade.board.isKingChecked(engineFacade.board.getPieceByPoint(i,j))\"\n                [class.point-circle]=\"engineFacade.board.isXYInPointSelection(i, j)\"\n                [class.possible-capture]=\"showPossibleCaptures && engineFacade.board.isXYInPossibleCaptures(i, j)\"\n                [class.possible-point]=\"engineFacade.board.isXYInPossibleMoves(i, j) && showLegalMoves\"\n                [style.background-color]=\"getTileBackgroundColor(i, j)\"\n                *ngFor=\"let col of row; let j = index\"\n            >\n                <span\n                    class=\"yCoord\"\n                    [style.color]=\"(i % 2 === 0) ? lightTileColor : darkTileColor\"\n                    [style.font-size.px]=\"pieceSize / 4\"\n                    *ngIf=\"showCoords && j === 7\"\n                >\n                    {{engineFacade.coords.yCoords[i]}}\n                </span>\n                <span\n                    class=\"xCoord\"\n                    [style.color]=\"(j % 2 === 0) ? lightTileColor : darkTileColor\"\n                    [style.font-size.px]=\"pieceSize / 4\"\n                    *ngIf=\"showCoords && i === 7\"\n                >\n                    {{engineFacade.coords.xCoords[j]}}\n                </span>\n                <div\n                    *ngIf=\"engineFacade.board.getPieceByPoint(i, j) as piece\"\n                    style=\"height:100%; width:100%\"\n                >\n                    <div\n                        [ngClass]=\"'piece'\"\n                        [style.font-size]=\"pieceSize + 'px'\"\n\n                    >\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <svg\n        [attr.height]=\"engineFacade.heightAndWidth\"\n        [attr.width]=\"engineFacade.heightAndWidth\"\n        style=\"position:absolute; top:0; pointer-events: none\"\n    >\n        <defs *ngFor=\"let color of ['red', 'green', 'blue', 'orange']\">\n            <marker\n                [id]=\"color + 'Arrow'\"\n                markerHeight=\"13\"\n                markerWidth=\"13\"\n                orient=\"auto\"\n                refX=\"9\"\n                refY=\"6\"\n            >\n                <path\n                    [style.fill]=\"color\"\n                    d=\"M2,2 L2,11 L10,6 L2,2\"\n                ></path>\n            </marker>\n        </defs>\n        <line\n            class=\"arrow\"\n            [attr.marker-end]=\"'url(#' + arrow.end.color + 'Arrow)'\"\n            [attr.stroke]=\"arrow.end.color\"\n            [attr.x1]=\"arrow.start.x\"\n            [attr.x2]=\"arrow.end.x\"\n            [attr.y1]=\"arrow.start.y\"\n            [attr.y2]=\"arrow.end.y\"\n            *ngFor=\"let arrow of engineFacade.drawProvider.arrows$ | async\"\n        ></line>\n        <circle\n            [attr.cx]=\"circle.drawPoint.x\"\n            [attr.cy]=\"circle.drawPoint.y\"\n            [attr.r]=\"engineFacade.heightAndWidth / 18\"\n            [attr.stroke]=\"circle.drawPoint.color\"\n            *ngFor=\"let circle of engineFacade.drawProvider.circles$ | async\"\n            fill-opacity=\"0.0\"\n            stroke-width=\"2\"\n        ></circle>\n    </svg>\n    <app-piece-promotion-modal #modal\n                               [pieceIconInput]=\"engineFacade.pieceIconManager.pieceIconInput\"\n                               [color]=\"engineFacade.board.getCurrentPlayerColor() ? 'white' : 'black'\"></app-piece-promotion-modal>\n</div>\n", styles: ["@charset \"UTF-8\";#board{font-family:Courier New,serif;position:relative}.board-row{display:block;width:100%;height:12.5%;position:relative}.board-col{position:relative;display:inline-block;width:12.5%;vertical-align:top;cursor:default;height:100%}.piece{height:100%;cursor:-webkit-grab;cursor:grab;width:100%;-moz-user-select:none;user-select:none;-webkit-user-select:none;background-size:cover;justify-content:center;text-align:center;color:#000!important;box-sizing:border-box}.piece:after{content:\"\\200b\";box-sizing:border-box}#drag{height:100%;width:100%}.possible-point{background:radial-gradient(#13262F 15%,transparent 20%)}.possible-point:hover,.possible-capture:hover{opacity:.4}.possible-capture{background:radial-gradient(transparent 0%,transparent 80%,#13262F 80%);opacity:.5;box-sizing:border-box;margin:0;padding:0}.king-check{background:radial-gradient(ellipse at center,red 0%,#e70000 25%,rgba(169,0,0,0) 89%,rgba(158,0,0,0) 100%)}.current-selection{background-color:#72620b!important}.yCoord{position:absolute;-moz-user-select:none;user-select:none;-webkit-user-select:none;cursor:pointer;right:.2em;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.xCoord{position:absolute;-moz-user-select:none;user-select:none;-webkit-user-select:none;cursor:pointer;left:.2em;bottom:0;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.hovering{background-color:red!important}.arrow{stroke-width:2}svg{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111)}:host{display:inline-block!important}.single-piece{position:absolute;z-index:999;justify-content:center;text-align:center;-moz-user-select:none;user-select:none;-webkit-user-select:none;color:#000!important;cursor:-webkit-grab;cursor:grab;background-size:cover}.single-piece:after{content:\"\\200b\";box-sizing:border-box}.cdk-drag:not(.cdk-drag-dragging){transition:transform .2s cubic-bezier(0,.3,.14,.49)}\n"] }]
    }], function () { return [{ type: i1.NgxChessBoardService }]; }, { darkTileColor: [{
            type: Input
        }], lightTileColor: [{
            type: Input
        }], showCoords: [{
            type: Input
        }], sourcePointColor: [{
            type: Input
        }], destinationPointColor: [{
            type: Input
        }], legalMovesPointColor: [{
            type: Input
        }], showLastMove: [{
            type: Input
        }], showLegalMoves: [{
            type: Input
        }], showActivePiece: [{
            type: Input
        }], showPossibleCaptures: [{
            type: Input
        }], moveChange: [{
            type: Output
        }], checkmate: [{
            type: Output
        }], stalemate: [{
            type: Output
        }], boardRef: [{
            type: ViewChild,
            args: ['boardRef']
        }], modal: [{
            type: ViewChild,
            args: ['modal']
        }], size: [{
            type: Input,
            args: ['size']
        }], freeMode: [{
            type: Input,
            args: ['freeMode']
        }], dragDisabled: [{
            type: Input,
            args: ['dragDisabled']
        }], drawDisabled: [{
            type: Input,
            args: ['drawDisabled']
        }], pieceIcons: [{
            type: Input,
            args: ['pieceIcons']
        }], lightDisabled: [{
            type: Input,
            args: ['lightDisabled']
        }], darkDisabled: [{
            type: Input,
            args: ['darkDisabled']
        }], onRightClick: [{
            type: HostListener,
            args: ['contextmenu', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoZXNzLWJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL25neC1jaGVzcy1ib2FyZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY2hlc3MtYm9hcmQvc3JjL2xpYi9uZ3gtY2hlc3MtYm9hcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUVILFNBQVMsRUFFVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFDSCx3QkFBd0IsRUFBRSxZQUFZLEdBQ3pDLE1BQU0sMkZBQTJGLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLdkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7O0lDbkJ0QywrQkFjQztJQVpHLHFMQUFnQix3QkFBaUIsSUFBQyx5S0FDbEIseUJBQWlCLElBREMsNktBRWhCLHlCQUFpQixJQUZEO0lBYXRDLGlCQUFNOzs7O0lBUkYsZ0pBQW1ILHVDQUFBLDRDQUFBLGtDQUFBLG1DQUFBO0lBTm5ILGtFQUE2QyxxSEFBQSw4R0FBQTs7O0lBNkJ6QyxnQ0FLQztJQUNHLFlBQ0o7SUFBQSxpQkFBTzs7OztJQUxILHlGQUE4RCwwQ0FBQTtJQUk5RCxlQUNKO0lBREksMkVBQ0o7OztJQUNBLGdDQUtDO0lBQ0csWUFDSjtJQUFBLGlCQUFPOzs7O0lBTEgseUZBQThELDBDQUFBO0lBSTlELGVBQ0o7SUFESSwyRUFDSjs7O0lBQ0EsK0JB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QUFJO2tCQURkLEtBQUs7bUJBQUMsTUFBTTtZQWdCRixRQUFRO2tCQURsQixLQUFLO21CQUFDLFVBQVU7WUFNTixZQUFZO2tCQUR0QixLQUFLO21CQUFDLGNBQWM7WUFNVixZQUFZO2tCQUR0QixLQUFLO21CQUFDLGNBQWM7WUFNVixVQUFVO2tCQURwQixLQUFLO21CQUFDLFlBQVk7WUFNUixhQUFhO2tCQUR2QixLQUFLO21CQUFDLGVBQWU7WUFNWCxZQUFZO2tCQUR0QixLQUFLO21CQUFDLGNBQWM7WUFNckIsWUFBWTtrQkFEWCxZQUFZO21CQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWdFbmQsIENka0RyYWdNb3ZlLCBDZGtEcmFnU3RhcnQgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RW5naW5lRmFjYWRlIH0gZnJvbSAnLi9lbmdpbmUvYWJzdHJhY3QtZW5naW5lLWZhY2FkZSc7XG5pbXBvcnQgeyBCb2FyZExvYWRlciB9IGZyb20gJy4vZW5naW5lL2JvYXJkLXN0YXRlLXByb3ZpZGVyL2JvYXJkLWxvYWRlci9ib2FyZC1sb2FkZXInO1xuaW1wb3J0IHtcbiAgICBOb3RhdGlvblByb2Nlc3NvckZhY3RvcnksIE5vdGF0aW9uVHlwZSxcbn0gZnJvbSAnLi9lbmdpbmUvYm9hcmQtc3RhdGUtcHJvdmlkZXIvYm9hcmQtbG9hZGVyL25vdGF0aW9uLXByb2Nlc3NvcnMvbm90YXRpb24tcHJvY2Vzc29yLWZhY3RvcnknO1xuaW1wb3J0IHsgQ2xpY2tVdGlscyB9IGZyb20gJy4vZW5naW5lL2NsaWNrL2NsaWNrLXV0aWxzJztcbmltcG9ydCB7IEVuZ2luZUZhY2FkZSB9IGZyb20gJy4vZW5naW5lL2VuZ2luZS1mYWNhZGUnO1xuaW1wb3J0IHsgTW92ZUNoYW5nZSB9IGZyb20gJy4vZW5naW5lL291dHB1dHMvbW92ZS1jaGFuZ2UvbW92ZS1jaGFuZ2UnO1xuaW1wb3J0IHsgSGlzdG9yeU1vdmUgfSBmcm9tICcuL2hpc3RvcnktbW92ZS1wcm92aWRlci9oaXN0b3J5LW1vdmUnO1xuaW1wb3J0IHsgQm9hcmQgfSBmcm9tICcuL21vZGVscy9ib2FyZCc7XG5pbXBvcnQgeyBQaWVjZSB9IGZyb20gJy4vbW9kZWxzL3BpZWNlcy9waWVjZSc7XG5pbXBvcnQgeyBOZ3hDaGVzc0JvYXJkVmlldyB9IGZyb20gJy4vbmd4LWNoZXNzLWJvYXJkLXZpZXcnO1xuaW1wb3J0IHsgUGllY2VQcm9tb3Rpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4vcGllY2UtcHJvbW90aW9uL3BpZWNlLXByb21vdGlvbi1tb2RhbC9waWVjZS1wcm9tb3Rpb24tbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5neENoZXNzQm9hcmRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlL25neC1jaGVzcy1ib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFBpZWNlSWNvbklucHV0IH0gZnJvbSAnLi91dGlscy9pbnB1dHMvcGllY2UtaWNvbi1pbnB1dCc7XG5pbXBvcnQgeyBQaWVjZUljb25JbnB1dE1hbmFnZXIgfSBmcm9tICcuL3V0aWxzL2lucHV0cy9waWVjZS1pY29uLWlucHV0LW1hbmFnZXInO1xuaW1wb3J0IHsgQ29sb3JJbnB1dCwgUGllY2VUeXBlSW5wdXQgfSBmcm9tICcuL3V0aWxzL2lucHV0cy9waWVjZS10eXBlLWlucHV0JztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25neC1jaGVzcy1ib2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1jaGVzcy1ib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmd4LWNoZXNzLWJvYXJkLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5neENoZXNzQm9hcmRDb21wb25lbnRcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBOZ3hDaGVzc0JvYXJkVmlldywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBkYXJrVGlsZUNvbG9yID0gQ29uc3RhbnRzLkRFRkFVTFRfREFSS19USUxFX0NPTE9SO1xuICAgIEBJbnB1dCgpIGxpZ2h0VGlsZUNvbG9yOiBzdHJpbmcgPSBDb25zdGFudHMuREVGQVVMVF9MSUdIVF9USUxFX0NPTE9SO1xuICAgIEBJbnB1dCgpIHNob3dDb29yZHMgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNvdXJjZVBvaW50Q29sb3I6IHN0cmluZyA9IENvbnN0YW50cy5ERUZBVUxUX1NPVVJDRV9QT0lOVF9DT0xPUjtcbiAgICBASW5wdXQoKSBkZXN0aW5hdGlvblBvaW50Q29sb3I6IHN0cmluZyA9IENvbnN0YW50cy5ERUZBVUxUX0RFU1RJTkFUSU9OX1BPSU5UX0NPTE9SO1xuICAgIEBJbnB1dCgpIGxlZ2FsTW92ZXNQb2ludENvbG9yOiBzdHJpbmcgPSBDb25zdGFudHMuREVGQVVMVF9MRUdBTF9NT1ZFX1BPSU5UX0NPTE9SO1xuICAgIEBJbnB1dCgpIHNob3dMYXN0TW92ZSA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd0xlZ2FsTW92ZXMgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dBY3RpdmVQaWVjZSA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd1Bvc3NpYmxlQ2FwdHVyZXMgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEVuYWJsaW5nIGZyZWUgbW9kZSByZW1vdmVzIHR1cm4tYmFzZWQgcmVzdHJpY3Rpb24gYW5kIGFsbG93cyB0byBtb3ZlIGFueSBwaWVjZSBmcmVlbHkhXG4gICAgICovXG4gICAgQE91dHB1dCgpIG1vdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdmVDaGFuZ2U+KCk7XG4gICAgQE91dHB1dCgpIGNoZWNrbWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgc3RhbGVtYXRlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnYm9hcmRSZWYnKVxuICAgIGJvYXJkUmVmOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ21vZGFsJylcbiAgICBtb2RhbDogUGllY2VQcm9tb3Rpb25Nb2RhbENvbXBvbmVudDtcblxuICAgIHBpZWNlU2l6ZTogbnVtYmVyO1xuICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgYm9hcmRMb2FkZXI6IEJvYXJkTG9hZGVyO1xuICAgIHBpZWNlSWNvbk1hbmFnZXI6IFBpZWNlSWNvbklucHV0TWFuYWdlcjtcbiAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgc3RhcnRUcmFuc2l0aW9uID0gJyc7XG5cbiAgICBlbmdpbmVGYWNhZGU6IEFic3RyYWN0RW5naW5lRmFjYWRlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ3hDaGVzc0JvYXJkU2VydmljZTogTmd4Q2hlc3NCb2FyZFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUgPSBuZXcgRW5naW5lRmFjYWRlKFxuICAgICAgICAgICAgbmV3IEJvYXJkKCksXG4gICAgICAgICAgICB0aGlzLm1vdmVDaGFuZ2VcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ3NpemUnKVxuICAgIHB1YmxpYyBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgc2l6ZSAmJlxuICAgICAgICAgICAgc2l6ZSA+PSBDb25zdGFudHMuTUlOX0JPQVJEX1NJWkUgJiZcbiAgICAgICAgICAgIHNpemUgPD0gQ29uc3RhbnRzLk1BWF9CT0FSRF9TSVpFXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuaGVpZ2h0QW5kV2lkdGggPSBzaXplO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuaGVpZ2h0QW5kV2lkdGggPSBDb25zdGFudHMuREVGQVVMVF9TSVpFO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmRyYXdQcm92aWRlci5jbGVhcigpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVBpZWNlU2l6ZSgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgnZnJlZU1vZGUnKVxuICAgIHB1YmxpYyBzZXQgZnJlZU1vZGUoZnJlZU1vZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuZnJlZU1vZGUgPSBmcmVlTW9kZTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ2RyYWdEaXNhYmxlZCcpXG4gICAgcHVibGljIHNldCBkcmFnRGlzYWJsZWQoZHJhZ0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmRyYWdEaXNhYmxlZCA9IGRyYWdEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBASW5wdXQoJ2RyYXdEaXNhYmxlZCcpXG4gICAgcHVibGljIHNldCBkcmF3RGlzYWJsZWQoZHJhd0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmRyYXdEaXNhYmxlZCA9IGRyYXdEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBASW5wdXQoJ3BpZWNlSWNvbnMnKVxuICAgIHB1YmxpYyBzZXQgcGllY2VJY29ucyhwaWVjZUljb25zOiBQaWVjZUljb25JbnB1dCkge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5waWVjZUljb25NYW5hZ2VyLnBpZWNlSWNvbklucHV0ID0gcGllY2VJY29ucztcbiAgICB9XG5cbiAgICBASW5wdXQoJ2xpZ2h0RGlzYWJsZWQnKVxuICAgIHB1YmxpYyBzZXQgbGlnaHREaXNhYmxlZChsaWdodERpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmxpZ2h0RGlzYWJsZWQgPSBsaWdodERpc2FibGVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgnZGFya0Rpc2FibGVkJylcbiAgICBwdWJsaWMgc2V0IGRhcmtEaXNhYmxlZChkYXJrRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuZGFya0Rpc2FibGVkID0gZGFya0Rpc2FibGVkO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgICBvblJpZ2h0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIChjaGFuZ2VzLmxpZ2h0RGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0RGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIpIHx8XG4gICAgICAgICAgICAoY2hhbmdlcy5kYXJrRGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhcmtEaXNhYmxlZCAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5jdXJyZW50V2hpdGVQbGF5ZXIpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVNb3ZlcyA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubmd4Q2hlc3NCb2FyZFNlcnZpY2UuY29tcG9uZW50TWV0aG9kQ2FsbGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUucmVzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLm1vZGFsID0gdGhpcy5tb2RhbDtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVQaWVjZVNpemUoKTtcbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUub25Nb3VzZVVwKFxuICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICB0aGlzLmdldENsaWNrUG9pbnQoZXZlbnQpLFxuICAgICAgICAgICAgdGhpcy5ib2FyZFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgICAgICB0aGlzLmJvYXJkUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV2ZXJzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5yZXZlcnNlKCk7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmNvb3Jkcy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQm9hcmQoYm9hcmQ6IEJvYXJkKSB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMuYm9hcmRMb2FkZXIuc2V0RW5naW5lRmFjYWRlKHRoaXMuZW5naW5lRmFjYWRlKTtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IFtdO1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5wb3NzaWJsZU1vdmVzID0gW107XG4gICAgfVxuXG4gICAgc2V0RkVOKGZlbjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZExvYWRlci5zZXROb3RhdGlvblByb2Nlc3NvcihcbiAgICAgICAgICAgICAgICBOb3RhdGlvblByb2Nlc3NvckZhY3RvcnkuZ2V0UHJvY2Vzc29yKE5vdGF0aW9uVHlwZS5GRU4pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmRMb2FkZXIubG9hZEZFTihmZW4pO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVNb3ZlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuY29vcmRzLnJlc2V0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmRMb2FkZXIuYWRkUGllY2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQR04ocGduOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLnBnblByb2Nlc3Nvci5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmRMb2FkZXIuc2V0Tm90YXRpb25Qcm9jZXNzb3IoXG4gICAgICAgICAgICAgICAgTm90YXRpb25Qcm9jZXNzb3JGYWN0b3J5LmdldFByb2Nlc3NvcihOb3RhdGlvblR5cGUuUEdOKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkTG9hZGVyLmxvYWRQR04ocGduKTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkLnBvc3NpYmxlQ2FwdHVyZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkLnBvc3NpYmxlTW92ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmNvb3Jkcy5yZXNldCgpO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV4Y2VwdGlvbik7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZExvYWRlci5hZGRQaWVjZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZFTigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQuZmVuO1xuICAgIH1cblxuICAgIGRyYWdFbmRlZChldmVudDogQ2RrRHJhZ0VuZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuZHJhZ0VuZFN0cmF0ZWd5LnByb2Nlc3MoXG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLm1vdmVEb25lLFxuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zaXRpb25cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZlbnQ6IENka0RyYWdTdGFydCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgdHJhbnMgPSBldmVudC5zb3VyY2UuZ2V0Um9vdEVsZW1lbnQoKS5zdHlsZS50cmFuc2Zvcm0uc3BsaXQoJykgJyk7XG4gICAgICAgIC8vICAgdGhpcy5zdGFydFRyYW5zPSB0cmFucztcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zaXRpb24gPSB0cmFucy5sZW5ndGggPT09IDIgPyB0cmFuc1sxXSA6IHRyYW5zWzBdO1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5kcmFnU3RhcnRTdHJhdGVneS5wcm9jZXNzKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5vbk1vdXNlRG93bihldmVudCwgdGhpcy5nZXRDbGlja1BvaW50KGV2ZW50KSxcbiAgICAgICAgICAgIHRoaXMuYm9hcmRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxuICAgICAgICAgICAgdGhpcy5ib2FyZFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENsaWNrUG9pbnQoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIENsaWNrVXRpbHMuZ2V0Q2xpY2tQb2ludChcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgdGhpcy5ib2FyZFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCxcbiAgICAgICAgICAgIHRoaXMuYm9hcmRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQsXG4gICAgICAgICAgICB0aGlzLmJvYXJkUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgICAgIHRoaXMuYm9hcmRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FsY3VsYXRlUGllY2VTaXplKCkge1xuICAgICAgICB0aGlzLnBpZWNlU2l6ZSA9IHRoaXMuZW5naW5lRmFjYWRlLmhlaWdodEFuZFdpZHRoIC8gODtcbiAgICB9XG5cblxuICAgIGdldEN1c3RvbVBpZWNlSWNvbnMocGllY2U6IFBpZWNlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICAgICAgYHsgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IFwidXJsKCcke3RoaXMuZW5naW5lRmFjYWRlLnBpZWNlSWNvbk1hbmFnZXIuZ2V0UGllY2VJY29uKFxuICAgICAgICAgICAgICAgIHBpZWNlXG4gICAgICAgICAgICApfScpXCJ9YFxuICAgICAgICApO1xuICAgIH1cblxuICAgIG1vdmUoY29vcmRzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUubW92ZShjb29yZHMpO1xuICAgIH1cblxuICAgIGdldE1vdmVIaXN0b3J5KCk6IEhpc3RvcnlNb3ZlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmVGYWNhZGUuZ2V0TW92ZUhpc3RvcnkoKTtcbiAgICB9XG5cbiAgICByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUucmVzZXQoKTtcbiAgICB9XG5cbiAgICB1bmRvKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS51bmRvKCk7XG4gICAgfVxuXG4gICAgYWRkUGllY2UoXG4gICAgICAgIHBpZWNlVHlwZUlucHV0OiBQaWVjZVR5cGVJbnB1dCxcbiAgICAgICAgY29sb3JJbnB1dDogQ29sb3JJbnB1dCxcbiAgICAgICAgY29vcmRzOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYWRkUGllY2UocGllY2VUeXBlSW5wdXQsIGNvbG9ySW5wdXQsIGNvb3Jkcyk7XG4gICAgfVxuXG4gICAgZ2V0UEdOKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmVGYWNhZGUucGduUHJvY2Vzc29yLmdldFBHTigpO1xuICAgIH1cblxuICAgIGRyYWdNb3ZlZCgkZXZlbnQ6IENka0RyYWdNb3ZlPGFueT4pIHtcbiAgICAgICAgbGV0IHggPSAoJGV2ZW50LnBvaW50ZXJQb3NpdGlvbi54IC0gJGV2ZW50LnNvdXJjZS5nZXRSb290RWxlbWVudCgpLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCkgLSAodGhpcy5waWVjZVNpemUgLyAyKTtcbiAgICAgICAgbGV0IHkgPSAoJGV2ZW50LnBvaW50ZXJQb3NpdGlvbi55IC0gJGV2ZW50LnNvdXJjZS5nZXRSb290RWxlbWVudCgpLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKSAtICh0aGlzLnBpZWNlU2l6ZSAvIDIpO1xuICAgICAgICAkZXZlbnQuc291cmNlLmdldFJvb3RFbGVtZW50KCkuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnXG4gICAgICAgICAgICArICh5KSArICdweCwwcHgpJztcbiAgICB9XG5cbiAgICBnZXRUaWxlQmFja2dyb3VuZENvbG9yKGksIGopOiBzdHJpbmcge1xuICAgICAgICBsZXQgY29sb3IgPSAoKGkgKyBqKSAlIDIgPT09IDApID8gdGhpcy5saWdodFRpbGVDb2xvciA6IHRoaXMuZGFya1RpbGVDb2xvcjtcblxuICAgICAgICBpZiAodGhpcy5zaG93TGFzdE1vdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5pc1hZSW5Tb3VyY2VNb3ZlKGksIGopKSB7XG4gICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLnNvdXJjZVBvaW50Q29sb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5pc1hZSW5EZXN0TW92ZShpLCBqKSkge1xuICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5kZXN0aW5hdGlvblBvaW50Q29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxufVxuIiwiPGRpdlxuICAgIGlkPVwiYm9hcmRcIlxuICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiZW5naW5lRmFjYWRlLmhlaWdodEFuZFdpZHRoXCJcbiAgICBbc3R5bGUud2lkdGgucHhdPVwiZW5naW5lRmFjYWRlLmhlaWdodEFuZFdpZHRoXCJcbiAgICAocG9pbnRlcmRvd24pPVwiIW1vZGFsLm9wZW5lZCAmJiBvbk1vdXNlRG93bigkZXZlbnQpXCJcbiAgICAocG9pbnRlcnVwKT1cIiFtb2RhbC5vcGVuZWQgJiYgb25Nb3VzZVVwKCRldmVudClcIlxuICAgICNib2FyZFJlZlxuPlxuICAgIDxkaXYgaWQ9XCJkcmFnXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIFtjZGtEcmFnRGlzYWJsZWRdPVwiZW5naW5lRmFjYWRlLmRyYWdEaXNhYmxlZFwiXG4gICAgICAgICAgICAoY2RrRHJhZ0VuZGVkKT1cImRyYWdFbmRlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjZGtEcmFnTW92ZWQpPVwiZHJhZ01vdmVkKCRldmVudClcIlxuICAgICAgICAgICAgKGNka0RyYWdTdGFydGVkKT1cImRyYWdTdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgIGNsYXNzPVwic2luZ2xlLXBpZWNlXCIgW2lubmVySFRNTF09XCJlbmdpbmVGYWNhZGUucGllY2VJY29uTWFuYWdlci5pc0RlZmF1bHRJY29ucygpID8gcGllY2UuY29uc3RhbnQuaWNvbiA6ICcnXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImVuZ2luZUZhY2FkZS5waWVjZUljb25NYW5hZ2VyLmlzRGVmYXVsdEljb25zKCkgPyAnJyA6IGdldEN1c3RvbVBpZWNlSWNvbnMocGllY2UpXCJcbiAgICAgICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwiJ3RyYW5zbGF0ZTNkKCcgKyBwaWVjZS5wb2ludC5jb2wgKiBwaWVjZVNpemUgKyAncHgsICcgKyBwaWVjZS5wb2ludC5yb3cgKiBwaWVjZVNpemUgKyAncHgsMHB4KSdcIlxuICAgICAgICAgICAgW3N0eWxlLm1heC1oZWlnaHRdPVwicGllY2VTaXplICsgJ3B4J1wiXG4gICAgICAgICAgICBbc3R5bGUuZm9udC1zaXplXT1cInBpZWNlU2l6ZSAqIDAuOCArICdweCdcIlxuICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cInBpZWNlU2l6ZSArICdweCdcIlxuICAgICAgICAgICAgW3N0eWxlLmhlaWdodF09XCJwaWVjZVNpemUgKyAncHgnXCJcbiAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBwaWVjZSBvZiBlbmdpbmVGYWNhZGUuYm9hcmQucGllY2VzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJib2FyZC1yb3dcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHJvdyBvZiBlbmdpbmVGYWNhZGUuYm9hcmQuYm9hcmQ7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJib2FyZC1jb2xcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5jdXJyZW50LXNlbGVjdGlvbl09XCJzaG93QWN0aXZlUGllY2UgJiYgZW5naW5lRmFjYWRlLmJvYXJkLmlzWFlJbkFjdGl2ZU1vdmUoaSxqKVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLmtpbmctY2hlY2tdPVwiIGVuZ2luZUZhY2FkZS5ib2FyZC5pc0tpbmdDaGVja2VkKGVuZ2luZUZhY2FkZS5ib2FyZC5nZXRQaWVjZUJ5UG9pbnQoaSxqKSlcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5wb2ludC1jaXJjbGVdPVwiZW5naW5lRmFjYWRlLmJvYXJkLmlzWFlJblBvaW50U2VsZWN0aW9uKGksIGopXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MucG9zc2libGUtY2FwdHVyZV09XCJzaG93UG9zc2libGVDYXB0dXJlcyAmJiBlbmdpbmVGYWNhZGUuYm9hcmQuaXNYWUluUG9zc2libGVDYXB0dXJlcyhpLCBqKVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLnBvc3NpYmxlLXBvaW50XT1cImVuZ2luZUZhY2FkZS5ib2FyZC5pc1hZSW5Qb3NzaWJsZU1vdmVzKGksIGopICYmIHNob3dMZWdhbE1vdmVzXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJnZXRUaWxlQmFja2dyb3VuZENvbG9yKGksIGopXCJcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sIG9mIHJvdzsgbGV0IGogPSBpbmRleFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ5Q29vcmRcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwiKGkgJSAyID09PSAwKSA/IGxpZ2h0VGlsZUNvbG9yIDogZGFya1RpbGVDb2xvclwiXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mb250LXNpemUucHhdPVwicGllY2VTaXplIC8gNFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0Nvb3JkcyAmJiBqID09PSA3XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt7ZW5naW5lRmFjYWRlLmNvb3Jkcy55Q29vcmRzW2ldfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ4Q29vcmRcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwiKGogJSAyID09PSAwKSA/IGxpZ2h0VGlsZUNvbG9yIDogZGFya1RpbGVDb2xvclwiXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mb250LXNpemUucHhdPVwicGllY2VTaXplIC8gNFwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0Nvb3JkcyAmJiBpID09PSA3XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHt7ZW5naW5lRmFjYWRlLmNvb3Jkcy54Q29vcmRzW2pdfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImVuZ2luZUZhY2FkZS5ib2FyZC5nZXRQaWVjZUJ5UG9pbnQoaSwgaikgYXMgcGllY2VcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImhlaWdodDoxMDAlOyB3aWR0aDoxMDAlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIidwaWVjZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZV09XCJwaWVjZVNpemUgKyAncHgnXCJcblxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxzdmdcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImVuZ2luZUZhY2FkZS5oZWlnaHRBbmRXaWR0aFwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cImVuZ2luZUZhY2FkZS5oZWlnaHRBbmRXaWR0aFwiXG4gICAgICAgIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGU7IHRvcDowOyBwb2ludGVyLWV2ZW50czogbm9uZVwiXG4gICAgPlxuICAgICAgICA8ZGVmcyAqbmdGb3I9XCJsZXQgY29sb3Igb2YgWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdvcmFuZ2UnXVwiPlxuICAgICAgICAgICAgPG1hcmtlclxuICAgICAgICAgICAgICAgIFtpZF09XCJjb2xvciArICdBcnJvdydcIlxuICAgICAgICAgICAgICAgIG1hcmtlckhlaWdodD1cIjEzXCJcbiAgICAgICAgICAgICAgICBtYXJrZXJXaWR0aD1cIjEzXCJcbiAgICAgICAgICAgICAgICBvcmllbnQ9XCJhdXRvXCJcbiAgICAgICAgICAgICAgICByZWZYPVwiOVwiXG4gICAgICAgICAgICAgICAgcmVmWT1cIjZcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS5maWxsXT1cImNvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk0yLDIgTDIsMTEgTDEwLDYgTDIsMlwiXG4gICAgICAgICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgICAgIDwvbWFya2VyPlxuICAgICAgICA8L2RlZnM+XG4gICAgICAgIDxsaW5lXG4gICAgICAgICAgICBjbGFzcz1cImFycm93XCJcbiAgICAgICAgICAgIFthdHRyLm1hcmtlci1lbmRdPVwiJ3VybCgjJyArIGFycm93LmVuZC5jb2xvciArICdBcnJvdyknXCJcbiAgICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJhcnJvdy5lbmQuY29sb3JcIlxuICAgICAgICAgICAgW2F0dHIueDFdPVwiYXJyb3cuc3RhcnQueFwiXG4gICAgICAgICAgICBbYXR0ci54Ml09XCJhcnJvdy5lbmQueFwiXG4gICAgICAgICAgICBbYXR0ci55MV09XCJhcnJvdy5zdGFydC55XCJcbiAgICAgICAgICAgIFthdHRyLnkyXT1cImFycm93LmVuZC55XCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBhcnJvdyBvZiBlbmdpbmVGYWNhZGUuZHJhd1Byb3ZpZGVyLmFycm93cyQgfCBhc3luY1wiXG4gICAgICAgID48L2xpbmU+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgIFthdHRyLmN4XT1cImNpcmNsZS5kcmF3UG9pbnQueFwiXG4gICAgICAgICAgICBbYXR0ci5jeV09XCJjaXJjbGUuZHJhd1BvaW50LnlcIlxuICAgICAgICAgICAgW2F0dHIucl09XCJlbmdpbmVGYWNhZGUuaGVpZ2h0QW5kV2lkdGggLyAxOFwiXG4gICAgICAgICAgICBbYXR0ci5zdHJva2VdPVwiY2lyY2xlLmRyYXdQb2ludC5jb2xvclwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgY2lyY2xlIG9mIGVuZ2luZUZhY2FkZS5kcmF3UHJvdmlkZXIuY2lyY2xlcyQgfCBhc3luY1wiXG4gICAgICAgICAgICBmaWxsLW9wYWNpdHk9XCIwLjBcIlxuICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMlwiXG4gICAgICAgID48L2NpcmNsZT5cbiAgICA8L3N2Zz5cbiAgICA8YXBwLXBpZWNlLXByb21vdGlvbi1tb2RhbCAjbW9kYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGllY2VJY29uSW5wdXRdPVwiZW5naW5lRmFjYWRlLnBpZWNlSWNvbk1hbmFnZXIucGllY2VJY29uSW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjb2xvcl09XCJlbmdpbmVGYWNhZGUuYm9hcmQuZ2V0Q3VycmVudFBsYXllckNvbG9yKCkgPyAnd2hpdGUnIDogJ2JsYWNrJ1wiPjwvYXBwLXBpZWNlLXByb21vdGlvbi1tb2RhbD5cbjwvZGl2PlxuIl19