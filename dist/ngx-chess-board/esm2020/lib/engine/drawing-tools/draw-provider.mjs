import { BehaviorSubject } from 'rxjs';
export class DrawProvider {
    constructor() {
        this.arrowsSubject$ = new BehaviorSubject([]);
        this.circlesSubject$ = new BehaviorSubject([]);
        this.arrows$ = this.arrowsSubject$.asObservable();
        this.circles$ = this.circlesSubject$.asObservable();
    }
    get circles() {
        return this.circlesSubject$.value;
    }
    set circles(circles) {
        this.circlesSubject$.next(circles);
    }
    get arrows() {
        return this.arrowsSubject$.value;
    }
    set arrows(arrows) {
        this.arrowsSubject$.next(arrows);
    }
    addCircle(circle) {
        this.circles = [...this.circles, circle];
    }
    reomveCircle(removeCircle) {
        this.circles = this.circles.filter((circle) => !circle.isEqual(removeCircle));
    }
    addArrow(arrow) {
        this.arrows = [...this.arrows, arrow];
    }
    removeArrow(removeArrow) {
        this.arrows = this.arrows.filter((arrow) => !arrow.isEqual(removeArrow));
    }
    containsCircle(checkCircle) {
        return this.circles.some((circle) => circle.isEqual(checkCircle));
    }
    containsArrow(checkArrow) {
        return this.arrows.some((arrow) => arrow.isEqual(checkArrow));
    }
    clear() {
        this.arrows = [];
        this.circles = [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhdy1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL2VuZ2luZS9kcmF3aW5nLXRvb2xzL2RyYXctcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUl2QyxNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNZLG1CQUFjLEdBQUcsSUFBSSxlQUFlLENBQVUsRUFBRSxDQUFDLENBQUM7UUFDbEQsb0JBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztRQUVyRCxZQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QyxhQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQThDMUQsQ0FBQztJQTVDRyxJQUFZLE9BQU87UUFDZixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFZLE9BQU8sQ0FBQyxPQUFpQjtRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBWSxNQUFNO1FBQ2QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBWSxNQUFNLENBQUMsTUFBZTtRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsWUFBWSxDQUFDLFlBQW9CO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWTtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXLENBQUMsV0FBa0I7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUFtQjtRQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUFpQjtRQUMzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFycm93IH0gZnJvbSAnLi9zaGFwZXMvYXJyb3cnO1xuaW1wb3J0IHsgQ2lyY2xlIH0gZnJvbSAnLi9zaGFwZXMvY2lyY2xlJztcblxuZXhwb3J0IGNsYXNzIERyYXdQcm92aWRlciB7XG4gICAgcHJpdmF0ZSBhcnJvd3NTdWJqZWN0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyb3dbXT4oW10pO1xuICAgIHByaXZhdGUgY2lyY2xlc1N1YmplY3QkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDaXJjbGVbXT4oW10pO1xuXG4gICAgcHVibGljIGFycm93cyQgPSB0aGlzLmFycm93c1N1YmplY3QkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHB1YmxpYyBjaXJjbGVzJCA9IHRoaXMuY2lyY2xlc1N1YmplY3QkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgcHJpdmF0ZSBnZXQgY2lyY2xlcygpOiBDaXJjbGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNpcmNsZXNTdWJqZWN0JC52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBjaXJjbGVzKGNpcmNsZXM6IENpcmNsZVtdKSB7XG4gICAgICAgIHRoaXMuY2lyY2xlc1N1YmplY3QkLm5leHQoY2lyY2xlcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgYXJyb3dzKCk6IEFycm93W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnJvd3NTdWJqZWN0JC52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldCBhcnJvd3MoYXJyb3dzOiBBcnJvd1tdKSB7XG4gICAgICAgIHRoaXMuYXJyb3dzU3ViamVjdCQubmV4dChhcnJvd3MpO1xuICAgIH1cblxuICAgIGFkZENpcmNsZShjaXJjbGU6IENpcmNsZSkge1xuICAgICAgICB0aGlzLmNpcmNsZXMgPSBbLi4udGhpcy5jaXJjbGVzLCBjaXJjbGVdO1xuICAgIH1cblxuICAgIHJlb212ZUNpcmNsZShyZW1vdmVDaXJjbGU6IENpcmNsZSkge1xuICAgICAgICB0aGlzLmNpcmNsZXMgPSB0aGlzLmNpcmNsZXMuZmlsdGVyKChjaXJjbGUpID0+ICFjaXJjbGUuaXNFcXVhbChyZW1vdmVDaXJjbGUpKTtcbiAgICB9XG5cbiAgICBhZGRBcnJvdyhhcnJvdzogQXJyb3cpIHtcbiAgICAgICAgdGhpcy5hcnJvd3MgPSBbLi4udGhpcy5hcnJvd3MsIGFycm93XTtcbiAgICB9XG5cbiAgICByZW1vdmVBcnJvdyhyZW1vdmVBcnJvdzogQXJyb3cpIHtcbiAgICAgICAgdGhpcy5hcnJvd3MgPSB0aGlzLmFycm93cy5maWx0ZXIoKGFycm93KSA9PiAhYXJyb3cuaXNFcXVhbChyZW1vdmVBcnJvdykpO1xuICAgIH1cblxuICAgIGNvbnRhaW5zQ2lyY2xlKGNoZWNrQ2lyY2xlOiBDaXJjbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2lyY2xlcy5zb21lKChjaXJjbGUpID0+IGNpcmNsZS5pc0VxdWFsKGNoZWNrQ2lyY2xlKSk7XG4gICAgfVxuXG4gICAgY29udGFpbnNBcnJvdyhjaGVja0Fycm93OiBBcnJvdykge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnJvd3Muc29tZSgoYXJyb3c6IEFycm93KSA9PiBhcnJvdy5pc0VxdWFsKGNoZWNrQXJyb3cpKTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5hcnJvd3MgPSBbXTtcbiAgICAgICAgdGhpcy5jaXJjbGVzID0gW107XG4gICAgfVxufVxuIl19