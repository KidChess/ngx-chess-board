import { DragDropModule, } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { NotationProcessorFactory, NotationType, } from './engine/board-state-provider/board-loader/notation-processors/notation-processor-factory';
import { ClickUtils } from './engine/click/click-utils';
import { EngineFacade } from './engine/engine-facade';
import { Board } from './models/board';
import { PiecePromotionModalComponent } from './piece-promotion/piece-promotion-modal/piece-promotion-modal.component';
import { Constants } from './utils/constants';
import * as i0 from "@angular/core";
import * as i1 from "./service/ngx-chess-board.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/drag-drop";
const _c0 = ["boardRef"];
const _c1 = ["modal"];
const _c2 = () => ["red", "green", "blue", "orange"];
function NgxChessBoardComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵlistener("cdkDragEnded", function NgxChessBoardComponent_div_3_Template_div_cdkDragEnded_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.dragEnded($event)); })("cdkDragMoved", function NgxChessBoardComponent_div_3_Template_div_cdkDragMoved_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.dragMoved($event)); })("cdkDragStarted", function NgxChessBoardComponent_div_3_Template_div_cdkDragStarted_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.dragStart($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const piece_r5 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("transform", "translate3d(" + piece_r5.point.col * ctx_r3.pieceSize + "px, " + piece_r5.point.row * ctx_r3.pieceSize + "px,0px)")("max-height", ctx_r3.pieceSize + "px")("font-size", ctx_r3.pieceSize * 0.8 + "px")("width", ctx_r3.pieceSize + "px")("height", ctx_r3.pieceSize + "px");
    i0.ɵɵproperty("cdkDragDisabled", ctx_r3.engineFacade.dragDisabled)("innerHTML", ctx_r3.engineFacade.pieceIconManager.isDefaultIcons() ? piece_r5.constant.icon : "", i0.ɵɵsanitizeHtml)("ngStyle", ctx_r3.engineFacade.pieceIconManager.isDefaultIcons() ? "" : ctx_r3.getCustomPieceIcons(piece_r5));
} }
function NgxChessBoardComponent_div_4_div_1_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r6 = i0.ɵɵnextContext(2).index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("color", i_r6 % 2 === 0 ? ctx_r3.lightTileColor : ctx_r3.darkTileColor)("font-size", ctx_r3.pieceSize / 4, "px");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.engineFacade.coords.yCoords[i_r6], " ");
} }
function NgxChessBoardComponent_div_4_div_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const j_r7 = i0.ɵɵnextContext().index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("color", j_r7 % 2 === 0 ? ctx_r3.lightTileColor : ctx_r3.darkTileColor)("font-size", ctx_r3.pieceSize / 4, "px");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.engineFacade.coords.xCoords[j_r7], " ");
} }
function NgxChessBoardComponent_div_4_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "div", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("font-size", ctx_r3.pieceSize + "px");
    i0.ɵɵproperty("ngClass", "piece");
} }
function NgxChessBoardComponent_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, NgxChessBoardComponent_div_4_div_1_span_1_Template, 2, 5, "span", 15)(2, NgxChessBoardComponent_div_4_div_1_span_2_Template, 2, 5, "span", 16)(3, NgxChessBoardComponent_div_4_div_1_div_3_Template, 2, 3, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const j_r7 = ctx.index;
    const i_r6 = i0.ɵɵnextContext().index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background-color", ctx_r3.getTileBackgroundColor(i_r6, j_r7));
    i0.ɵɵclassProp("current-selection", ctx_r3.showActivePiece && ctx_r3.engineFacade.board.isXYInActiveMove(i_r6, j_r7))("king-check", ctx_r3.engineFacade.board.isKingChecked(ctx_r3.engineFacade.board.getPieceByPoint(i_r6, j_r7)))("point-circle", ctx_r3.engineFacade.board.isXYInPointSelection(i_r6, j_r7))("possible-capture", ctx_r3.showPossibleCaptures && ctx_r3.engineFacade.board.isXYInPossibleCaptures(i_r6, j_r7))("possible-point", ctx_r3.engineFacade.board.isXYInPossibleMoves(i_r6, j_r7) && ctx_r3.showLegalMoves);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.showCoords && j_r7 === 7);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.showCoords && i_r6 === 7);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.engineFacade.board.getPieceByPoint(i_r6, j_r7));
} }
function NgxChessBoardComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtemplate(1, NgxChessBoardComponent_div_4_div_1_Template, 4, 15, "div", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r8);
} }
function NgxChessBoardComponent__svg_defs_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "defs")(1, "marker", 22);
    i0.ɵɵelement(2, "path", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const color_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", color_r9 + "Arrow");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("fill", color_r9);
} }
function NgxChessBoardComponent__svg_line_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "line", 24);
} if (rf & 2) {
    const arrow_r10 = ctx.$implicit;
    i0.ɵɵattribute("marker-end", "url(#" + arrow_r10.end.color + "Arrow)")("stroke", arrow_r10.end.color)("x1", arrow_r10.start.x)("x2", arrow_r10.end.x)("y1", arrow_r10.start.y)("y2", arrow_r10.end.y);
} }
function NgxChessBoardComponent__svg_circle_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelement(0, "circle", 25);
} if (rf & 2) {
    const circle_r11 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵattribute("cx", circle_r11.drawPoint.x)("cy", circle_r11.drawPoint.y)("r", ctx_r3.engineFacade.heightAndWidth / 18)("stroke", circle_r11.drawPoint.color);
} }
export class NgxChessBoardComponent {
    ngxChessBoardService;
    darkTileColor = Constants.DEFAULT_DARK_TILE_COLOR;
    lightTileColor = Constants.DEFAULT_LIGHT_TILE_COLOR;
    showCoords = true;
    sourcePointColor = Constants.DEFAULT_SOURCE_POINT_COLOR;
    destinationPointColor = Constants.DEFAULT_DESTINATION_POINT_COLOR;
    legalMovesPointColor = Constants.DEFAULT_LEGAL_MOVE_POINT_COLOR;
    showLastMove = true;
    showLegalMoves = true;
    showActivePiece = true;
    showPossibleCaptures = true;
    /**
     * Enabling free mode removes turn-based restriction and allows to move any piece freely!
     */
    moveChange = new EventEmitter();
    checkmate = new EventEmitter();
    stalemate = new EventEmitter();
    boardRef;
    modal;
    pieceSize;
    selected = false;
    boardLoader;
    pieceIconManager;
    isDragging = false;
    startTransition = '';
    engineFacade;
    constructor(ngxChessBoardService) {
        this.ngxChessBoardService = ngxChessBoardService;
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
        let x = $event.pointerPosition.x -
            $event.source.getRootElement().parentElement.getBoundingClientRect()
                .left -
            this.pieceSize / 2;
        let y = $event.pointerPosition.y -
            $event.source.getRootElement().parentElement.getBoundingClientRect()
                .top -
            this.pieceSize / 2;
        $event.source.getRootElement().style.transform =
            'translate3d(' + x + 'px, ' + y + 'px,0px)';
    }
    getTileBackgroundColor(i, j) {
        let color = (i + j) % 2 === 0 ? this.lightTileColor : this.darkTileColor;
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
    static ɵfac = function NgxChessBoardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NgxChessBoardComponent)(i0.ɵɵdirectiveInject(i1.NgxChessBoardService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgxChessBoardComponent, selectors: [["ngx-chess-board"]], viewQuery: function NgxChessBoardComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
            i0.ɵɵviewQuery(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.boardRef = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.modal = _t.first);
        } }, hostBindings: function NgxChessBoardComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("contextmenu", function NgxChessBoardComponent_contextmenu_HostBindingHandler($event) { return ctx.onRightClick($event); });
        } }, inputs: { darkTileColor: "darkTileColor", lightTileColor: "lightTileColor", showCoords: "showCoords", sourcePointColor: "sourcePointColor", destinationPointColor: "destinationPointColor", legalMovesPointColor: "legalMovesPointColor", showLastMove: "showLastMove", showLegalMoves: "showLegalMoves", showActivePiece: "showActivePiece", showPossibleCaptures: "showPossibleCaptures", size: "size", freeMode: "freeMode", dragDisabled: "dragDisabled", drawDisabled: "drawDisabled", pieceIcons: "pieceIcons", lightDisabled: "lightDisabled", darkDisabled: "darkDisabled" }, outputs: { moveChange: "moveChange", checkmate: "checkmate", stalemate: "stalemate" }, standalone: true, features: [i0.ɵɵNgOnChangesFeature, i0.ɵɵStandaloneFeature], decls: 13, vars: 18, consts: [["boardRef", ""], ["modal", ""], ["id", "board", 3, "pointerdown", "pointerup"], ["id", "drag"], ["class", "single-piece", "cdkDrag", "", 3, "cdkDragDisabled", "innerHTML", "ngStyle", "transform", "max-height", "font-size", "width", "height", "cdkDragEnded", "cdkDragMoved", "cdkDragStarted", 4, "ngFor", "ngForOf"], ["class", "board-row", 4, "ngFor", "ngForOf"], [2, "position", "absolute", "top", "0", "pointer-events", "none"], [4, "ngFor", "ngForOf"], ["class", "arrow", 4, "ngFor", "ngForOf"], ["fill-opacity", "0.0", "stroke-width", "2", 4, "ngFor", "ngForOf"], [3, "pieceIconInput", "color"], ["cdkDrag", "", 1, "single-piece", 3, "cdkDragEnded", "cdkDragMoved", "cdkDragStarted", "cdkDragDisabled", "innerHTML", "ngStyle"], [1, "board-row"], ["class", "board-col", 3, "current-selection", "king-check", "point-circle", "possible-capture", "possible-point", "background-color", 4, "ngFor", "ngForOf"], [1, "board-col"], ["class", "yCoord", 3, "color", "font-size", 4, "ngIf"], ["class", "xCoord", 3, "color", "font-size", 4, "ngIf"], ["style", "height:100%; width:100%", 4, "ngIf"], [1, "yCoord"], [1, "xCoord"], [2, "height", "100%", "width", "100%"], [3, "ngClass"], ["markerHeight", "13", "markerWidth", "13", "orient", "auto", "refX", "9", "refY", "6", 3, "id"], ["d", "M2,2 L2,11 L10,6 L2,2"], [1, "arrow"], ["fill-opacity", "0.0", "stroke-width", "2"]], template: function NgxChessBoardComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2, 0);
            i0.ɵɵlistener("pointerdown", function NgxChessBoardComponent_Template_div_pointerdown_0_listener($event) { i0.ɵɵrestoreView(_r1); const modal_r2 = i0.ɵɵreference(12); return i0.ɵɵresetView(!modal_r2.opened && ctx.onMouseDown($event)); })("pointerup", function NgxChessBoardComponent_Template_div_pointerup_0_listener($event) { i0.ɵɵrestoreView(_r1); const modal_r2 = i0.ɵɵreference(12); return i0.ɵɵresetView(!modal_r2.opened && ctx.onMouseUp($event)); });
            i0.ɵɵelementStart(2, "div", 3);
            i0.ɵɵtemplate(3, NgxChessBoardComponent_div_3_Template, 1, 13, "div", 4)(4, NgxChessBoardComponent_div_4_Template, 2, 1, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(5, "svg", 6);
            i0.ɵɵtemplate(6, NgxChessBoardComponent__svg_defs_6_Template, 3, 3, "defs", 7)(7, NgxChessBoardComponent__svg_line_7_Template, 1, 6, "line", 8);
            i0.ɵɵpipe(8, "async");
            i0.ɵɵtemplate(9, NgxChessBoardComponent__svg_circle_9_Template, 1, 4, "circle", 9);
            i0.ɵɵpipe(10, "async");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelement(11, "app-piece-promotion-modal", 10, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵstyleProp("height", ctx.engineFacade.heightAndWidth, "px")("width", ctx.engineFacade.heightAndWidth, "px");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.engineFacade.board.pieces);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.engineFacade.board.board);
            i0.ɵɵadvance();
            i0.ɵɵattribute("height", ctx.engineFacade.heightAndWidth)("width", ctx.engineFacade.heightAndWidth);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(17, _c2));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(8, 13, ctx.engineFacade.drawProvider.arrows$));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(10, 15, ctx.engineFacade.drawProvider.circles$));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("pieceIconInput", ctx.engineFacade.pieceIconManager.pieceIconInput)("color", ctx.engineFacade.board.getCurrentPlayerColor() ? "white" : "black");
        } }, dependencies: [CommonModule, i2.NgClass, i2.NgForOf, i2.NgIf, i2.NgStyle, i2.AsyncPipe, DragDropModule, i3.CdkDrag, PiecePromotionModalComponent], styles: ["@charset \"UTF-8\";#board[_ngcontent-%COMP%]{font-family:Courier New,serif;position:relative}.board-row[_ngcontent-%COMP%]{display:block;width:100%;height:12.5%;position:relative}.board-col[_ngcontent-%COMP%]{position:relative;display:inline-block;width:12.5%;vertical-align:top;cursor:default;height:100%}.piece[_ngcontent-%COMP%]{height:100%;cursor:grab;width:100%;user-select:none;-webkit-user-select:none;background-size:cover;justify-content:center;text-align:center;color:#000!important;box-sizing:border-box}.piece[_ngcontent-%COMP%]:after{content:\"\\200b\";box-sizing:border-box}#drag[_ngcontent-%COMP%]{height:100%;width:100%}.possible-point[_ngcontent-%COMP%]{background:radial-gradient(#13262f 15%,transparent 20%)}.possible-point[_ngcontent-%COMP%]:hover, .possible-capture[_ngcontent-%COMP%]:hover{opacity:.4}.possible-capture[_ngcontent-%COMP%]{background:radial-gradient(transparent 0%,transparent 80%,#13262f 80%);opacity:.5;box-sizing:border-box;margin:0;padding:0}.king-check[_ngcontent-%COMP%]{background:radial-gradient(ellipse at center,red,#e70000 25%,#a9000000 89%,#9e000000)}.current-selection[_ngcontent-%COMP%]{background-color:#72620b!important}.yCoord[_ngcontent-%COMP%]{position:absolute;user-select:none;-webkit-user-select:none;cursor:pointer;right:.2em;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.xCoord[_ngcontent-%COMP%]{position:absolute;user-select:none;-webkit-user-select:none;cursor:pointer;left:.2em;bottom:0;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.hovering[_ngcontent-%COMP%]{background-color:red!important}.arrow[_ngcontent-%COMP%]{stroke-width:2;opacity:0;animation:_ngcontent-%COMP%_fadeInArrow .2s ease-in-out forwards;stroke-width:4.5!important;border-radius:10px!important;stroke-linecap:round!important}@keyframes _ngcontent-%COMP%_fadeInArrow{0%{opacity:0}to{opacity:1}}svg[_ngcontent-%COMP%]{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111);animation:_ngcontent-%COMP%_fadeInShadow .2s ease-in-out forwards}@keyframes _ngcontent-%COMP%_fadeInShadow{0%{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111)}to{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111)}}#board[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{z-index:1000!important;filter:drop-shadow(1px 1px 2px rgba(0,0,0,.2)) drop-shadow(-1px 1px 2px rgba(0,0,0,.2)) drop-shadow(1px -1px 2px rgba(0,0,0,.2)) drop-shadow(-1px -1px 2px rgba(0,0,0,.2))!important}#greenArrow[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], #redArrow[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], #blueArrow[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], #orangeArrow[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{d:path(\"M 4 2.5 L 4 9.5 L 10 6 L 4 2.5 z\")}circle[_ngcontent-%COMP%]{stroke-width:4.5!important}circle[stroke=blue][_ngcontent-%COMP%]{stroke:#6495ed!important}circle[stroke=green][_ngcontent-%COMP%]{stroke:#99c13c!important}circle[stroke=orange][_ngcontent-%COMP%]{stroke:gold!important}line[stroke=blue][_ngcontent-%COMP%]{stroke:#6495ed!important}line[stroke=green][_ngcontent-%COMP%]{stroke:#99c13c!important}line[stroke=orange][_ngcontent-%COMP%]{stroke:gold!important}#blueArrow[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:#6495ed!important}#greenArrow[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:#99c13c!important}#orangeArrow[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:gold!important}[_nghost-%COMP%]{display:inline-block!important}.single-piece[_ngcontent-%COMP%]{position:absolute;z-index:999;justify-content:center;text-align:center;user-select:none;-webkit-user-select:none;color:#000!important;cursor:grab;background-size:cover}.single-piece[_ngcontent-%COMP%]:after{content:\"\\200b\";box-sizing:border-box}.cdk-drag[_ngcontent-%COMP%]:not(.cdk-drag-dragging){transition:transform .2s cubic-bezier(0,.3,.14,.49)}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChessBoardComponent, [{
        type: Component,
        args: [{ selector: 'ngx-chess-board', standalone: true, imports: [CommonModule, DragDropModule, PiecePromotionModalComponent], template: "<div\n    id=\"board\"\n    [style.height.px]=\"engineFacade.heightAndWidth\"\n    [style.width.px]=\"engineFacade.heightAndWidth\"\n    (pointerdown)=\"!modal.opened && onMouseDown($event)\"\n    (pointerup)=\"!modal.opened && onMouseUp($event)\"\n    #boardRef\n>\n    <div id=\"drag\">\n        <div\n            [cdkDragDisabled]=\"engineFacade.dragDisabled\"\n            (cdkDragEnded)=\"dragEnded($event)\"\n            (cdkDragMoved)=\"dragMoved($event)\"\n            (cdkDragStarted)=\"dragStart($event)\"\n            class=\"single-piece\" [innerHTML]=\"engineFacade.pieceIconManager.isDefaultIcons() ? piece.constant.icon : ''\"\n            [ngStyle]=\"engineFacade.pieceIconManager.isDefaultIcons() ? '' : getCustomPieceIcons(piece)\"\n            [style.transform]=\"'translate3d(' + piece.point.col * pieceSize + 'px, ' + piece.point.row * pieceSize + 'px,0px)'\"\n            [style.max-height]=\"pieceSize + 'px'\"\n            [style.font-size]=\"pieceSize * 0.8 + 'px'\"\n            [style.width]=\"pieceSize + 'px'\"\n            [style.height]=\"pieceSize + 'px'\"\n            cdkDrag\n            *ngFor=\"let piece of engineFacade.board.pieces; let i = index\"\n        >\n        </div>\n        <div\n            class=\"board-row\"\n            *ngFor=\"let row of engineFacade.board.board; let i = index\"\n        >\n            <div\n                class=\"board-col\"\n                [class.current-selection]=\"showActivePiece && engineFacade.board.isXYInActiveMove(i,j)\"\n                [class.king-check]=\" engineFacade.board.isKingChecked(engineFacade.board.getPieceByPoint(i,j))\"\n                [class.point-circle]=\"engineFacade.board.isXYInPointSelection(i, j)\"\n                [class.possible-capture]=\"showPossibleCaptures && engineFacade.board.isXYInPossibleCaptures(i, j)\"\n                [class.possible-point]=\"engineFacade.board.isXYInPossibleMoves(i, j) && showLegalMoves\"\n                [style.background-color]=\"getTileBackgroundColor(i, j)\"\n                *ngFor=\"let col of row; let j = index\"\n            >\n                <span\n                    class=\"yCoord\"\n                    [style.color]=\"(i % 2 === 0) ? lightTileColor : darkTileColor\"\n                    [style.font-size.px]=\"pieceSize / 4\"\n                    *ngIf=\"showCoords && j === 7\"\n                >\n                    {{engineFacade.coords.yCoords[i]}}\n                </span>\n                <span\n                    class=\"xCoord\"\n                    [style.color]=\"(j % 2 === 0) ? lightTileColor : darkTileColor\"\n                    [style.font-size.px]=\"pieceSize / 4\"\n                    *ngIf=\"showCoords && i === 7\"\n                >\n                    {{engineFacade.coords.xCoords[j]}}\n                </span>\n                <div\n                    *ngIf=\"engineFacade.board.getPieceByPoint(i, j) as piece\"\n                    style=\"height:100%; width:100%\"\n                >\n                    <div\n                        [ngClass]=\"'piece'\"\n                        [style.font-size]=\"pieceSize + 'px'\"\n\n                    >\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <svg\n        [attr.height]=\"engineFacade.heightAndWidth\"\n        [attr.width]=\"engineFacade.heightAndWidth\"\n        style=\"position:absolute; top:0; pointer-events: none\"\n    >\n        <defs *ngFor=\"let color of ['red', 'green', 'blue', 'orange']\">\n            <marker\n                [id]=\"color + 'Arrow'\"\n                markerHeight=\"13\"\n                markerWidth=\"13\"\n                orient=\"auto\"\n                refX=\"9\"\n                refY=\"6\"\n            >\n                <path\n                    [style.fill]=\"color\"\n                    d=\"M2,2 L2,11 L10,6 L2,2\"\n                ></path>\n            </marker>\n        </defs>\n        <line\n            class=\"arrow\"\n            [attr.marker-end]=\"'url(#' + arrow.end.color + 'Arrow)'\"\n            [attr.stroke]=\"arrow.end.color\"\n            [attr.x1]=\"arrow.start.x\"\n            [attr.x2]=\"arrow.end.x\"\n            [attr.y1]=\"arrow.start.y\"\n            [attr.y2]=\"arrow.end.y\"\n            *ngFor=\"let arrow of engineFacade.drawProvider.arrows$ | async\"\n        ></line>\n        <circle\n            [attr.cx]=\"circle.drawPoint.x\"\n            [attr.cy]=\"circle.drawPoint.y\"\n            [attr.r]=\"engineFacade.heightAndWidth / 18\"\n            [attr.stroke]=\"circle.drawPoint.color\"\n            *ngFor=\"let circle of engineFacade.drawProvider.circles$ | async\"\n            fill-opacity=\"0.0\"\n            stroke-width=\"2\"\n        ></circle>\n    </svg>\n    <app-piece-promotion-modal #modal\n                               [pieceIconInput]=\"engineFacade.pieceIconManager.pieceIconInput\"\n                               [color]=\"engineFacade.board.getCurrentPlayerColor() ? 'white' : 'black'\"></app-piece-promotion-modal>\n</div>\n", styles: ["@charset \"UTF-8\";#board{font-family:Courier New,serif;position:relative}.board-row{display:block;width:100%;height:12.5%;position:relative}.board-col{position:relative;display:inline-block;width:12.5%;vertical-align:top;cursor:default;height:100%}.piece{height:100%;cursor:grab;width:100%;user-select:none;-webkit-user-select:none;background-size:cover;justify-content:center;text-align:center;color:#000!important;box-sizing:border-box}.piece:after{content:\"\\200b\";box-sizing:border-box}#drag{height:100%;width:100%}.possible-point{background:radial-gradient(#13262f 15%,transparent 20%)}.possible-point:hover,.possible-capture:hover{opacity:.4}.possible-capture{background:radial-gradient(transparent 0%,transparent 80%,#13262f 80%);opacity:.5;box-sizing:border-box;margin:0;padding:0}.king-check{background:radial-gradient(ellipse at center,red,#e70000 25%,#a9000000 89%,#9e000000)}.current-selection{background-color:#72620b!important}.yCoord{position:absolute;user-select:none;-webkit-user-select:none;cursor:pointer;right:.2em;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.xCoord{position:absolute;user-select:none;-webkit-user-select:none;cursor:pointer;left:.2em;bottom:0;font-family:Lucida Console,Courier,monospace;box-sizing:border-box}.hovering{background-color:red!important}.arrow{stroke-width:2;opacity:0;animation:fadeInArrow .2s ease-in-out forwards;stroke-width:4.5!important;border-radius:10px!important;stroke-linecap:round!important}@keyframes fadeInArrow{0%{opacity:0}to{opacity:1}}svg{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111);animation:fadeInShadow .2s ease-in-out forwards}@keyframes fadeInShadow{0%{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111)}to{filter:drop-shadow(1px 1px 0px #111) drop-shadow(-1px 1px 0px #111) drop-shadow(1px -1px 0px #111) drop-shadow(-1px -1px 0px #111)}}#board svg{z-index:1000!important;filter:drop-shadow(1px 1px 2px rgba(0,0,0,.2)) drop-shadow(-1px 1px 2px rgba(0,0,0,.2)) drop-shadow(1px -1px 2px rgba(0,0,0,.2)) drop-shadow(-1px -1px 2px rgba(0,0,0,.2))!important}#greenArrow path,#redArrow path,#blueArrow path,#orangeArrow path{d:path(\"M 4 2.5 L 4 9.5 L 10 6 L 4 2.5 z\")}circle{stroke-width:4.5!important}circle[stroke=blue]{stroke:#6495ed!important}circle[stroke=green]{stroke:#99c13c!important}circle[stroke=orange]{stroke:gold!important}line[stroke=blue]{stroke:#6495ed!important}line[stroke=green]{stroke:#99c13c!important}line[stroke=orange]{stroke:gold!important}#blueArrow path{fill:#6495ed!important}#greenArrow path{fill:#99c13c!important}#orangeArrow path{fill:gold!important}:host{display:inline-block!important}.single-piece{position:absolute;z-index:999;justify-content:center;text-align:center;user-select:none;-webkit-user-select:none;color:#000!important;cursor:grab;background-size:cover}.single-piece:after{content:\"\\200b\";box-sizing:border-box}.cdk-drag:not(.cdk-drag-dragging){transition:transform .2s cubic-bezier(0,.3,.14,.49)}\n"] }]
    }], () => [{ type: i1.NgxChessBoardService }], { darkTileColor: [{
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NgxChessBoardComponent, { className: "NgxChessBoardComponent" }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoZXNzLWJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL25neC1jaGVzcy1ib2FyZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY2hlc3MtYm9hcmQvc3JjL2xpYi9uZ3gtY2hlc3MtYm9hcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlILGNBQWMsR0FDakIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVILFNBQVMsRUFFVCxZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFDSCx3QkFBd0IsRUFDeEIsWUFBWSxHQUNmLE1BQU0sMkZBQTJGLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdkMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFFdkgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7O0lDMUJ0QywrQkFjQztJQVZHLEFBREEsQUFEQSxtTUFBZ0Isd0JBQWlCLEtBQUMsc0xBQ2xCLHdCQUFpQixLQUFDLDBMQUNoQix3QkFBaUIsS0FBQztJQVd4QyxpQkFBTTs7OztJQUpGLEFBREEsQUFEQSxBQURBLEFBREEsZ0pBQW1ILHVDQUM5RSw0Q0FDSyxrQ0FDVixtQ0FDQztJQUxqQyxBQURxQixBQUpyQixrRUFBNkMscUhB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NUQsYUFBYTtrQkFBckIsS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0cscUJBQXFCO2tCQUE3QixLQUFLO1lBRUcsb0JBQW9CO2tCQUE1QixLQUFLO1lBRUcsWUFBWTtrQkFBcEIsS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUs7WUFDRyxlQUFlO2tCQUF2QixLQUFLO1lBQ0csb0JBQW9CO2tCQUE1QixLQUFLO1lBSUksVUFBVTtrQkFBbkIsTUFBTTtZQUNHLFNBQVM7a0JBQWxCLE1BQU07WUFDRyxTQUFTO2tCQUFsQixNQUFNO1lBR1AsUUFBUTtrQkFEUCxTQUFTO21CQUFDLFVBQVU7WUFHckIsS0FBSztrQkFESixTQUFTO21CQUFDLE9BQU87WUFpQlAsSUFBSTtrQkFEZCxLQUFLO21CQUFDLE1BQU07WUFnQkYsUUFBUTtrQkFEbEIsS0FBSzttQkFBQyxVQUFVO1lBTU4sWUFBWTtrQkFEdEIsS0FBSzttQkFBQyxjQUFjO1lBTVYsWUFBWTtrQkFEdEIsS0FBSzttQkFBQyxjQUFjO1lBTVYsVUFBVTtrQkFEcEIsS0FBSzttQkFBQyxZQUFZO1lBTVIsYUFBYTtrQkFEdkIsS0FBSzttQkFBQyxlQUFlO1lBTVgsWUFBWTtrQkFEdEIsS0FBSzttQkFBQyxjQUFjO1lBTXJCLFlBQVk7a0JBRFgsWUFBWTttQkFBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2tGQXJGOUIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDZGtEcmFnRW5kLFxuICAgIENka0RyYWdNb3ZlLFxuICAgIENka0RyYWdTdGFydCxcbiAgICBEcmFnRHJvcE1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RFbmdpbmVGYWNhZGUgfSBmcm9tICcuL2VuZ2luZS9hYnN0cmFjdC1lbmdpbmUtZmFjYWRlJztcbmltcG9ydCB7IEJvYXJkTG9hZGVyIH0gZnJvbSAnLi9lbmdpbmUvYm9hcmQtc3RhdGUtcHJvdmlkZXIvYm9hcmQtbG9hZGVyL2JvYXJkLWxvYWRlcic7XG5pbXBvcnQge1xuICAgIE5vdGF0aW9uUHJvY2Vzc29yRmFjdG9yeSxcbiAgICBOb3RhdGlvblR5cGUsXG59IGZyb20gJy4vZW5naW5lL2JvYXJkLXN0YXRlLXByb3ZpZGVyL2JvYXJkLWxvYWRlci9ub3RhdGlvbi1wcm9jZXNzb3JzL25vdGF0aW9uLXByb2Nlc3Nvci1mYWN0b3J5JztcbmltcG9ydCB7IENsaWNrVXRpbHMgfSBmcm9tICcuL2VuZ2luZS9jbGljay9jbGljay11dGlscyc7XG5pbXBvcnQgeyBFbmdpbmVGYWNhZGUgfSBmcm9tICcuL2VuZ2luZS9lbmdpbmUtZmFjYWRlJztcbmltcG9ydCB7IE1vdmVDaGFuZ2UgfSBmcm9tICcuL2VuZ2luZS9vdXRwdXRzL21vdmUtY2hhbmdlL21vdmUtY2hhbmdlJztcbmltcG9ydCB7IEhpc3RvcnlNb3ZlIH0gZnJvbSAnLi9oaXN0b3J5LW1vdmUtcHJvdmlkZXIvaGlzdG9yeS1tb3ZlJztcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSAnLi9tb2RlbHMvYm9hcmQnO1xuaW1wb3J0IHsgUGllY2UgfSBmcm9tICcuL21vZGVscy9waWVjZXMvcGllY2UnO1xuaW1wb3J0IHsgTmd4Q2hlc3NCb2FyZFZpZXcgfSBmcm9tICcuL25neC1jaGVzcy1ib2FyZC12aWV3JztcbmltcG9ydCB7IFBpZWNlUHJvbW90aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3BpZWNlLXByb21vdGlvbi9waWVjZS1wcm9tb3Rpb24tbW9kYWwvcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hDaGVzc0JvYXJkU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9uZ3gtY2hlc3MtYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBQaWVjZUljb25JbnB1dCB9IGZyb20gJy4vdXRpbHMvaW5wdXRzL3BpZWNlLWljb24taW5wdXQnO1xuaW1wb3J0IHsgUGllY2VJY29uSW5wdXRNYW5hZ2VyIH0gZnJvbSAnLi91dGlscy9pbnB1dHMvcGllY2UtaWNvbi1pbnB1dC1tYW5hZ2VyJztcbmltcG9ydCB7IENvbG9ySW5wdXQsIFBpZWNlVHlwZUlucHV0IH0gZnJvbSAnLi91dGlscy9pbnB1dHMvcGllY2UtdHlwZS1pbnB1dCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbmd4LWNoZXNzLWJvYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LWNoZXNzLWJvYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtY2hlc3MtYm9hcmQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIERyYWdEcm9wTW9kdWxlLCBQaWVjZVByb21vdGlvbk1vZGFsQ29tcG9uZW50XSwgLy8gRW5zdXJlIENvbW1vbk1vZHVsZSBhbmQgRHJhZ0Ryb3BNb2R1bGUgYXJlIGltcG9ydGVkXG59KVxuZXhwb3J0IGNsYXNzIE5neENoZXNzQm9hcmRDb21wb25lbnRcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBOZ3hDaGVzc0JvYXJkVmlldywgQWZ0ZXJWaWV3SW5pdFxue1xuICAgIEBJbnB1dCgpIGRhcmtUaWxlQ29sb3IgPSBDb25zdGFudHMuREVGQVVMVF9EQVJLX1RJTEVfQ09MT1I7XG4gICAgQElucHV0KCkgbGlnaHRUaWxlQ29sb3I6IHN0cmluZyA9IENvbnN0YW50cy5ERUZBVUxUX0xJR0hUX1RJTEVfQ09MT1I7XG4gICAgQElucHV0KCkgc2hvd0Nvb3JkcyA9IHRydWU7XG4gICAgQElucHV0KCkgc291cmNlUG9pbnRDb2xvcjogc3RyaW5nID0gQ29uc3RhbnRzLkRFRkFVTFRfU09VUkNFX1BPSU5UX0NPTE9SO1xuICAgIEBJbnB1dCgpIGRlc3RpbmF0aW9uUG9pbnRDb2xvcjogc3RyaW5nID1cbiAgICAgICAgQ29uc3RhbnRzLkRFRkFVTFRfREVTVElOQVRJT05fUE9JTlRfQ09MT1I7XG4gICAgQElucHV0KCkgbGVnYWxNb3Zlc1BvaW50Q29sb3I6IHN0cmluZyA9XG4gICAgICAgIENvbnN0YW50cy5ERUZBVUxUX0xFR0FMX01PVkVfUE9JTlRfQ09MT1I7XG4gICAgQElucHV0KCkgc2hvd0xhc3RNb3ZlID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93TGVnYWxNb3ZlcyA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd0FjdGl2ZVBpZWNlID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93UG9zc2libGVDYXB0dXJlcyA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRW5hYmxpbmcgZnJlZSBtb2RlIHJlbW92ZXMgdHVybi1iYXNlZCByZXN0cmljdGlvbiBhbmQgYWxsb3dzIHRvIG1vdmUgYW55IHBpZWNlIGZyZWVseSFcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgbW92ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW92ZUNoYW5nZT4oKTtcbiAgICBAT3V0cHV0KCkgY2hlY2ttYXRlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBzdGFsZW1hdGUgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdib2FyZFJlZicpXG4gICAgYm9hcmRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbW9kYWwnKVxuICAgIG1vZGFsOiBQaWVjZVByb21vdGlvbk1vZGFsQ29tcG9uZW50O1xuXG4gICAgcGllY2VTaXplOiBudW1iZXI7XG4gICAgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICBib2FyZExvYWRlcjogQm9hcmRMb2FkZXI7XG4gICAgcGllY2VJY29uTWFuYWdlcjogUGllY2VJY29uSW5wdXRNYW5hZ2VyO1xuICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBzdGFydFRyYW5zaXRpb24gPSAnJztcblxuICAgIGVuZ2luZUZhY2FkZTogQWJzdHJhY3RFbmdpbmVGYWNhZGU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5neENoZXNzQm9hcmRTZXJ2aWNlOiBOZ3hDaGVzc0JvYXJkU2VydmljZSkge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZSA9IG5ldyBFbmdpbmVGYWNhZGUobmV3IEJvYXJkKCksIHRoaXMubW92ZUNoYW5nZSk7XG4gICAgfVxuXG4gICAgQElucHV0KCdzaXplJylcbiAgICBwdWJsaWMgc2V0IHNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHNpemUgJiZcbiAgICAgICAgICAgIHNpemUgPj0gQ29uc3RhbnRzLk1JTl9CT0FSRF9TSVpFICYmXG4gICAgICAgICAgICBzaXplIDw9IENvbnN0YW50cy5NQVhfQk9BUkRfU0laRVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmhlaWdodEFuZFdpZHRoID0gc2l6ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmhlaWdodEFuZFdpZHRoID0gQ29uc3RhbnRzLkRFRkFVTFRfU0laRTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5kcmF3UHJvdmlkZXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVQaWVjZVNpemUoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoJ2ZyZWVNb2RlJylcbiAgICBwdWJsaWMgc2V0IGZyZWVNb2RlKGZyZWVNb2RlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmZyZWVNb2RlID0gZnJlZU1vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KCdkcmFnRGlzYWJsZWQnKVxuICAgIHB1YmxpYyBzZXQgZHJhZ0Rpc2FibGVkKGRyYWdEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5kcmFnRGlzYWJsZWQgPSBkcmFnRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KCdkcmF3RGlzYWJsZWQnKVxuICAgIHB1YmxpYyBzZXQgZHJhd0Rpc2FibGVkKGRyYXdEaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5kcmF3RGlzYWJsZWQgPSBkcmF3RGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgQElucHV0KCdwaWVjZUljb25zJylcbiAgICBwdWJsaWMgc2V0IHBpZWNlSWNvbnMocGllY2VJY29uczogUGllY2VJY29uSW5wdXQpIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUucGllY2VJY29uTWFuYWdlci5waWVjZUljb25JbnB1dCA9IHBpZWNlSWNvbnM7XG4gICAgfVxuXG4gICAgQElucHV0KCdsaWdodERpc2FibGVkJylcbiAgICBwdWJsaWMgc2V0IGxpZ2h0RGlzYWJsZWQobGlnaHREaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5saWdodERpc2FibGVkID0gbGlnaHREaXNhYmxlZDtcbiAgICB9XG5cbiAgICBASW5wdXQoJ2RhcmtEaXNhYmxlZCcpXG4gICAgcHVibGljIHNldCBkYXJrRGlzYWJsZWQoZGFya0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmRhcmtEaXNhYmxlZCA9IGRhcmtEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gICAgb25SaWdodENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAoY2hhbmdlcy5saWdodERpc2FibGVkICYmXG4gICAgICAgICAgICAgICAgdGhpcy5saWdodERpc2FibGVkICYmXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQuY3VycmVudFdoaXRlUGxheWVyKSB8fFxuICAgICAgICAgICAgKGNoYW5nZXMuZGFya0Rpc2FibGVkICYmXG4gICAgICAgICAgICAgICAgdGhpcy5kYXJrRGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQuY3VycmVudFdoaXRlUGxheWVyKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkLnBvc3NpYmxlQ2FwdHVyZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkLnBvc3NpYmxlTW92ZXMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5neENoZXNzQm9hcmRTZXJ2aWNlLmNvbXBvbmVudE1ldGhvZENhbGxlZCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLnJlc2V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUubW9kYWwgPSB0aGlzLm1vZGFsO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVBpZWNlU2l6ZSgpO1xuICAgIH1cblxuICAgIG9uTW91c2VVcChldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5vbk1vdXNlVXAoXG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xpY2tQb2ludChldmVudCksXG4gICAgICAgICAgICB0aGlzLmJvYXJkUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCxcbiAgICAgICAgICAgIHRoaXMuYm9hcmRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV2ZXJzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5yZXZlcnNlKCk7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmNvb3Jkcy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQm9hcmQoYm9hcmQ6IEJvYXJkKSB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMuYm9hcmRMb2FkZXIuc2V0RW5naW5lRmFjYWRlKHRoaXMuZW5naW5lRmFjYWRlKTtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IFtdO1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5wb3NzaWJsZU1vdmVzID0gW107XG4gICAgfVxuXG4gICAgc2V0RkVOKGZlbjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZExvYWRlci5zZXROb3RhdGlvblByb2Nlc3NvcihcbiAgICAgICAgICAgICAgICBOb3RhdGlvblByb2Nlc3NvckZhY3RvcnkuZ2V0UHJvY2Vzc29yKE5vdGF0aW9uVHlwZS5GRU4pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkTG9hZGVyLmxvYWRGRU4oZmVuKTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkLnBvc3NpYmxlQ2FwdHVyZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkLnBvc3NpYmxlTW92ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmNvb3Jkcy5yZXNldCgpO1xuICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkTG9hZGVyLmFkZFBpZWNlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UEdOKHBnbjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5wZ25Qcm9jZXNzb3IucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkTG9hZGVyLnNldE5vdGF0aW9uUHJvY2Vzc29yKFxuICAgICAgICAgICAgICAgIE5vdGF0aW9uUHJvY2Vzc29yRmFjdG9yeS5nZXRQcm9jZXNzb3IoTm90YXRpb25UeXBlLlBHTiksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmRMb2FkZXIubG9hZFBHTihwZ24pO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVDYXB0dXJlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQucG9zc2libGVNb3ZlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuY29vcmRzLnJlc2V0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXhjZXB0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLmJvYXJkTG9hZGVyLmFkZFBpZWNlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RkVOKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuZ2luZUZhY2FkZS5ib2FyZC5mZW47XG4gICAgfVxuXG4gICAgZHJhZ0VuZGVkKGV2ZW50OiBDZGtEcmFnRW5kKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5kcmFnRW5kU3RyYXRlZ3kucHJvY2VzcyhcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUubW92ZURvbmUsXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNpdGlvbixcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZlbnQ6IENka0RyYWdTdGFydCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgdHJhbnMgPSBldmVudC5zb3VyY2UuZ2V0Um9vdEVsZW1lbnQoKS5zdHlsZS50cmFuc2Zvcm0uc3BsaXQoJykgJyk7XG4gICAgICAgIC8vICAgdGhpcy5zdGFydFRyYW5zPSB0cmFucztcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zaXRpb24gPSB0cmFucy5sZW5ndGggPT09IDIgPyB0cmFuc1sxXSA6IHRyYW5zWzBdO1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5kcmFnU3RhcnRTdHJhdGVneS5wcm9jZXNzKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5vbk1vdXNlRG93bihcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgdGhpcy5nZXRDbGlja1BvaW50KGV2ZW50KSxcbiAgICAgICAgICAgIHRoaXMuYm9hcmRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0LFxuICAgICAgICAgICAgdGhpcy5ib2FyZFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRDbGlja1BvaW50KGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBDbGlja1V0aWxzLmdldENsaWNrUG9pbnQoXG4gICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgIHRoaXMuYm9hcmRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AsXG4gICAgICAgICAgICB0aGlzLmJvYXJkUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5ib2FyZFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXG4gICAgICAgICAgICB0aGlzLmJvYXJkUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVQaWVjZVNpemUoKSB7XG4gICAgICAgIHRoaXMucGllY2VTaXplID0gdGhpcy5lbmdpbmVGYWNhZGUuaGVpZ2h0QW5kV2lkdGggLyA4O1xuICAgIH1cblxuICAgIGdldEN1c3RvbVBpZWNlSWNvbnMocGllY2U6IFBpZWNlKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKFxuICAgICAgICAgICAgYHsgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IFwidXJsKCcke3RoaXMuZW5naW5lRmFjYWRlLnBpZWNlSWNvbk1hbmFnZXIuZ2V0UGllY2VJY29uKFxuICAgICAgICAgICAgICAgIHBpZWNlLFxuICAgICAgICAgICAgKX0nKVwifWAsXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbW92ZShjb29yZHM6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5tb3ZlKGNvb3Jkcyk7XG4gICAgfVxuXG4gICAgZ2V0TW92ZUhpc3RvcnkoKTogSGlzdG9yeU1vdmVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuZ2luZUZhY2FkZS5nZXRNb3ZlSGlzdG9yeSgpO1xuICAgIH1cblxuICAgIHJlc2V0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVuZ2luZUZhY2FkZS5yZXNldCgpO1xuICAgIH1cblxuICAgIHVuZG8oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW5naW5lRmFjYWRlLnVuZG8oKTtcbiAgICB9XG5cbiAgICBhZGRQaWVjZShcbiAgICAgICAgcGllY2VUeXBlSW5wdXQ6IFBpZWNlVHlwZUlucHV0LFxuICAgICAgICBjb2xvcklucHV0OiBDb2xvcklucHV0LFxuICAgICAgICBjb29yZHM6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5lbmdpbmVGYWNhZGUuYWRkUGllY2UocGllY2VUeXBlSW5wdXQsIGNvbG9ySW5wdXQsIGNvb3Jkcyk7XG4gICAgfVxuXG4gICAgZ2V0UEdOKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmdpbmVGYWNhZGUucGduUHJvY2Vzc29yLmdldFBHTigpO1xuICAgIH1cblxuICAgIGRyYWdNb3ZlZCgkZXZlbnQ6IENka0RyYWdNb3ZlPGFueT4pIHtcbiAgICAgICAgbGV0IHggPVxuICAgICAgICAgICAgJGV2ZW50LnBvaW50ZXJQb3NpdGlvbi54IC1cbiAgICAgICAgICAgICRldmVudC5zb3VyY2UuZ2V0Um9vdEVsZW1lbnQoKS5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgLmxlZnQgLVxuICAgICAgICAgICAgdGhpcy5waWVjZVNpemUgLyAyO1xuICAgICAgICBsZXQgeSA9XG4gICAgICAgICAgICAkZXZlbnQucG9pbnRlclBvc2l0aW9uLnkgLVxuICAgICAgICAgICAgJGV2ZW50LnNvdXJjZS5nZXRSb290RWxlbWVudCgpLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAudG9wIC1cbiAgICAgICAgICAgIHRoaXMucGllY2VTaXplIC8gMjtcbiAgICAgICAgJGV2ZW50LnNvdXJjZS5nZXRSb290RWxlbWVudCgpLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAndHJhbnNsYXRlM2QoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4LDBweCknO1xuICAgIH1cblxuICAgIGdldFRpbGVCYWNrZ3JvdW5kQ29sb3IoaSwgaik6IHN0cmluZyB7XG4gICAgICAgIGxldCBjb2xvciA9XG4gICAgICAgICAgICAoaSArIGopICUgMiA9PT0gMCA/IHRoaXMubGlnaHRUaWxlQ29sb3IgOiB0aGlzLmRhcmtUaWxlQ29sb3I7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd0xhc3RNb3ZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQuaXNYWUluU291cmNlTW92ZShpLCBqKSkge1xuICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5zb3VyY2VQb2ludENvbG9yO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5lbmdpbmVGYWNhZGUuYm9hcmQuaXNYWUluRGVzdE1vdmUoaSwgaikpIHtcbiAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZGVzdGluYXRpb25Qb2ludENvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbn1cbiIsIjxkaXZcbiAgICBpZD1cImJvYXJkXCJcbiAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cImVuZ2luZUZhY2FkZS5oZWlnaHRBbmRXaWR0aFwiXG4gICAgW3N0eWxlLndpZHRoLnB4XT1cImVuZ2luZUZhY2FkZS5oZWlnaHRBbmRXaWR0aFwiXG4gICAgKHBvaW50ZXJkb3duKT1cIiFtb2RhbC5vcGVuZWQgJiYgb25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgKHBvaW50ZXJ1cCk9XCIhbW9kYWwub3BlbmVkICYmIG9uTW91c2VVcCgkZXZlbnQpXCJcbiAgICAjYm9hcmRSZWZcbj5cbiAgICA8ZGl2IGlkPVwiZHJhZ1wiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBbY2RrRHJhZ0Rpc2FibGVkXT1cImVuZ2luZUZhY2FkZS5kcmFnRGlzYWJsZWRcIlxuICAgICAgICAgICAgKGNka0RyYWdFbmRlZCk9XCJkcmFnRW5kZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoY2RrRHJhZ01vdmVkKT1cImRyYWdNb3ZlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChjZGtEcmFnU3RhcnRlZCk9XCJkcmFnU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICBjbGFzcz1cInNpbmdsZS1waWVjZVwiIFtpbm5lckhUTUxdPVwiZW5naW5lRmFjYWRlLnBpZWNlSWNvbk1hbmFnZXIuaXNEZWZhdWx0SWNvbnMoKSA/IHBpZWNlLmNvbnN0YW50Lmljb24gOiAnJ1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJlbmdpbmVGYWNhZGUucGllY2VJY29uTWFuYWdlci5pc0RlZmF1bHRJY29ucygpID8gJycgOiBnZXRDdXN0b21QaWVjZUljb25zKHBpZWNlKVwiXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNmb3JtXT1cIid0cmFuc2xhdGUzZCgnICsgcGllY2UucG9pbnQuY29sICogcGllY2VTaXplICsgJ3B4LCAnICsgcGllY2UucG9pbnQucm93ICogcGllY2VTaXplICsgJ3B4LDBweCknXCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXgtaGVpZ2h0XT1cInBpZWNlU2l6ZSArICdweCdcIlxuICAgICAgICAgICAgW3N0eWxlLmZvbnQtc2l6ZV09XCJwaWVjZVNpemUgKiAwLjggKyAncHgnXCJcbiAgICAgICAgICAgIFtzdHlsZS53aWR0aF09XCJwaWVjZVNpemUgKyAncHgnXCJcbiAgICAgICAgICAgIFtzdHlsZS5oZWlnaHRdPVwicGllY2VTaXplICsgJ3B4J1wiXG4gICAgICAgICAgICBjZGtEcmFnXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcGllY2Ugb2YgZW5naW5lRmFjYWRlLmJvYXJkLnBpZWNlczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgID5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiYm9hcmQtcm93XCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCByb3cgb2YgZW5naW5lRmFjYWRlLmJvYXJkLmJvYXJkOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYm9hcmQtY29sXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MuY3VycmVudC1zZWxlY3Rpb25dPVwic2hvd0FjdGl2ZVBpZWNlICYmIGVuZ2luZUZhY2FkZS5ib2FyZC5pc1hZSW5BY3RpdmVNb3ZlKGksailcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5raW5nLWNoZWNrXT1cIiBlbmdpbmVGYWNhZGUuYm9hcmQuaXNLaW5nQ2hlY2tlZChlbmdpbmVGYWNhZGUuYm9hcmQuZ2V0UGllY2VCeVBvaW50KGksaikpXCJcbiAgICAgICAgICAgICAgICBbY2xhc3MucG9pbnQtY2lyY2xlXT1cImVuZ2luZUZhY2FkZS5ib2FyZC5pc1hZSW5Qb2ludFNlbGVjdGlvbihpLCBqKVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzLnBvc3NpYmxlLWNhcHR1cmVdPVwic2hvd1Bvc3NpYmxlQ2FwdHVyZXMgJiYgZW5naW5lRmFjYWRlLmJvYXJkLmlzWFlJblBvc3NpYmxlQ2FwdHVyZXMoaSwgailcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5wb3NzaWJsZS1wb2ludF09XCJlbmdpbmVGYWNhZGUuYm9hcmQuaXNYWUluUG9zc2libGVNb3ZlcyhpLCBqKSAmJiBzaG93TGVnYWxNb3Zlc1wiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwiZ2V0VGlsZUJhY2tncm91bmRDb2xvcihpLCBqKVwiXG4gICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbCBvZiByb3c7IGxldCBqID0gaW5kZXhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwieUNvb3JkXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cIihpICUgMiA9PT0gMCkgPyBsaWdodFRpbGVDb2xvciA6IGRhcmtUaWxlQ29sb3JcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB4XT1cInBpZWNlU2l6ZSAvIDRcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInNob3dDb29yZHMgJiYgaiA9PT0gN1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7e2VuZ2luZUZhY2FkZS5jb29yZHMueUNvb3Jkc1tpXX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwieENvb3JkXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cIihqICUgMiA9PT0gMCkgPyBsaWdodFRpbGVDb2xvciA6IGRhcmtUaWxlQ29sb3JcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB4XT1cInBpZWNlU2l6ZSAvIDRcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInNob3dDb29yZHMgJiYgaSA9PT0gN1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7e2VuZ2luZUZhY2FkZS5jb29yZHMueENvb3Jkc1tqXX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJlbmdpbmVGYWNhZGUuYm9hcmQuZ2V0UGllY2VCeVBvaW50KGksIGopIGFzIHBpZWNlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJoZWlnaHQ6MTAwJTsgd2lkdGg6MTAwJVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIncGllY2UnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5mb250LXNpemVdPVwicGllY2VTaXplICsgJ3B4J1wiXG5cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8c3ZnXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJlbmdpbmVGYWNhZGUuaGVpZ2h0QW5kV2lkdGhcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJlbmdpbmVGYWNhZGUuaGVpZ2h0QW5kV2lkdGhcIlxuICAgICAgICBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlOyB0b3A6MDsgcG9pbnRlci1ldmVudHM6IG5vbmVcIlxuICAgID5cbiAgICAgICAgPGRlZnMgKm5nRm9yPVwibGV0IGNvbG9yIG9mIFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnLCAnb3JhbmdlJ11cIj5cbiAgICAgICAgICAgIDxtYXJrZXJcbiAgICAgICAgICAgICAgICBbaWRdPVwiY29sb3IgKyAnQXJyb3cnXCJcbiAgICAgICAgICAgICAgICBtYXJrZXJIZWlnaHQ9XCIxM1wiXG4gICAgICAgICAgICAgICAgbWFya2VyV2lkdGg9XCIxM1wiXG4gICAgICAgICAgICAgICAgb3JpZW50PVwiYXV0b1wiXG4gICAgICAgICAgICAgICAgcmVmWD1cIjlcIlxuICAgICAgICAgICAgICAgIHJlZlk9XCI2XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZmlsbF09XCJjb2xvclwiXG4gICAgICAgICAgICAgICAgICAgIGQ9XCJNMiwyIEwyLDExIEwxMCw2IEwyLDJcIlxuICAgICAgICAgICAgICAgID48L3BhdGg+XG4gICAgICAgICAgICA8L21hcmtlcj5cbiAgICAgICAgPC9kZWZzPlxuICAgICAgICA8bGluZVxuICAgICAgICAgICAgY2xhc3M9XCJhcnJvd1wiXG4gICAgICAgICAgICBbYXR0ci5tYXJrZXItZW5kXT1cIid1cmwoIycgKyBhcnJvdy5lbmQuY29sb3IgKyAnQXJyb3cpJ1wiXG4gICAgICAgICAgICBbYXR0ci5zdHJva2VdPVwiYXJyb3cuZW5kLmNvbG9yXCJcbiAgICAgICAgICAgIFthdHRyLngxXT1cImFycm93LnN0YXJ0LnhcIlxuICAgICAgICAgICAgW2F0dHIueDJdPVwiYXJyb3cuZW5kLnhcIlxuICAgICAgICAgICAgW2F0dHIueTFdPVwiYXJyb3cuc3RhcnQueVwiXG4gICAgICAgICAgICBbYXR0ci55Ml09XCJhcnJvdy5lbmQueVwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgYXJyb3cgb2YgZW5naW5lRmFjYWRlLmRyYXdQcm92aWRlci5hcnJvd3MkIHwgYXN5bmNcIlxuICAgICAgICA+PC9saW5lPlxuICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICBbYXR0ci5jeF09XCJjaXJjbGUuZHJhd1BvaW50LnhcIlxuICAgICAgICAgICAgW2F0dHIuY3ldPVwiY2lyY2xlLmRyYXdQb2ludC55XCJcbiAgICAgICAgICAgIFthdHRyLnJdPVwiZW5naW5lRmFjYWRlLmhlaWdodEFuZFdpZHRoIC8gMThcIlxuICAgICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNpcmNsZS5kcmF3UG9pbnQuY29sb3JcIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNpcmNsZSBvZiBlbmdpbmVGYWNhZGUuZHJhd1Byb3ZpZGVyLmNpcmNsZXMkIHwgYXN5bmNcIlxuICAgICAgICAgICAgZmlsbC1vcGFjaXR5PVwiMC4wXCJcbiAgICAgICAgICAgIHN0cm9rZS13aWR0aD1cIjJcIlxuICAgICAgICA+PC9jaXJjbGU+XG4gICAgPC9zdmc+XG4gICAgPGFwcC1waWVjZS1wcm9tb3Rpb24tbW9kYWwgI21vZGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BpZWNlSWNvbklucHV0XT1cImVuZ2luZUZhY2FkZS5waWVjZUljb25NYW5hZ2VyLnBpZWNlSWNvbklucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY29sb3JdPVwiZW5naW5lRmFjYWRlLmJvYXJkLmdldEN1cnJlbnRQbGF5ZXJDb2xvcigpID8gJ3doaXRlJyA6ICdibGFjaydcIj48L2FwcC1waWVjZS1wcm9tb3Rpb24tbW9kYWw+XG48L2Rpdj5cbiJdfQ==