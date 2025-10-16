import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  formTitle: FormGroup;
  title: FormControl;

  constructor() {
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.formTitle = new FormGroup({
      nombre: this.title,
    });
  }
  onSubmit(): void {
    if (this.formTitle.invalid) return; // no permitir envío si es inválido

    const nombreValue = this.formTitle.value.nombre.trim();
    console.log('Usuario agregado:', nombreValue);

    // Aquí podrías llamar a un servicio para guardar el nombre
    // this.usuarioService.agregar(nombreValue);

    this.formTitle.reset(); // ✅ reseteo del formulario tras envío exitoso
  }
}
