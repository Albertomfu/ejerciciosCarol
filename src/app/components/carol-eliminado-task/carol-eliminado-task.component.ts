import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-carol-eliminado-task',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './carol-eliminado-task.component.html',
  styleUrl: './carol-eliminado-task.component.css',
})
export class CarolEliminadoTaskComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => (this.tasks = tasks),
      (error) => console.error('Error fetching tasks:', error)
    );
  }

  addTask(): void {
    if (this.taskForm.invalid) return;

    const newTask: Task = {
      id: 0,
      title: this.taskForm.value.title,
      completed: false,
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.loadTasks();
      this.taskForm.reset(); // Limpiar el formulario después de añadir
    });
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
