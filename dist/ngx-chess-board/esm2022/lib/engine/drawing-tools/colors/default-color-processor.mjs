export class DefaultColorProcessor {
    resolve(ctrl, shift, alt) {
        let color = 'green';
        if (ctrl || shift) {
            color = 'red';
        }
        if (alt) {
            color = 'blue';
        }
        if ((shift || ctrl) && alt) {
            color = 'orange';
        }
        return color;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb2xvci1wcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY2hlc3MtYm9hcmQvc3JjL2xpYi9lbmdpbmUvZHJhd2luZy10b29scy9jb2xvcnMvZGVmYXVsdC1jb2xvci1wcm9jZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLHFCQUFxQjtJQUU5QixPQUFPLENBQUMsSUFBUyxFQUFFLEtBQVUsRUFBRSxHQUFRO1FBQ25DLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUVwQixJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNoQixLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNuQixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUN6QixLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xvclByb2Nlc3NvciB9IGZyb20gJy4vY29sb3ItcHJvY2Vzc29yJztcblxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb2xvclByb2Nlc3NvciBpbXBsZW1lbnRzIENvbG9yUHJvY2Vzc29ye1xuXG4gICAgcmVzb2x2ZShjdHJsOiBhbnksIHNoaWZ0OiBhbnksIGFsdDogYW55KTogc3RyaW5ne1xuICAgICAgICBsZXQgY29sb3IgPSAnZ3JlZW4nO1xuXG4gICAgICAgIGlmIChjdHJsIHx8IHNoaWZ0KSB7XG4gICAgICAgICAgICBjb2xvciA9ICdyZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbHQpIHtcbiAgICAgICAgICAgIGNvbG9yID0gJ2JsdWUnO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoc2hpZnQgfHwgY3RybCkgJiYgYWx0KSB7XG4gICAgICAgICAgICBjb2xvciA9ICdvcmFuZ2UnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cblxufVxuIl19