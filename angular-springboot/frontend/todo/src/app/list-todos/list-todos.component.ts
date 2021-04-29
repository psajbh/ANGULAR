import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date

  ) {
  } 
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  name: string;
  todos: Todo[];
  message: string;

  constructor(
    private todoService:TodoDataService,
    private router:Router
  ) { }

  ngOnInit() {
    console.log('ListTodosComponent - ngOnInit - calling refreshTodos')
    this.refreshTodos();
  }

  refreshTodos(){
    console.log('ListTodosComponent - executing refreshTodos')
    this.todoService.retrieveAllTodos('John').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id:number){
    console.log('ListTodosComponent - deleteTodo')
    console.log(`ListTodosComponent -delete todo ${id}`);
    this.todoService.deleteTodo('John', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`
        console.log('deleteTodot - calling refreshTodos')
        this.refreshTodos();
      }
    )
  }

  updateTodo(id:number){
    console.log(`update todo ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo(){
    console.log('add new todo');
    this.router.navigate(['todos', -1])
  }

}

