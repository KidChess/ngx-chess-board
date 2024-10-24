export class DrawPoint {
    x;
    y;
    color;
    constructor(x, y, color) {
        this.x = x + 0.5;
        this.y = y + 0.5;
        this.color = color;
    }
    isEqual(that) {
        return that && that.x === this.x && this.y === that.y;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhdy1wb2ludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL2VuZ2luZS9kcmF3aW5nLXRvb2xzL2RyYXctcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFNBQVM7SUFDbEIsQ0FBQyxDQUFTO0lBQ1YsQ0FBQyxDQUFTO0lBQ1YsS0FBSyxDQUFTO0lBRWQsWUFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWE7UUFDM0MsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQWU7UUFDbkIsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRHJhd1BvaW50IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIGNvbG9yOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xuICAgICAgICB0aGlzLnggPSB4ICsgMC41O1xuICAgICAgICB0aGlzLnkgPSB5ICsgMC41O1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgfVxuXG4gICAgaXNFcXVhbCh0aGF0OiBEcmF3UG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoYXQgJiYgdGhhdC54ID09PSB0aGlzLnggJiYgdGhpcy55ID09PSB0aGF0Lnk7XG4gICAgfVxufVxuIl19