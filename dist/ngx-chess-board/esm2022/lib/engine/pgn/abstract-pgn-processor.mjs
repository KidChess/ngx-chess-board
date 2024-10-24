export class AbstractPgnProcessor {
    pgn = [];
    currentIndex = 0.5;
    getPGN() {
        return this.pgn.join(' ');
    }
    getLast() {
        return this.pgn[this.pgn.length - 1];
    }
    appendToLast(str) {
        this.pgn[this.pgn.length - 1] = this.getLast() + str;
    }
    processChecks(checkmate, check, stalemate) {
        if (checkmate) {
            this.appendToLast('#');
        }
        else {
            if (check) {
                this.appendToLast('+');
            }
        }
    }
    reset() {
        this.pgn = [];
        this.currentIndex = 0.5;
    }
    addPromotionChoice(promotion) {
        switch (promotion) {
            case 1:
                this.appendToLast('=Q');
                break;
            case 2:
                this.appendToLast('=R');
                break;
            case 3:
                this.appendToLast('=B');
                break;
            case 4:
                this.appendToLast('=N');
                break;
        }
    }
    removeLast() {
        this.pgn.pop();
        this.currentIndex -= 0.5;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcGduLXByb2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL2VuZ2luZS9wZ24vYWJzdHJhY3QtcGduLXByb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxNQUFNLE9BQWdCLG9CQUFvQjtJQUU1QixHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ1QsWUFBWSxHQUFHLEdBQUcsQ0FBQztJQVN0QixNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRVMsT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsWUFBWSxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3pELENBQUM7SUFFRCxhQUFhLENBQUMsU0FBa0IsRUFBRSxLQUFjLEVBQUUsU0FBa0I7UUFDaEUsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsQ0FBQzthQUFNLENBQUM7WUFDSixJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVELGtCQUFrQixDQUFDLFNBQVM7UUFDeEIsUUFBUSxTQUFTLEVBQUUsQ0FBQztZQUNoQixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtRQUNkLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQztJQUM3QixDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb2FyZCB9IGZyb20gJy4uLy4uL21vZGVscy9ib2FyZCc7XG5pbXBvcnQgeyBQaWVjZSB9IGZyb20gJy4uLy4uL21vZGVscy9waWVjZXMvcGllY2UnO1xuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGllY2VzL3BvaW50JztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0UGduUHJvY2Vzc29yIHtcblxuICAgIHByb3RlY3RlZCBwZ24gPSBbXTtcbiAgICBwcm90ZWN0ZWQgY3VycmVudEluZGV4ID0gMC41O1xuXG4gICAgcHVibGljIGFic3RyYWN0IHByb2Nlc3MoXG4gICAgICAgIGJvYXJkOiBCb2FyZCxcbiAgICAgICAgc291cmNlUGllY2U6IFBpZWNlLFxuICAgICAgICBkZXN0UG9pbnQ6IFBvaW50LFxuICAgICAgICBkZXN0UGllY2U/OiBQaWVjZVxuICAgICk6IHZvaWQ7XG5cbiAgICBwdWJsaWMgZ2V0UEdOKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wZ24uam9pbignICcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRMYXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wZ25bdGhpcy5wZ24ubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFwcGVuZFRvTGFzdChzdHI6IHN0cmluZykge1xuICAgICAgICB0aGlzLnBnblt0aGlzLnBnbi5sZW5ndGggLSAxXSA9IHRoaXMuZ2V0TGFzdCgpICsgc3RyO1xuICAgIH1cblxuICAgIHByb2Nlc3NDaGVja3MoY2hlY2ttYXRlOiBib29sZWFuLCBjaGVjazogYm9vbGVhbiwgc3RhbGVtYXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChjaGVja21hdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kVG9MYXN0KCcjJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRvTGFzdCgnKycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucGduID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMC41O1xuICAgIH1cblxuICAgIGFkZFByb21vdGlvbkNob2ljZShwcm9tb3Rpb24pIHtcbiAgICAgICAgc3dpdGNoIChwcm9tb3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRvTGFzdCgnPVEnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRvTGFzdCgnPVInKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRvTGFzdCgnPUInKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFRvTGFzdCgnPU4nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUxhc3QoKSB7XG4gICAgICAgIHRoaXMucGduLnBvcCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCAtPSAwLjU7XG4gICAgfVxuXG59XG4iXX0=