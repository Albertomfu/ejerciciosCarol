import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  Observable,
} from 'rxjs';

@Component({
  selector: 'app-task2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task2.component.html',
  styleUrl: './task2.component.css',
})
export class Task2Component implements OnInit {
  tareas: string[] = [
    'Estudiar Node Js',
    'Sacar al perro',
    'Plantar un árbol',
    'Leer un libro',
    'Escribir el testamento urgente',
  ];

  search = new FormControl('');

  formAgregar = new FormGroup({
    nuevaTarea: new FormControl('', [
      Validators.required, // Campo obligatorio
      Validators.minLength(3), // Mínimo 3 caracteres
      Validators.pattern(/\S+/), // No solo espacios en blanco
    ]),
  });

  tareasFiltradas: Observable<string[]> = this.search.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    map((texto) => this.filtrarTareas(texto || ''))
  );

  ngOnInit(): void {
    // ✅ Simular lista grande de tareas
    // for (let i = 0; i < 1000; i++) {
    //   this.tareas.push(`Tarea simulada ${i}`);
    // }
  }

  filtrarTareas(texto: string): string[] {
    const termino = texto.trim().toLowerCase();
    if (!termino) return this.tareas;
    return this.tareas.filter((t) => t.toLowerCase().trim().includes(termino));
  }

  agregarTarea() {
    const tarea = this.formAgregar.value.nuevaTarea?.trim();
    if (!tarea) return;

    const tareaNormalizada = tarea.toLowerCase();
    const existe = this.tareas.some(
      (t) => t.toLowerCase().trim() === tareaNormalizada
    );

    if (!existe) {
      this.tareas.push(tarea);
      this.formAgregar.reset();
    } else {
      alert('¡Esta tarea ya existe!');
    }
  }

  borrarTarea(index: number) {
    this.tareas.splice(index, 1);
  }

  // ✅ Función trackBy para mejorar rendimiento en listas grandes
  trackByFn(index: number, item: string): string {
    return item;
  }
}
