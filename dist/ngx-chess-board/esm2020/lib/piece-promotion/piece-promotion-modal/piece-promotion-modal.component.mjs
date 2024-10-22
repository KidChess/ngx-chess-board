import { Component, Input, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["myModal"];
function PiecePromotionModalComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelementStart(1, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.changeSelection(1); });
    i0.ɵɵelement(2, "img", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_3_listener() { i0.ɵɵrestoreView(_r4); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.changeSelection(2); });
    i0.ɵɵelement(4, "img", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_5_listener() { i0.ɵɵrestoreView(_r4); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.changeSelection(3); });
    i0.ɵɵelement(6, "img", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_4_Template_div_click_7_listener() { i0.ɵɵrestoreView(_r4); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.changeSelection(4); });
    i0.ɵɵelement(8, "img", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
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
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelementStart(1, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return ctx_r8.changeSelection(1); });
    i0.ɵɵtext(2, "\u265B");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_3_listener() { i0.ɵɵrestoreView(_r9); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.changeSelection(2); });
    i0.ɵɵtext(4, "\u265C");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_5_listener() { i0.ɵɵrestoreView(_r9); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.changeSelection(3); });
    i0.ɵɵtext(6, "\u265D");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 6);
    i0.ɵɵlistener("click", function PiecePromotionModalComponent_div_5_Template_div_click_7_listener() { i0.ɵɵrestoreView(_r9); const ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.changeSelection(4); });
    i0.ɵɵtext(8, "\u265E");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
