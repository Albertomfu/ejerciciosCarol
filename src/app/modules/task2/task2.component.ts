import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';

@Component({
  selector: 'app-task2',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task2.component.html',
  styleUrl: './task2.component.css',
})
export class Task2Component {
  // Lista inicial de tareas
  tareas: string[] = [
    'Estudiar Node Js',
    'Sacar al perro',
    'Plantar un árbol',
    'Leer un libro',
    'Escribir el testamento urgente',
  ];

  // FormControl para el buscador
  search = new FormControl('');

  // Formulario para añadir tareas nuevas
  formAgregar = new FormGroup({
    nuevaTarea: new FormControl('', Validators.required),
  });

  // Observable de tareas filtradas
  tareasFiltradas: Observable<string[]> = this.search.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    map((texto) => this.filtrarTareas(texto || ''))
  );

  // Filtra tareas con trim() y sin distinguir mayúsc/minúsc
  filtrarTareas(texto: string): string[] {
    const termino = texto.trim().toLowerCase();
    if (!termino) return this.tareas;
    return this.tareas.filter((t) => t.toLowerCase().includes(termino));
  }

  // Añadir tarea nueva
  agregarTarea() {
    const tarea = this.formAgregar.value.nuevaTarea?.trim();
    if (tarea) {
      this.tareas.push(tarea);
      this.formAgregar.reset();
    }
  }

  // Borrar tarea individual
  borrarTarea(index: number) {
    this.tareas.splice(index, 1);
  }
}
