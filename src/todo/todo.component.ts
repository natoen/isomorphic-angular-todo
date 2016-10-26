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
    this.http.get('/api')
      .subscribe((res: Response) => {
        this.todos = res.json()
          .map(item => new Todo(item.title, item.entrynum))
          .sort((a, b) => parseInt(a.id) - parseInt(b.id)); 
      });
  }

  addTodo(title: HTMLInputElement, event: any): boolean {
    this.loading = true;
    title.value = title.value.trim();

    this.http.post(
      '/api',
      JSON.stringify({
        title: title.value,
        entrynum: !this.todos.length ? '0' : (parseInt(this.todos[this.todos.length - 1].id) + 1).toString()
      }),
      { headers: this.headers }) 
      .subscribe((res: Response) => {
        this.todos.push(new Todo(
          title.value, 
          !this.todos.length ? '0' : (parseInt(this.todos[this.todos.length - 1].id) + 1).toString()
        ));
        
        title.value = '';
        this.loading = false;
        console.log(res['status'], res['statusText']);
      });

    return false;
  }

  removeTodo(todo: any): boolean {
    this.loading = true;

    this.http.delete('/api/' + todo.id)
      .subscribe((res: Response) => {
        this.todos = this.todos.filter((item) => item.id !== todo.id);
        this.loading = false;
        console.log(res['status'], res['statusText']);
      });

    return false;
  }

  updateTodo(update: HTMLInputElement, todo: any, event: any): boolean {
    update.value = update.value.trim();

    if (update.value !== todo.title) {
      this.loading = true;

      this.http.put(
        '/api',
        JSON.stringify({
          title: update.value,
          entrynum: todo.id
        }),
        { headers: this.headers }) 
        .subscribe((res: Response) => {
          this.todos.forEach((item) => {
            if (item.id === todo.id) {
              item.title = update.value;
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
