import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChessBoardComponent } from './ngx-chess-board.component';
import { PiecePromotionModalComponent } from './piece-promotion/piece-promotion-modal/piece-promotion-modal.component';
import { NgxChessBoardService } from './service/ngx-chess-board.service';
import * as i0 from "@angular/core";
export class NgxChessBoardModule {
    static forRoot() {
        return {
            ngModule: NgxChessBoardModule,
            providers: [NgxChessBoardService],
        };
    }
}
NgxChessBoardModule.ɵfac = function NgxChessBoardModule_Factory(t) { return new (t || NgxChessBoardModule)(); };
NgxChessBoardModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgxChessBoardModule });
NgxChessBoardModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule, DragDropModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChessBoardModule, [{
        type: NgModule,
        args: [{
                declarations: [NgxChessBoardComponent, PiecePromotionModalComponent],
                imports: [CommonModule, DragDropModule],
                exports: [NgxChessBoardComponent],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgxChessBoardModule, { declarations: [NgxChessBoardComponent, PiecePromotionModalComponent], imports: [CommonModule, DragDropModule], exports: [NgxChessBoardComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoZXNzLWJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL25neC1jaGVzcy1ib2FyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5RUFBeUUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFPekUsTUFBTSxPQUFPLG1CQUFtQjtJQUM1QixNQUFNLENBQUMsT0FBTztRQUNWLE9BQU87WUFDSCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQ3BDLENBQUM7SUFDTixDQUFDOztzRkFOUSxtQkFBbUI7cUVBQW5CLG1CQUFtQjt5RUFIbkIsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO3VGQUc5QixtQkFBbUI7Y0FML0IsUUFBUTtlQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLHNCQUFzQixFQUFFLDRCQUE0QixDQUFDO2dCQUNwRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO2dCQUN2QyxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNwQzs7d0ZBQ1ksbUJBQW1CLG1CQUpiLHNCQUFzQixFQUFFLDRCQUE0QixhQUN6RCxZQUFZLEVBQUUsY0FBYyxhQUM1QixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hDaGVzc0JvYXJkQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtY2hlc3MtYm9hcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFBpZWNlUHJvbW90aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3BpZWNlLXByb21vdGlvbi9waWVjZS1wcm9tb3Rpb24tbW9kYWwvcGllY2UtcHJvbW90aW9uLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hDaGVzc0JvYXJkU2VydmljZSB9IGZyb20gJy4vc2VydmljZS9uZ3gtY2hlc3MtYm9hcmQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbTmd4Q2hlc3NCb2FyZENvbXBvbmVudCwgUGllY2VQcm9tb3Rpb25Nb2RhbENvbXBvbmVudF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRHJhZ0Ryb3BNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtOZ3hDaGVzc0JvYXJkQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4Q2hlc3NCb2FyZE1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxOZ3hDaGVzc0JvYXJkTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogTmd4Q2hlc3NCb2FyZE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW05neENoZXNzQm9hcmRTZXJ2aWNlXSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=