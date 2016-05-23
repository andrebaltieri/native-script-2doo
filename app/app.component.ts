import {Component} from "@angular/core";
import dialogs = require("ui/dialogs");
var socialShare = require("nativescript-social-share");

class Todo {
    constructor(public text: string, public done: boolean) { }
}

@Component({
    selector: "app",
    template: `
        <GridLayout class="page" columns="*" rows="60, 30, *, 40, 40">
            <TextView col="0" row="0" class="header" text="2doo Task Manager"></TextView>
            <StackLayout col="0" row="1" class="sub-header" orientation="horizontal">
                <Label text="{{ remain() }} tarefa(s) restante(s)" width="250"></Label>
                <Button class="text-white" text="Compartilhar" (tap)="share()"></Button>
            </StackLayout>
            <ListView col="0" row="2" [items]="todos">
                <template let-item="item">
                    <StackLayout class="row" [ngClass]="{done: item.done}" orientation="horizontal">
                        <Switch checked="{{ item.done }}"></Switch>
                        <Label [text]="item.text" class="row-text"></Label>                        
                    </StackLayout>
                </template>
            </ListView>
            <TextField col="0" row="3" class="text-field" [(ngModel)]="todo.text"></TextField>
            <Button col="0" row="4" class="add-button text-white" text="Adicionar Tarefa" (tap)="addTodo()"></Button>
        </GridLayout>
    `,
})

export class AppComponent {
    public todo: Todo = new Todo('', false);
    public todos: Array<Todo> = new Array<Todo>();

    constructor() {
        this.todos.push(new Todo('Passear com Cachorro', true));
    }

    public addTodo() {
        if (this.todo.text == '') {
            dialogs.confirm({
                title: "Tarefa Inválida",
                message: "Informe a descrição da trefa",
                okButtonText: "OK"
            });
        } else {
            this.todos.push(this.todo);
            this.todo = new Todo('', false);
        }
    }

    public remain(): number {
        var count = 0;
        for (var index = 0; index < this.todos.length; index++) {
            count += this.todos[index].done ? 0 : 1;
        }
        return count;
    }

    public share() {
        let list = [];
        for (let i = 0, size = this.todos.length; i < size; i++) {
            list.push(this.todos[i].text);
        }
        let listString = list.join(", ").trim();
        socialShare.shareText(listString);
    }
}