export class PiecePromotionModalComponent {
    constructor() {
        this.color = 'white';
        this.opened = false;
    }
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
}
PiecePromotionModalComponent.ɵfac = function PiecePromotionModalComponent_Factory(t) { return new (t || PiecePromotionModalComponent)(); };
PiecePromotionModalComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PiecePromotionModalComponent, selectors: [["app-piece-promotion-modal"]], viewQuery: function PiecePromotionModalComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.modal = _t.first);
    } }, inputs: { pieceIconInput: "pieceIconInput", color: "color" }, decls: 6, vars: 2, consts: [[1, "container"], ["myModal", ""], [1, "wrapper"], [1, "content"], ["class", "piece-wrapper", 4, "ngIf"], [1, "piece-wrapper"], [1, "piece", 3, "click"], ["alt", "Queen", 3, "src"], ["alt", "Rook", 3, "src"], ["alt", "Bishop", 3, "src"], ["alt", "Knight", 3, "src"]], template: function PiecePromotionModalComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵtemplate(4, PiecePromotionModalComponent_div_4_Template, 9, 4, "div", 4);
        i0.ɵɵtemplate(5, PiecePromotionModalComponent_div_5_Template, 9, 0, "div", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.pieceIconInput);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.pieceIconInput);
    } }, directives: [i1.NgIf], styles: [".container[_ngcontent-%COMP%]{display:none;position:absolute;z-index:9999;top:0;color:#000;width:100%;height:100%;overflow:auto;background-color:#0006}.wrapper[_ngcontent-%COMP%]{position:relative;height:100%;width:100%}.content[_ngcontent-%COMP%]{background-color:#fefefe;margin:auto;position:relative;top:30%;font-size:100%;height:40%;padding:10px;border:1px solid #888;width:90%}.piece[_ngcontent-%COMP%]{font-size:5rem;height:100%;width:25%;cursor:pointer;display:inline-block;text-align:center}.piece[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%}.piece[_ngcontent-%COMP%]:hover{background-color:#ccc;border-radius:5px}.piece-wrapper[_ngcontent-%COMP%]{height:80%;width:100%}#close-button[_ngcontent-%COMP%]{border-radius:4px;background-color:#4caf50;border:none;color:#fff;padding-left:5px;padding-right:5px;text-align:center;text-decoration:none;display:inline-block}.selected[_ngcontent-%COMP%]{border:2px solid #00B919;border-radius:4px;box-sizing:border-box}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PiecePromotionModalComponent, [{
        type: Component,
        args: [{ selector: 'app-piece-promotion-modal', template: "<div #myModal class=\"container\">\n    <div class=\"wrapper\">\n        <div class=\"content\">\n            <div class=\"piece-wrapper\" *ngIf=\"pieceIconInput\">\n                <div class=\"piece\" (click)=\"changeSelection(1)\">\n                    <img [src]=\"getPieceIcon('queen')\" alt=\"Queen\">\n                </div>\n                <div class=\"piece\" (click)=\"changeSelection(2)\">\n                    <img [src]=\"getPieceIcon('rook')\" alt=\"Rook\">\n                </div>\n                <div class=\"piece\" (click)=\"changeSelection(3)\">\n                    <img [src]=\"getPieceIcon('bishop')\" alt=\"Bishop\">\n                </div>\n                <div class=\"piece\" (click)=\"changeSelection(4)\">\n                    <img [src]=\"getPieceIcon('knight')\" alt=\"Knight\">\n                </div>\n            </div>\n            <div class=\"piece-wrapper\" *ngIf=\"!pieceIconInput\">\n                <div class=\"piece\" (click)=\"changeSelection(1)\">&#x265B;</div>\n                <div class=\"piece\" (click)=\"changeSelection(2)\">&#x265C;</div>\n                <div class=\"piece\" (click)=\"changeSelection(3)\">&#x265D;</div>\n                <div class=\"piece\" (click)=\"changeSelection(4)\">&#x265E;</div>\n            </div>\n        </div>\n    </div>\n</div>\n", styles: [".container{display:none;position:absolute;z-index:9999;top:0;color:#000;width:100%;height:100%;overflow:auto;background-color:#0006}.wrapper{position:relative;height:100%;width:100%}.content{background-color:#fefefe;margin:auto;position:relative;top:30%;font-size:100%;height:40%;padding:10px;border:1px solid #888;width:90%}.piece{font-size:5rem;height:100%;width:25%;cursor:pointer;display:inline-block;text-align:center}.piece img{max-width:100%}.piece:hover{background-color:#ccc;border-radius:5px}.piece-wrapper{height:80%;width:100%}#close-button{border-radius:4px;background-color:#4caf50;border:none;color:#fff;padding-left:5px;padding-right:5px;text-align:center;text-decoration:none;display:inline-block}.selected{border:2px solid #00B919;border-radius:4px;box-sizing:border-box}\n"] }]
    }], null, { modal: [{
            type: ViewChild,
            args: ['myModal', { static: false }]
        }], pieceIconInput: [{
            type: Input
        }], color: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL3BpZWNlLXByb21vdGlvbi9waWVjZS1wcm9tb3Rpb24tbW9kYWwvcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL3BpZWNlLXByb21vdGlvbi9waWVjZS1wcm9tb3Rpb24tbW9kYWwvcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDRzVELDhCQUFrRDtJQUM5Qyw4QkFBZ0Q7SUFBN0Isc0tBQVMsdUJBQWdCLENBQUMsQ0FBQyxJQUFDO0lBQzNDLHlCQUErQztJQUNuRCxpQkFBTTtJQUNOLDhCQUFnRDtJQUE3QixzS0FBUyx1QkFBZ0IsQ0FBQyxDQUFDLElBQUM7SUFDM0MseUJBQTZDO0lBQ2pELGlCQUFNO0lBQ04sOEJBQWdEO0lBQTdCLHNLQUFTLHVCQUFnQixDQUFDLENBQUMsSUFBQztJQUMzQyx5QkFBaUQ7SUFDckQsaUJBQU07SUFDTiw4QkFBZ0Q7SUFBN0Isc0tBQVMsdUJBQWdCLENBQUMsQ0FBQyxJQUFDO0lBQzNDLDBCQUFpRDtJQUNyRCxpQkFBTTtJQUNWLGlCQUFNOzs7SUFYTyxlQUE2QjtJQUE3QixvRUFBNkI7SUFHN0IsZUFBNEI7SUFBNUIsbUVBQTRCO0lBRzVCLGVBQThCO0lBQTlCLHFFQUE4QjtJQUc5QixlQUE4QjtJQUE5QixxRUFBOEI7Ozs7SUFHM0MsOEJBQW1EO0lBQy9DLDhCQUFnRDtJQUE3QixzS0FBUyx1QkFBZ0IsQ0FBQyxDQUFDLElBQUM7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LDJCQUEyQjtnQkFLSSxLQUFLO2tCQUE3QyxTQUFTO21CQUFDLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFHdkMsY0FBYztrQkFEYixLQUFLO1lBSU4sS0FBSztrQkFESixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQaWVjZUljb25JbnB1dCB9IGZyb20gJy4uLy4uL3V0aWxzL2lucHV0cy9waWVjZS1pY29uLWlucHV0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtcGllY2UtcHJvbW90aW9uLW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9waWVjZS1wcm9tb3Rpb24tbW9kYWwuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUGllY2VQcm9tb3Rpb25Nb2RhbENvbXBvbmVudCB7XG4gICAgQFZpZXdDaGlsZCgnbXlNb2RhbCcsIHsgc3RhdGljOiBmYWxzZSB9KSBtb2RhbDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpXG4gICAgcGllY2VJY29uSW5wdXQ6IFBpZWNlSWNvbklucHV0O1xuXG4gICAgQElucHV0KClcbiAgICBjb2xvciA9ICd3aGl0ZSc7XG5cbiAgICBvcGVuZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIG9uQ2xvc2VDYWxsYmFjazogKGluZGV4OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgICBvcGVuKGNsb3NlQ2FsbGJhY2s6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkNsb3NlQ2FsbGJhY2sgPSBjbG9zZUNhbGxiYWNrO1xuICAgICAgICB0aGlzLm1vZGFsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgY2hhbmdlU2VsZWN0aW9uKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25DbG9zZUNhbGxiYWNrKGluZGV4KTtcbiAgICB9XG5cbiAgICBnZXRQaWVjZUljb24ocGllY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjb2xvcmVkUGllY2UgPSAnJztcbiAgICAgICAgc3dpdGNoIChwaWVjZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICBjYXNlICdxdWVlbic6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlUXVlZW5VcmxcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5waWVjZUljb25JbnB1dC5ibGFja1F1ZWVuVXJsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncm9vayc6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlUm9va1VybFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnBpZWNlSWNvbklucHV0LmJsYWNrUm9va1VybDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Jpc2hvcCc6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlQmlzaG9wVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucGllY2VJY29uSW5wdXQuYmxhY2tCaXNob3BVcmw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdrbmlnaHQnOlxuICAgICAgICAgICAgICAgIGNvbG9yZWRQaWVjZSA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPT09ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5waWVjZUljb25JbnB1dC53aGl0ZUtuaWdodFVybFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnBpZWNlSWNvbklucHV0LmJsYWNrS25pZ2h0VXJsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY29pbic6XG4gICAgICAgICAgICAgICAgY29sb3JlZFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9PT0gJ3doaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBpZWNlSWNvbklucHV0LndoaXRlQ29pblVybFxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnBpZWNlSWNvbklucHV0LmJsYWNrQ29pblVybDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xvcmVkUGllY2U7XG4gICAgfVxufVxuIiwiPGRpdiAjbXlNb2RhbCBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2Utd3JhcHBlclwiICpuZ0lmPVwicGllY2VJY29uSW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDEpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgW3NyY109XCJnZXRQaWVjZUljb24oJ3F1ZWVuJylcIiBhbHQ9XCJRdWVlblwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWVjZVwiIChjbGljayk9XCJjaGFuZ2VTZWxlY3Rpb24oMilcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBbc3JjXT1cImdldFBpZWNlSWNvbigncm9vaycpXCIgYWx0PVwiUm9va1wiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWVjZVwiIChjbGljayk9XCJjaGFuZ2VTZWxlY3Rpb24oMylcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBbc3JjXT1cImdldFBpZWNlSWNvbignYmlzaG9wJylcIiBhbHQ9XCJCaXNob3BcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgW3NyY109XCJnZXRQaWVjZUljb24oJ2tuaWdodCcpXCIgYWx0PVwiS25pZ2h0XCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwaWVjZS13cmFwcGVyXCIgKm5nSWY9XCIhcGllY2VJY29uSW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDEpXCI+JiN4MjY1Qjs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDIpXCI+JiN4MjY1Qzs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDMpXCI+JiN4MjY1RDs8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGllY2VcIiAoY2xpY2spPVwiY2hhbmdlU2VsZWN0aW9uKDQpXCI+JiN4MjY1RTs8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl19