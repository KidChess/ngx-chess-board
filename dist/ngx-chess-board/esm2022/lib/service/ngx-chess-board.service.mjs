import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class NgxChessBoardService {
    componentMethodCallSource = new Subject();
    componentMethodCalled$ = this.componentMethodCallSource.asObservable();
    reset() {
        this.componentMethodCallSource.next();
    }
    static ɵfac = function NgxChessBoardService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NgxChessBoardService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NgxChessBoardService, factory: NgxChessBoardService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgxChessBoardService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNoZXNzLWJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY2hlc3MtYm9hcmQvc3JjL2xpYi9zZXJ2aWNlL25neC1jaGVzcy1ib2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFLL0IsTUFBTSxPQUFPLG9CQUFvQjtJQUNyQix5QkFBeUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO0lBRXZELHNCQUFzQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUV2RSxLQUFLO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFDLENBQUM7OEdBUFEsb0JBQW9CO2dFQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CLG1CQUZqQixNQUFNOztpRkFFVCxvQkFBb0I7Y0FIaEMsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDaGVzc0JvYXJkU2VydmljZSB7XG4gICAgcHJpdmF0ZSBjb21wb25lbnRNZXRob2RDYWxsU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgY29tcG9uZW50TWV0aG9kQ2FsbGVkJCA9IHRoaXMuY29tcG9uZW50TWV0aG9kQ2FsbFNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1ldGhvZENhbGxTb3VyY2UubmV4dCgpO1xuICAgIH1cbn1cbiJdfQ==