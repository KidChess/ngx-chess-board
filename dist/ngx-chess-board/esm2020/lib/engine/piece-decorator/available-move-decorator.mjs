import { MoveUtils } from '../../utils/move-utils';
import { PieceAbstractDecorator } from './piece-abstract-decorator';
export class AvailableMoveDecorator extends PieceAbstractDecorator {
    constructor(piece, pointClicked, color, board) {
        super(piece);
        this.pointClicked = pointClicked;
        this.color = color;
        this.board = board;
    }
    getPossibleCaptures() {
        return this.piece
            .getPossibleCaptures()
            .filter((point) => !MoveUtils.willMoveCauseCheck(this.color, this.pointClicked.row, this.pointClicked.col, point.row, point.col, this.board));
    }
    getPossibleMoves() {
        return this.piece
            .getPossibleMoves()
            .filter((point) => !MoveUtils.willMoveCauseCheck(this.color, this.pointClicked.row, this.pointClicked.col, point.row, point.col, this.board));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlLW1vdmUtZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNoZXNzLWJvYXJkL3NyYy9saWIvZW5naW5lL3BpZWNlLWRlY29yYXRvci9hdmFpbGFibGUtbW92ZS1kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXBFLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxzQkFBc0I7SUFLOUQsWUFBWSxLQUFvQixFQUFFLFlBQW1CLEVBQUUsS0FBWSxFQUFFLEtBQVk7UUFDN0UsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELG1CQUFtQjtRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUs7YUFDWixtQkFBbUIsRUFBRTthQUNyQixNQUFNLENBQ0gsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNOLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUN6QixJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFDckIsS0FBSyxDQUFDLEdBQUcsRUFDVCxLQUFLLENBQUMsR0FBRyxFQUNULElBQUksQ0FBQyxLQUFLLENBQ2IsQ0FDUixDQUFDO0lBQ1YsQ0FBQztJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUs7YUFDWixnQkFBZ0IsRUFBRTthQUNsQixNQUFNLENBQ0gsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNOLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUN6QixJQUFJLENBQUMsS0FBSyxFQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFDckIsS0FBSyxDQUFDLEdBQUcsRUFDVCxLQUFLLENBQUMsR0FBRyxFQUNULElBQUksQ0FBQyxLQUFLLENBQ2IsQ0FDUixDQUFDO0lBQ1YsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9hcmQgfSBmcm9tICcuLi8uLi9tb2RlbHMvYm9hcmQnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGllY2VzL2NvbG9yJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BpZWNlcy9wb2ludCc7XG5pbXBvcnQgeyBNb3ZlVXRpbHMgfSBmcm9tICcuLi8uLi91dGlscy9tb3ZlLXV0aWxzJztcbmltcG9ydCB7IEFic3RyYWN0UGllY2UgfSBmcm9tICcuL2Fic3RyYWN0LXBpZWNlJztcbmltcG9ydCB7IFBpZWNlQWJzdHJhY3REZWNvcmF0b3IgfSBmcm9tICcuL3BpZWNlLWFic3RyYWN0LWRlY29yYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBBdmFpbGFibGVNb3ZlRGVjb3JhdG9yIGV4dGVuZHMgUGllY2VBYnN0cmFjdERlY29yYXRvciB7XG4gICAgcHJpdmF0ZSBwb2ludENsaWNrZWQ6IFBvaW50O1xuICAgIHByaXZhdGUgY29sb3I6IENvbG9yO1xuICAgIHByaXZhdGUgYm9hcmQ6IEJvYXJkO1xuXG4gICAgY29uc3RydWN0b3IocGllY2U6IEFic3RyYWN0UGllY2UsIHBvaW50Q2xpY2tlZDogUG9pbnQsIGNvbG9yOiBDb2xvciwgYm9hcmQ6IEJvYXJkKSB7XG4gICAgICAgIHN1cGVyKHBpZWNlKTtcbiAgICAgICAgdGhpcy5wb2ludENsaWNrZWQgPSBwb2ludENsaWNrZWQ7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIH1cblxuICAgIGdldFBvc3NpYmxlQ2FwdHVyZXMoKTogUG9pbnRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpZWNlXG4gICAgICAgICAgICAuZ2V0UG9zc2libGVDYXB0dXJlcygpXG4gICAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChwb2ludCkgPT5cbiAgICAgICAgICAgICAgICAgICAgIU1vdmVVdGlscy53aWxsTW92ZUNhdXNlQ2hlY2soXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludENsaWNrZWQucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludENsaWNrZWQuY29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQuY29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGdldFBvc3NpYmxlTW92ZXMoKTogUG9pbnRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpZWNlXG4gICAgICAgICAgICAuZ2V0UG9zc2libGVNb3ZlcygpXG4gICAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChwb2ludCkgPT5cbiAgICAgICAgICAgICAgICAgICAgIU1vdmVVdGlscy53aWxsTW92ZUNhdXNlQ2hlY2soXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludENsaWNrZWQucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludENsaWNrZWQuY29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQucm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnQuY29sLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==