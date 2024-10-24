export class Piece {
    point;
    color;
    constant;
    checkPoints = [];
    relValue;
    board;
    constructor(point, color, constant, relValue, board) {
        this.color = color;
        this.constant = constant;
        this.point = point;
        this.relValue = relValue;
        this.board = board;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY2hlc3MtYm9hcmQvc3JjL2xpYi9tb2RlbHMvcGllY2VzL3BpZWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sT0FBZ0IsS0FBSztJQUN2QixLQUFLLENBQVE7SUFDYixLQUFLLENBQVE7SUFDYixRQUFRLENBQWdCO0lBQ3hCLFdBQVcsR0FBWSxFQUFFLENBQUM7SUFDMUIsUUFBUSxDQUFTO0lBQ2pCLEtBQUssQ0FBUTtJQUViLFlBQ0ksS0FBWSxFQUNaLEtBQVksRUFDWixRQUF1QixFQUN2QixRQUFnQixFQUNoQixLQUFZO1FBRVosSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztDQU9KIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RQaWVjZSB9IGZyb20gJy4uLy4uL2VuZ2luZS9waWVjZS1kZWNvcmF0b3IvYWJzdHJhY3QtcGllY2UnO1xuaW1wb3J0IHsgUGllY2VDb25zdGFudCB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaWNvZGUtY29uc3RhbnRzJztcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSAnLi4vYm9hcmQnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuL2NvbG9yJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi9wb2ludCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQaWVjZSBpbXBsZW1lbnRzIEFic3RyYWN0UGllY2Uge1xuICAgIHBvaW50OiBQb2ludDtcbiAgICBjb2xvcjogQ29sb3I7XG4gICAgY29uc3RhbnQ6IFBpZWNlQ29uc3RhbnQ7XG4gICAgY2hlY2tQb2ludHM6IFBvaW50W10gPSBbXTtcbiAgICByZWxWYWx1ZTogbnVtYmVyO1xuICAgIGJvYXJkOiBCb2FyZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwb2ludDogUG9pbnQsXG4gICAgICAgIGNvbG9yOiBDb2xvcixcbiAgICAgICAgY29uc3RhbnQ6IFBpZWNlQ29uc3RhbnQsXG4gICAgICAgIHJlbFZhbHVlOiBudW1iZXIsXG4gICAgICAgIGJvYXJkOiBCb2FyZFxuICAgICkge1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuY29uc3RhbnQgPSBjb25zdGFudDtcbiAgICAgICAgdGhpcy5wb2ludCA9IHBvaW50O1xuICAgICAgICB0aGlzLnJlbFZhbHVlID0gcmVsVmFsdWU7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXRQb3NzaWJsZU1vdmVzKCk6IFBvaW50W107XG5cbiAgICBhYnN0cmFjdCBnZXRQb3NzaWJsZUNhcHR1cmVzKCk6IFBvaW50W107XG5cbiAgICBhYnN0cmFjdCBnZXRDb3ZlcmVkRmllbGRzKCk6IFBvaW50W107IC8vIHp3cmFjYSBsaXN0ZSBwdW5rdG93IGt0b3JlIHNhIHB1c3RlIGx1YiBpc3RuaWVqZSBuYSBuaWNoIHBpb25layB0ZWdvIHNhbWVnbyBrb2xvcnVcbn1cbiJdfQ==