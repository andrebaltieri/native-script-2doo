"use strict";
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var socialShare = require("nativescript-social-share");
var Todo = (function () {
    function Todo(text, done) {
        this.text = text;
        this.done = done;
    }
    return Todo;
}());
var AppComponent = (function () {
    function AppComponent() {
        this.todo = new Todo('', false);
        this.todos = new Array();
        this.todos.push(new Todo('Passear com Cachorro', true));
    }
    AppComponent.prototype.addTodo = function () {
        if (this.todo.text == '') {
            dialogs.confirm({
                title: "Tarefa Inválida",
                message: "Informe a descrição da trefa",
                okButtonText: "OK"
            });
        }
        else {
            this.todos.push(this.todo);
            this.todo = new Todo('', false);
        }
    };
    AppComponent.prototype.remain = function () {
        var count = 0;
        for (var index = 0; index < this.todos.length; index++) {
            count += this.todos[index].done ? 0 : 1;
        }
        return count;
    };
    AppComponent.prototype.share = function () {
        var list = [];
        for (var i = 0, size = this.todos.length; i < size; i++) {
            list.push(this.todos[i].text);
        }
        var listString = list.join(", ").trim();
        socialShare.shareText(listString);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "app",
            template: "\n        <GridLayout class=\"page\" columns=\"*\" rows=\"60, 30, *, 40, 40\">\n            <TextView col=\"0\" row=\"0\" class=\"header\" text=\"2doo Task Manager\"></TextView>\n            <StackLayout col=\"0\" row=\"1\" class=\"sub-header\" orientation=\"horizontal\">\n                <Label text=\"{{ remain() }} tarefa(s) restante(s)\" width=\"250\"></Label>\n                <Button class=\"text-white\" text=\"Compartilhar\" (tap)=\"share()\"></Button>\n            </StackLayout>\n            <ListView col=\"0\" row=\"2\" [items]=\"todos\">\n                <template let-item=\"item\">\n                    <StackLayout class=\"row\" [ngClass]=\"{done: item.done}\" orientation=\"horizontal\">\n                        <Switch checked=\"{{ item.done }}\"></Switch>\n                        <Label [text]=\"item.text\" class=\"row-text\"></Label>                        \n                    </StackLayout>\n                </template>\n            </ListView>\n            <TextField col=\"0\" row=\"3\" class=\"text-field\" [(ngModel)]=\"todo.text\"></TextField>\n            <Button col=\"0\" row=\"4\" class=\"add-button text-white\" text=\"Adicionar Tarefa\" (tap)=\"addTodo()\"></Button>\n        </GridLayout>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map