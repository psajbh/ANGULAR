import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  // null id = -1
    console.log('Todo ngOnInit id:' + this.id);
    // below code snippet provides a dummy to the UI until the subscribe Observable is returned
    // see 66.Step 64 for explanation of this with respect to 
    this.todo = new Todo(this.id, '', false, new Date());

    if(this.id != -1){
      this.todoService.retrieveTodo('John', this.id).subscribe(
        data => this.todo = data
      )
    }
  }

  saveTodo() {
    if(this.id ===-1){
      console.log("create new Todo");
      this.todoService.createTodo('John', this.todo)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['todos'])
        }
      )
    }
    else {
      console.log("update Todo");
      this.todoService.updateTodo('John', this.id, this.todo).
        subscribe(data => {
          console.log(data)
          this.router.navigate(['todos'])
        }
      )
    }

  }

}
