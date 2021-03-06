import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo.model.ts';
import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

@Component({
  selector: 'todo-app',
  templateUrl: './todo.component.html',
})

export class TodoComponent implements OnInit {
  todos: Todo[];
  data: Object;
  loading: boolean;
  headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.http.get('/api/todo')
      .subscribe((res: Response) => {
        this.todos = res.json()
          .map(item => new Todo(item.title, item.entrynum))
          .sort((a, b) => a.id - b.id); 
      });
  }

  addTodo(title: HTMLInputElement, event: any): boolean {
    this.loading = true;
    title.value = title.value.trim();

    this.http.post(
      `/api/todo/${!this.todos.length ? 0 : (this.todos[this.todos.length - 1].id + 1)}`,
      JSON.stringify({
        title: title.value,
      }),
      { headers: this.headers }) 
      .subscribe((res: Response) => {
        this.todos.push(new Todo(
          title.value, 
          !this.todos.length ? 0 : this.todos[this.todos.length - 1].id + 1
        ));
        
        title.value = '';
        this.loading = false;
        console.log(res['status'], res['statusText']);
      });

    return false;
  }

  removeTodo(todo: any): boolean {
    this.loading = true;

    this.http.delete(`/api/todo/${todo.id}`)
      .subscribe((res: Response) => {
        this.todos = this.todos.filter((item) => item.id !== todo.id);
        this.loading = false;
        console.log(res['status'], res['statusText']);
      });

    return false;
  }

  updateTodo(event: any, todo: any): boolean {
    event.target.innerText = event.target.innerText.trim();

    if (event.target.innerText !== todo.title) {
      this.loading = true;

      this.http.put(
        `/api/todo/${todo.id}`,
        JSON.stringify({
          title: event.target.innerText,
        }),
        { headers: this.headers }) 
        .subscribe((res: Response) => {
          this.todos.forEach((item) => {
            if (item.id === todo.id) {
              item.title = event.target.innerText;
            }
          });

          event.target.blur();
          this.loading = false;
          console.log(res['status'], res['statusText']);
        });
      }

    return false;
  }

  ngOnInit() {
  }
}
