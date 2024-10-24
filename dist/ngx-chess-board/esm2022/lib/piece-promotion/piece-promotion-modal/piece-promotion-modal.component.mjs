import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["myModal"];
function PiecePromotionModalComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(1)); });
    i0.ɵɵelement(2, "img", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(2)); });
    i0.ɵɵelement(4, "img", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(3)); });
    i0.ɵɵelement(6, "img", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(4)); });
    i0.ɵɵelement(8, "img", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.getPieceIcon("queen"), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.getPieceIcon("rook"), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.getPieceIcon("bishop"), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.getPieceIcon("knight"), i0.ɵɵsanitizeUrl);
} }
function PiecePromotionModalComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(1)); });
    i0.ɵɵtext(2, "\u265B");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(2)); });
    i0.ɵɵtext(4, "\u265C");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(3)); });
    i0.ɵɵtext(6, "\u265D");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeSelection(4)); });
    i0.ɵɵtext(8, "\u265E");
    i0.ɵɵelementEnd()();
} }
export class PiecePromotionModalComponent {
    modal;
    pieceIconInput;
    color = 'white';
    opened = false;
    onCloseCallback;
    open(closeCallback) {
        this.opened = true;
        this.onCloseCallback = closeCallback;
        this.modal.nativeElement.style.display = 'block';
    }
    changeSelection(index) {
        this.modal.nativeElement.style.display = 'none';
        this.opened = false;
        this.onCloseCallback(index);
    }
    getPieceIcon(piece) {
        let coloredPiece = '';
        switch (piece.toLowerCase()) {
            case 'queen':
                coloredPiece =
                    this.color === 'white'
                        ? this.pieceIconInput.whiteQueenUrl
                        : this.pieceIconInput.blackQueenUrl;
                break;
            case 'rook':
                coloredPiece =
                    this.color === 'white'
                        ? this.pieceIconInput.whiteRookUrl
                        : this.pieceIconInput.blackRookUrl;
                break;
            case 'bishop':
                coloredPiece =
                    this.color === 'white'
                        ? this.pieceIconInput.whiteBishopUrl
                        : this.pieceIconInput.blackBishopUrl;
                break;
            case 'knight':
                coloredPiece =
                    this.color === 'white'
                        ? this.pieceIconInput.whiteKnightUrl
                        : this.pieceIconInput.blackKnightUrl;
                break;
            case 'coin':
                coloredPiece =
                    this.color === 'white'
                        ? this.pieceIconInput.whiteCoinUrl
                        : this.pieceIconInput.blackCoinUrl;
                break;
        }
        return coloredPiece;
    }
    static ɵfac = function PiecePromotionModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PiecePromotionModalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PiecePromotionModalComponent, selectors: [["app-piece-promotion-modal"]], viewQuery: function PiecePromotionModalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.modal = _t.first);
        } }, inputs: { pieceIconInput: "pieceIconInput", color: "color" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 6, vars: 2, consts: [["myModal", ""], [1, "container"], [1, "wrapper"], [1, "content"], ["class", "piece-wrapper", 4, "ngIf"], [1, "piece-wrapper"], [1, "piece", 3, "click"], ["alt", "Queen", 3, "src"], ["alt", "Rook", 3, "src"], ["alt", "Bishop", 3, "src"], ["alt", "Knight", 3, "src"]], template: function PiecePromotionModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1, 0)(2, "div", 2)(3, "div", 3);
            i0.ɵɵtemplate(4, PiecePromotionModalComponent_div_4_Template, 9, 4, "div", 4)(5, PiecePromotionModalComponent_div_5_Template, 9, 0, "div", 4);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.pieceIconInput);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.pieceIconInput);
        } }, dependencies: [CommonModule, i1.NgIf, DragDropModule], styles: [".container[_ngcontent-%COMP%]{display:none;position:absolute;z-index:9999;top:0;color:#000;width:100%;height:100%;overflow:auto;background-color:#0006}.wrapper[_ngcontent-%COMP%]{position:relative;height:100%;width:100%}.content[_ngcontent-%COMP%]{background-color:#fefefe;margin:auto;position:relative;top:30%;font-size:100%;height:40%;padding:10px;border:1px solid #888;width:90%}.piece[_ngcontent-%COMP%]{font-size:5rem;height:100%;width:25%;cursor:pointer;display:inline-block;text-align:center}.piece[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}.piece[_ngcontent-%COMP%]:hover{background-color:#ccc;border-radius:5px}.piece-wrapper[_ngcontent-%COMP%]{height:80%;width:100%}#close-button[_ngcontent-%COMP%]{border-radius:4px;background-color:#4caf50;border:none;color:#fff;padding-left:5px;padding-right:5px;text-align:center;text-decoration:none;display:inline-block}.selected[_ngcontent-%COMP%]{border:2px solid #00B919;border-radius:4px;box-sizing:border-box}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PiecePromotionModalComponent, [{
        type: Component,
        args: [{ selector: 'app-piece-promotion-modal', standalone: true, imports: [CommonModule, DragDropModule], template: "<div #myModal class=\"container\">\n    <div class=\"wrapper\">\n        <div class=\"content\">\n            <div class=\"piece-wrapper\" *ngIf=\"pieceIconInput\">\n                <div class=\"piece\" (click)=\"changeSelection(1)\">\n                    <img [src]=\"getPieceIcon('queen')\" alt=\"Queen\">\n                </div>\n                <div class=\"piece\" (click)=\"changeSelection(2)\">\n                    <img [src]=\"getPieceIcon('rook')\" alt=\"Rook\">\n                </div>\n                <div class=\"piece\" (click)=\"changeSelection(3)\">\n                    <img [src]=\"getPieceIcon('bishop')\" alt=\"Bishop\">\n                </div>\n                <div class=\"piece\" (click)=\"changeSelection(4)\">\n                    <img [src]=\"getPieceIcon('knight')\" alt=\"Knight\">\n                </div>\n            </div>\n            <div class=\"piece-wrapper\" *ngIf=\"!pieceIconInput\">\n                <div class=\"piece\" (click)=\"changeSelection(1)\">&#x265B;</div>\n                <div class=\"piece\" (click)=\"changeSelection(2)\">&#x265C;</div>\n                <div class=\"piece\" (click)=\"changeSelection(3)\">&#x265D;</div>\n                <div class=\"piece\" (click)=\"changeSelection(4)\">&#x265E;</div>\n            </div>\n        </div>\n    </div>\n</div>\n", styles: [".container{display:none;position:absolute;z-index:9999;top:0;color:#000;width:100%;height:100%;overflow:auto;background-color:#0006}.wrapper{position:relative;height:100%;width:100%}.content{background-color:#fefefe;margin:auto;position:relative;top:30%;font-size:100%;height:40%;padding:10px;border:1px solid #888;width:90%}.piece{font-size:5rem;height:100%;width:25%;cursor:pointer;display:inline-block;text-align:center}.piece img{max-width:100%}.piece:hover{background-color:#ccc;border-radius:5px}.piece-wrapper{height:80%;width:100%}#close-button{border-radius:4px;background-color:#4caf50;border:none;color:#fff;padding-left:5px;padding-right:5px;text-align:center;text-decoration:none;display:inline-block}.selected{border:2px solid #00B919;border-radius:4px;box-sizing:border-box}\n"] }]
    }], null, { modal: [{
            type: ViewChild,
            args: ['myModal', { static: false }]
        }], pieceIconInput: [{
            type: Input
        }], color: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PiecePromotionModalComponent, { className: "PiecePromotionModalComponent" }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL3BpZWNlLXByb21vdGlvbi9waWVjZS1wcm9tb3Rpb24tbW9kYWwvcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL3BpZWNlLXByb21vdGlvbi9waWVjZS1wcm9tb3Rpb24tbW9kYWwvcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7SUNFeEQsQUFESiw4QkFBa0QsYUFDRTtJQUE3QixxTEFBUyx1QkFBZ0IsQ0FBQyxDQUFDLEtBQUM7SUFDM0MseUJBQStDO0lBQ25ELGlCQUFNO0lBQ04sOEJBQWdEO0lBQTdCLHFMQUFTLHVCQUFnQixDQUFDLENBQUMsS0FBQztJQUMzQyx5QkFBNkM7SUFDakQsaUJBQU07SUFDTiw4QkFBZ0Q7SUFBN0IscUxBQVMsdUJBQWdCLENBQUMsQ0FBQyxLQUFDO0lBQzNDLHlCQUFpRDtJQUNyRCxpQkFBTTtJQUNOLDhCQUFnRDtJQUE3QixxTEFBUyx1QkFBZ0IsQ0FBQyxDQUFDLEtBQUM7SUFDM0MsMEJBQWlEO0lBRXpELEFBREksaUJBQU0sRUFDSjs7O0lBWE8sZUFBNkI7SUFBN0Isb0VBQTZCO0lBRzdCLGVBQTRCO0lBQTVCLG1FQUE0QjtJQUc1QixlQUE4QjtJQUE5QixxRUFBOEI7SUFHOUIs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QWNDO1lBUS9ELEFBREksQUFESSxpQkFBTSxFQUNKLEVBQ0o7O1lBdEJrQyxlQUFvQjtZQUFwQix5Q0FBb0I7WUFjcEIsY0FBcUI7WUFBckIsMENBQXFCOzRCRFAvQyxZQUFZLFdBQUUsY0FBYzs7aUZBRTdCLDRCQUE0QjtjQVB4QyxTQUFTOzJCQUNJLDJCQUEyQixjQUd6QixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO2dCQUdFLEtBQUs7a0JBQTdDLFNBQVM7bUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUd2QyxjQUFjO2tCQURiLEtBQUs7WUFJTixLQUFLO2tCQURKLEtBQUs7O2tGQU5HLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQaWVjZUljb25JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzL2lucHV0cy9waWVjZS1pY29uLWlucHV0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtcGllY2UtcHJvbW90aW9uLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9waWVjZS1wcm9tb3Rpb24tbW9kYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIERyYWdEcm9wTW9kdWxlXSwgLy8gQWRkIGl0IHRvIGltcG9ydHNcbn0pXG5leHBvcnQgY2xhc3MgUGllY2VQcm9tb3Rpb25Nb2RhbENvbXBvbmVudCB7XG4gICAgQFZpZXdDaGlsZCgnbXlNb2RhbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBtb2RhbDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcGllY2VJY29uSW5wdXQ6IFBpZWNlSWNvbklucHV0O1xuXG4gICAgQElucHV0KClcbiAgICBjb2xvciA9ICd3aGl0ZSc7XG5cbiAgICBvcGVuZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIG9uQ2xvc2VDYWxsYmFjazogKGluZGV4OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgICBvcGVuKGNsb3NlQ2FsbGJhY2s6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkNsb3NlQ2FsbGJhY2sgPSBjbG9zZUNhbGxiYWNrO1xuICAgICAgICB0aGlzLm1vZGFsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgY2hhbmdlU2VsZWN0aW9uKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25DbG9zZUNhbGxiYWNrKGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUljb24ocGllY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjb2xvcmVkUGllY2UgPSAnJztcbiAgICAgICAgc3dpdGNoIChwaWVjZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICBjYXNlICdxdWVlbic6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlUXVlZW5VcmxcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5waWVjZUljb25JbnB1dC5ibGFja1F1ZWVuVXJsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncm9vayc6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlUm9va1VybFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnBpZWNlSWNvbklucHV0LmJsYWNrUm9va1VybDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Jpc2hvcCc6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlQmlzaG9wVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucGllY2VJY29uSW5wdXQuYmxhY2tCaXNob3BVcmw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdrbmlnaHQnOlxuICAgICAgICAgICAgICAgIGNvbG9yZWRQaWVjZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPT09ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5waWVjZUljb25JbnB1dC53aGl0ZUtuaWdodFVybFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnBpZWNlSWNvbklucHV0LmJsYWNrS25pZ2h0VXJsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29pbic6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlQ29pblVybFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnBpZWNlSWNvbklucHV0LmJsYWNrQ29pblVybDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xvcmVkUGllY2U7XG4gICAgfVxufVxuIiwiPGRpdiAjbXlNb2RhbCBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2Utd3JhcHBlclwiICpuZ0lmPVwicGllY2VJY29uSW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgW3NyY109XCJnZXRQaWVjZUljb24oJ3F1ZWVuJylcIiBhbHQ9XCJRdWVlblwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWVjZVwiIChjbGljayk9XCJjaGFuZ2VTZWxlY3Rpb24oMilcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBbc3JjXT1cImdldFBpZWNlSWNvbigncm9vaycpXCIgYWx0PVwiUm9va1wiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWVjZVwiIChjbGljayk9XCJjaGFuZ2VTZWxlY3Rpb24oMylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBbc3JjXT1cImdldFBpZWNlSWNvbignYmlzaG9wJylcIiBhbHQ9XCJCaXNob3BcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgW3NyY109XCJnZXRQaWVjZUljb24oJ2tuaWdodCcpXCIgYWx0PVwiS25pZ2h0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWVjZS13cmFwcGVyXCIgKm5nSWY9XCIhcGllY2VJY29uSW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDEpXCI+JiN4MjY1Qjs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDIpXCI+JiN4MjY1Qzs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDMpXCI+JiN4MjY1RDs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDQpXCI+JiN4MjY1RTs8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19