import { Bishop } from '../models/pieces/bishop';
import { Color } from '../models/pieces/color';
import { Knight } from '../models/pieces/knight';
import { Queen } from '../models/pieces/queen';
import { Rook } from '../models/pieces/rook';
import { UnicodeConstants } from '../utils/unicode-constants';
export class PiecePromotionResolver {
    static resolvePromotionChoice(board, piece, index) {
        const isWhite = piece.color === Color.WHITE;
        switch (index) {
            case 1:
                board.pieces.push(new Queen(piece.point, piece.color, isWhite
                    ? UnicodeConstants.WHITE_QUEEN
                    : UnicodeConstants.BLACK_QUEEN, board));
                break;
            case 2:
                board.pieces.push(new Rook(piece.point, piece.color, isWhite
                    ? UnicodeConstants.WHITE_ROOK
                    : UnicodeConstants.BLACK_ROOK, board));
                break;
            case 3:
                board.pieces.push(new Bishop(piece.point, piece.color, isWhite
                    ? UnicodeConstants.WHITE_BISHOP
                    : UnicodeConstants.BLACK_BISHOP, board));
                break;
            case 4:
                board.pieces.push(new Knight(piece.point, piece.color, isWhite
                    ? UnicodeConstants.WHITE_KNIGHT
                    : UnicodeConstants.BLACK_KNIGHT, board));
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllY2UtcHJvbW90aW9uLXJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNoZXNzLWJvYXJkL3NyYy9saWIvcGllY2UtcHJvbW90aW9uL3BpZWNlLXByb21vdGlvbi1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTlELE1BQU0sT0FBTyxzQkFBc0I7SUFFL0IsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQVksRUFBRSxLQUFZLEVBQUUsS0FBYTtRQUNuRSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUMsUUFBUSxLQUFLLEVBQUUsQ0FBQztZQUNaLEtBQUssQ0FBQztnQkFDRixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDYixJQUFJLEtBQUssQ0FDTCxLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxLQUFLLEVBQ1gsT0FBTztvQkFDSCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsV0FBVztvQkFDOUIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFDbEMsS0FBSyxDQUNSLENBQ0osQ0FBQztnQkFDRixNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNiLElBQUksSUFBSSxDQUNKLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLEtBQUssRUFDWCxPQUFPO29CQUNILENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVO29CQUM3QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUNqQyxLQUFLLENBQ1IsQ0FDSixDQUFDO2dCQUNGLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2IsSUFBSSxNQUFNLENBQ04sS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsS0FBSyxFQUNYLE9BQU87b0JBQ0gsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFlBQVk7b0JBQy9CLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQ25DLEtBQUssQ0FDUixDQUNKLENBQUM7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDYixJQUFJLE1BQU0sQ0FDTixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxLQUFLLEVBQ1gsT0FBTztvQkFDSCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsWUFBWTtvQkFDL0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFDbkMsS0FBSyxDQUNSLENBQ0osQ0FBQztnQkFDRixNQUFNO1FBQ2QsQ0FBQztJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvYXJkIH0gZnJvbSAnLi4vbW9kZWxzL2JvYXJkJztcbmltcG9ydCB7IEJpc2hvcCB9IGZyb20gJy4uL21vZGVscy9waWVjZXMvYmlzaG9wJztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnLi4vbW9kZWxzL3BpZWNlcy9jb2xvcic7XG5pbXBvcnQgeyBLbmlnaHQgfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL2tuaWdodCc7XG5pbXBvcnQgeyBQaWVjZSB9IGZyb20gJy4uL21vZGVscy9waWVjZXMvcGllY2UnO1xuaW1wb3J0IHsgUXVlZW4gfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL3F1ZWVuJztcbmltcG9ydCB7IFJvb2sgfSBmcm9tICcuLi9tb2RlbHMvcGllY2VzL3Jvb2snO1xuaW1wb3J0IHsgVW5pY29kZUNvbnN0YW50cyB9IGZyb20gJy4uL3V0aWxzL3VuaWNvZGUtY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIFBpZWNlUHJvbW90aW9uUmVzb2x2ZXIge1xuXG4gICAgc3RhdGljIHJlc29sdmVQcm9tb3Rpb25DaG9pY2UoYm9hcmQ6IEJvYXJkLCBwaWVjZTogUGllY2UsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaXNXaGl0ZSA9IHBpZWNlLmNvbG9yID09PSBDb2xvci5XSElURTtcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJvYXJkLnBpZWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUXVlZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWVjZS5wb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNXaGl0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gVW5pY29kZUNvbnN0YW50cy5XSElURV9RVUVFTlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogVW5pY29kZUNvbnN0YW50cy5CTEFDS19RVUVFTixcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGJvYXJkLnBpZWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUm9vayhcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlLnBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGllY2UuY29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1doaXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBVbmljb2RlQ29uc3RhbnRzLldISVRFX1JPT0tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFVuaWNvZGVDb25zdGFudHMuQkxBQ0tfUk9PSyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGJvYXJkLnBpZWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgQmlzaG9wKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGllY2UucG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWVjZS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2hpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFVuaWNvZGVDb25zdGFudHMuV0hJVEVfQklTSE9QXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBVbmljb2RlQ29uc3RhbnRzLkJMQUNLX0JJU0hPUCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGJvYXJkLnBpZWNlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBuZXcgS25pZ2h0KFxuICAgICAgICAgICAgICAgICAgICAgICAgcGllY2UucG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWVjZS5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzV2hpdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFVuaWNvZGVDb25zdGFudHMuV0hJVEVfS05JR0hUXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBVbmljb2RlQ29uc3RhbnRzLkJMQUNLX0tOSUdIVCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=