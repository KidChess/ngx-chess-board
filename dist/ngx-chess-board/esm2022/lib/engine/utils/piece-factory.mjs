import { Bishop } from '../../models/pieces/bishop';
import { Coin } from '../../models/pieces/coin';
import { Color } from '../../models/pieces/color';
import { King } from '../../models/pieces/king';
import { Knight } from '../../models/pieces/knight';
import { Pawn } from '../../models/pieces/pawn';
import { Point } from '../../models/pieces/point';
import { Queen } from '../../models/pieces/queen';
import { Rook } from '../../models/pieces/rook';
import { ColorInput, PieceTypeInput, } from '../../utils/inputs/piece-type-input';
import { UnicodeConstants } from '../../utils/unicode-constants';
export class PieceFactory {
    static create(indexes, pieceTypeInput, colorInput, board) {
        let piece;
        let color = colorInput === ColorInput.LIGHT ? Color.WHITE : Color.BLACK;
        switch (pieceTypeInput) {
            case PieceTypeInput.QUEEN:
                piece = new Queen(new Point(indexes.yAxis, indexes.xAxis), color, color === Color.WHITE
                    ? UnicodeConstants.WHITE_QUEEN
                    : UnicodeConstants.BLACK_QUEEN, board);
                break;
            case PieceTypeInput.KING:
                piece = new King(new Point(indexes.yAxis, indexes.xAxis), color, color === Color.WHITE
                    ? UnicodeConstants.WHITE_KING
                    : UnicodeConstants.BLACK_KING, board);
                break;
            case PieceTypeInput.KNIGHT:
                piece = new Knight(new Point(indexes.yAxis, indexes.xAxis), color, color === Color.WHITE
                    ? UnicodeConstants.WHITE_KNIGHT
                    : UnicodeConstants.BLACK_KNIGHT, board);
                break;
            case PieceTypeInput.BISHOP:
                piece = new Bishop(new Point(indexes.yAxis, indexes.xAxis), color, color === Color.WHITE
                    ? UnicodeConstants.WHITE_BISHOP
                    : UnicodeConstants.BLACK_BISHOP, board);
                break;
            case PieceTypeInput.ROOK:
                piece = new Rook(new Point(indexes.yAxis, indexes.xAxis), color, color === Color.WHITE
                    ? UnicodeConstants.WHITE_ROOK
                    : UnicodeConstants.BLACK_ROOK, board);
                break;
            case PieceTypeInput.PAWN:
                piece = new Pawn(new Point(indexes.yAxis, indexes.xAxis), color, color === Color.WHITE
                    ? UnicodeConstants.WHITE_PAWN
                    : UnicodeConstants.BLACK_PAWN, board);
                break;
            case PieceTypeInput.COIN:
                piece = new Coin(new Point(indexes.yAxis, indexes.xAxis), color, color === Color.WHITE
                    ? UnicodeConstants.WHITE_COIN
                    : UnicodeConstants.BLACK_COIN, board);
                break;
        }
        return piece;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllY2UtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL2VuZ2luZS91dGlscy9waWVjZS1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELE9BQU8sRUFDSCxVQUFVLEVBQ1YsY0FBYyxHQUNqQixNQUFNLHFDQUFxQyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWpFLE1BQU0sT0FBTyxZQUFZO0lBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQ1QsT0FBd0IsRUFDeEIsY0FBOEIsRUFDOUIsVUFBc0IsRUFDdEIsS0FBWTtRQUVaLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxLQUFLLEdBQUcsVUFBVSxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFFeEUsUUFBUSxjQUFjLEVBQUUsQ0FB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QUFDO0lBQ2pCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvYXJkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2JvYXJkJztcbmltcG9ydCB7IE1vdmVUcmFuc2xhdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9tb3ZlLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IEJpc2hvcCB9IGZyb20gJy4uLy4uL21vZGVscy9waWVjZXMvYmlzaG9wJztcbmltcG9ydCB7IENvaW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvcGllY2VzL2NvaW4nO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGllY2VzL2NvbG9yJztcbmltcG9ydCB7IEtpbmcgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGllY2VzL2tpbmcnO1xuaW1wb3J0IHsgS25pZ2h0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BpZWNlcy9rbmlnaHQnO1xuaW1wb3J0IHsgUGF3biB9IGZyb20gJy4uLy4uL21vZGVscy9waWVjZXMvcGF3bic7XG5pbXBvcnQgeyBQaWVjZSB9IGZyb20gJy4uLy4uL21vZGVscy9waWVjZXMvcGllY2UnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGllY2VzL3BvaW50JztcbmltcG9ydCB7IFF1ZWVuIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BpZWNlcy9xdWVlbic7XG5pbXBvcnQgeyBSb29rIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BpZWNlcy9yb29rJztcbmltcG9ydCB7XG4gICAgQ29sb3JJbnB1dCxcbiAgICBQaWVjZVR5cGVJbnB1dCxcbn0gZnJvbSAnLi4vLi4vdXRpbHMvaW5wdXRzL3BpZWNlLXR5cGUtaW5wdXQnO1xuaW1wb3J0IHsgVW5pY29kZUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaWNvZGUtY29uc3RhbnRzJztcblxuZXhwb3J0IGNsYXNzIFBpZWNlRmFjdG9yeSB7XG4gICAgc3RhdGljIGNyZWF0ZShcbiAgICAgICAgaW5kZXhlczogTW92ZVRyYW5zbGF0aW9uLFxuICAgICAgICBwaWVjZVR5cGVJbnB1dDogUGllY2VUeXBlSW5wdXQsXG4gICAgICAgIGNvbG9ySW5wdXQ6IENvbG9ySW5wdXQsXG4gICAgICAgIGJvYXJkOiBCb2FyZCxcbiAgICApOiBQaWVjZSB7XG4gICAgICAgIGxldCBwaWVjZTtcbiAgICAgICAgbGV0IGNvbG9yID0gY29sb3JJbnB1dCA9PT0gQ29sb3JJbnB1dC5MSUdIVCA/IENvbG9yLldISVRFIDogQ29sb3IuQkxBQ0s7XG5cbiAgICAgICAgc3dpdGNoIChwaWVjZVR5cGVJbnB1dCkge1xuICAgICAgICAgICAgY2FzZSBQaWVjZVR5cGVJbnB1dC5RVUVFTjpcbiAgICAgICAgICAgICAgICBwaWVjZSA9IG5ldyBRdWVlbihcbiAgICAgICAgICAgICAgICAgICAgbmV3IFBvaW50KGluZGV4ZXMueUF4aXMsIGluZGV4ZXMueEF4aXMpLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPT09IENvbG9yLldISVRFXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFVuaWNvZGVDb25zdGFudHMuV0hJVEVfUVVFRU5cbiAgICAgICAgICAgICAgICAgICAgICAgIDogVW5pY29kZUNvbnN0YW50cy5CTEFDS19RVUVFTixcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGllY2VUeXBlSW5wdXQuS0lORzpcbiAgICAgICAgICAgICAgICBwaWVjZSA9IG5ldyBLaW5nKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUG9pbnQoaW5kZXhlcy55QXhpcywgaW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9PT0gQ29sb3IuV0hJVEVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gVW5pY29kZUNvbnN0YW50cy5XSElURV9LSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFVuaWNvZGVDb25zdGFudHMuQkxBQ0tfS0lORyxcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQsXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQaWVjZVR5cGVJbnB1dC5LTklHSFQ6XG4gICAgICAgICAgICAgICAgcGllY2UgPSBuZXcgS25pZ2h0KFxuICAgICAgICAgICAgICAgICAgICBuZXcgUG9pbnQoaW5kZXhlcy55QXhpcywgaW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9PT0gQ29sb3IuV0hJVEVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gVW5pY29kZUNvbnN0YW50cy5XSElURV9LTklHSFRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogVW5pY29kZUNvbnN0YW50cy5CTEFDS19LTklHSFQsXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBpZWNlVHlwZUlucHV0LkJJU0hPUDpcbiAgICAgICAgICAgICAgICBwaWVjZSA9IG5ldyBCaXNob3AoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQb2ludChpbmRleGVzLnlBeGlzLCBpbmRleGVzLnhBeGlzKSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID09PSBDb2xvci5XSElURVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBVbmljb2RlQ29uc3RhbnRzLldISVRFX0JJU0hPUFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBVbmljb2RlQ29uc3RhbnRzLkJMQUNLX0JJU0hPUCxcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGllY2VUeXBlSW5wdXQuUk9PSzpcbiAgICAgICAgICAgICAgICBwaWVjZSA9IG5ldyBSb29rKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUG9pbnQoaW5kZXhlcy55QXhpcywgaW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9PT0gQ29sb3IuV0hJVEVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gVW5pY29kZUNvbnN0YW50cy5XSElURV9ST09LXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFVuaWNvZGVDb25zdGFudHMuQkxBQ0tfUk9PSyxcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGllY2VUeXBlSW5wdXQuUEFXTjpcbiAgICAgICAgICAgICAgICBwaWVjZSA9IG5ldyBQYXduKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUG9pbnQoaW5kZXhlcy55QXhpcywgaW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9PT0gQ29sb3IuV0hJVEVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gVW5pY29kZUNvbnN0YW50cy5XSElURV9QQVdOXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFVuaWNvZGVDb25zdGFudHMuQkxBQ0tfUEFXTixcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGllY2VUeXBlSW5wdXQuQ09JTjpcbiAgICAgICAgICAgICAgICBwaWVjZSA9IG5ldyBDb2luKFxuICAgICAgICAgICAgICAgICAgICBuZXcgUG9pbnQoaW5kZXhlcy55QXhpcywgaW5kZXhlcy54QXhpcyksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9PT0gQ29sb3IuV0hJVEVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gVW5pY29kZUNvbnN0YW50cy5XSElURV9DT0lOXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFVuaWNvZGVDb25zdGFudHMuQkxBQ0tfQ09JTixcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwaWVjZTtcbiAgICB9XG59XG4iXX0=