import { Component } from '@angular/core';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksComponent } from './modules/tasks/tasks.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
