import { AnimationDragStartProcessor } from './animation-drag-start-processor';
export class DragStartStrategy {
    constructor() {
        this.dragStartProcessor = new AnimationDragStartProcessor();
    }
    process(event) {
        this.dragStartProcessor.dragStarted(event);
    }
    setDragStartProcessor(processor) {
        this.dragStartProcessor = processor;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1zdGFydC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jaGVzcy1ib2FyZC9zcmMvbGliL2VuZ2luZS9kcmFnL3N0YXJ0L2RyYWctc3RhcnQtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFJL0UsTUFBTSxPQUFPLGlCQUFpQjtJQUkxQjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLDJCQUEyQixFQUFFLENBQUM7SUFDaEUsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFtQjtRQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxTQUE2QjtRQUMvQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0lBQ3hDLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWdTdGFydCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQW5pbWF0aW9uRHJhZ1N0YXJ0UHJvY2Vzc29yIH0gZnJvbSAnLi9hbmltYXRpb24tZHJhZy1zdGFydC1wcm9jZXNzb3InO1xuaW1wb3J0IHsgRGVmYXVsdERyYWdTdGFydFByb2Nlc3NvciB9IGZyb20gJy4vZGVmYXVsdC1kcmFnLXN0YXJ0LXByb2Nlc3Nvcic7XG5pbXBvcnQgeyBEcmFnU3RhcnRQcm9jZXNzb3IgfSBmcm9tICcuL2RyYWctc3RhcnQtcHJvY2Vzc29yJztcblxuZXhwb3J0IGNsYXNzIERyYWdTdGFydFN0cmF0ZWd5IHtcblxuICAgIHByaXZhdGUgZHJhZ1N0YXJ0UHJvY2Vzc29yOiBEcmFnU3RhcnRQcm9jZXNzb3I7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnRQcm9jZXNzb3IgPSBuZXcgQW5pbWF0aW9uRHJhZ1N0YXJ0UHJvY2Vzc29yKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHByb2Nlc3MoZXZlbnQ6IENka0RyYWdTdGFydCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYWdTdGFydFByb2Nlc3Nvci5kcmFnU3RhcnRlZChldmVudCk7XG4gICAgfVxuXG4gICAgc2V0RHJhZ1N0YXJ0UHJvY2Vzc29yKHByb2Nlc3NvcjogRHJhZ1N0YXJ0UHJvY2Vzc29yKSB7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0UHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgIH1cblxufVxuIl19