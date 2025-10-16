import { Component } from '@angular/core';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksComponent } from './modules/tasks/tasks.component';
import { Task2Component } from './modules/task2/task2.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Task2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
