import { DefaultFenProcessor, } from './fen-loader/default-fen-processor';
import { DefaultPgnProcessor } from './pgn-loader/default-pgn-processor';
export class NotationProcessorFactory {
    static getProcessor(type) {
        switch (type) {
            case NotationType.FEN:
                return new DefaultFenProcessor();
            case NotationType.PGN:
                return new DefaultPgnProcessor();
        }
    }
    static getDefaultProcessor() {
        return new DefaultFenProcessor();
    }
}
export var NotationType;
(function (NotationType) {
    NotationType[NotationType["FEN"] = 1] = "FEN";
    NotationType[NotationType["PGN"] = 2] = "PGN";
})(NotationType || (NotationType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90YXRpb24tcHJvY2Vzc29yLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY2hlc3MtYm9hcmQvc3JjL2xpYi9lbmdpbmUvYm9hcmQtc3RhdGUtcHJvdmlkZXIvYm9hcmQtbG9hZGVyL25vdGF0aW9uLXByb2Nlc3NvcnMvbm90YXRpb24tcHJvY2Vzc29yLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNILG1CQUFtQixHQUN0QixNQUFNLG9DQUFvQyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXpFLE1BQU0sT0FBTyx3QkFBd0I7SUFFakMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFrQjtRQUNsQyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ1gsS0FBSyxZQUFZLENBQUMsR0FBRztnQkFDakIsT0FBTyxJQUFJLG1CQUFtQixFQUFFLENBQUM7WUFFckMsS0FBSyxZQUFZLENBQUMsR0FBRztnQkFDakIsT0FBTyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFFekMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQW1CO1FBQ3RCLE9BQU8sSUFBSSxtQkFBbUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FFSjtBQUVELE1BQU0sQ0FBTixJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsNkNBQU8sQ0FBQTtJQUNQLDZDQUFPLENBQUE7QUFDWCxDQUFDLEVBSFcsWUFBWSxLQUFaLFlBQVksUUFHdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb3RhdGlvblByb2Nlc3NvciB9IGZyb20gJy4vbm90YXRpb24tcHJvY2Vzc29yJztcbmltcG9ydCB7XG4gICAgRGVmYXVsdEZlblByb2Nlc3Nvcixcbn0gZnJvbSAnLi9mZW4tbG9hZGVyL2RlZmF1bHQtZmVuLXByb2Nlc3Nvcic7XG5pbXBvcnQgeyBEZWZhdWx0UGduUHJvY2Vzc29yIH0gZnJvbSAnLi9wZ24tbG9hZGVyL2RlZmF1bHQtcGduLXByb2Nlc3Nvcic7XG5cbmV4cG9ydCBjbGFzcyBOb3RhdGlvblByb2Nlc3NvckZhY3Rvcnkge1xuXG4gICAgc3RhdGljIGdldFByb2Nlc3Nvcih0eXBlOiBOb3RhdGlvblR5cGUpOiBOb3RhdGlvblByb2Nlc3NvciB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBOb3RhdGlvblR5cGUuRkVOOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGVmYXVsdEZlblByb2Nlc3NvcigpO1xuXG4gICAgICAgICAgICBjYXNlIE5vdGF0aW9uVHlwZS5QR046XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWZhdWx0UGduUHJvY2Vzc29yKCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXREZWZhdWx0UHJvY2Vzc29yKCk6IE5vdGF0aW9uUHJvY2Vzc29yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEZWZhdWx0RmVuUHJvY2Vzc29yKCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBlbnVtIE5vdGF0aW9uVHlwZSB7XG4gICAgRkVOID0gMSxcbiAgICBQR04gPSAyXG59XG4iXX0=