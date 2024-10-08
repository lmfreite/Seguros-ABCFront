import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Asegurado } from '@interfaces/asegurado';
import { AseguradoService } from 'app/services/asegurado.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressbarComponent } from '../progressbar/progressbar.component';

@Component({
  selector: 'app-add-edit-asegurado',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProgressbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-asegurado.component.html',
  styleUrl: './add-edit-asegurado.component.css',
})
export class AddEditAseguradoComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(
    private _AseguradoService: AseguradoService,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      numeroIdentificacion: ['', [Validators.required]], // Número de identificación requerido
      primerNombre: ['', [Validators.required]], // Primer nombre requerido
      segundoNombre: [''], // Segundo nombre opcional
      primerApellido: ['', [Validators.required]], // Primer apellido requerido
      segundoApellido: ['', [Validators.required]], // Segundo apellido requerido
      telefono: [
        '',
        [Validators.required],
      ], // Validar formato de teléfono
      email: ['', [Validators.required, Validators.email]], // Validar formato de correo electrónico
      fechaNacimiento: ['', [Validators.required]], // Fecha de nacimiento requerida
      valorEstimadoSeguro: ['', [Validators.required]], // Valor estimado del seguro requerido
      observaciones: [''], // Observaciones opcionales
    });

    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
 
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.form.get('numeroIdentificacion')?.disable()
      this.editAsegurado(this.id);
    }
  }

  // Método que se llama cuando el formulario se envía
  addAsegurado() {
    if (this.form.valid) {
      // Convertir los campos a minúsculas cuando corresponda
      const asegurado: Asegurado = {
        NumeroIdentificacion: this.form.value.numeroIdentificacion,
        PrimerNombre: this.form.value.primerNombre ? this.form.value.primerNombre.toLowerCase() : '',
        SegundoNombre: this.form.value.segundoNombre ? this.form.value.segundoNombre.toLowerCase() : null,
        PrimerApellido: this.form.value.primerApellido ? this.form.value.primerApellido.toLowerCase() : '',
        SegundoApellido: this.form.value.segundoApellido ? this.form.value.segundoApellido.toLowerCase() : '',
        Telefono: this.form.value.telefono,
        Email: this.form.value.email ? this.form.value.email.toLowerCase() : '',
        FechaNacimiento: this.form.value.fechaNacimiento,
        ValorEstimadoSeguro: this.form.value.valorEstimadoSeguro,
        Observaciones: this.form.value.observaciones ? this.form.value.observaciones.toLowerCase() : null,
      };
      console.log(asegurado)
      // Validaciones adicionales
      if (this.id !== 0) {
        // Editar asegurado existente
        this.loading = true;
        asegurado.NumeroIdentificacion = this.id;
        
        this._AseguradoService.updateAsegurado(this.id, asegurado).subscribe({
          next: () => {
            this.toastr.success(
              `Asegurado ${asegurado.PrimerNombre} ${asegurado.PrimerApellido} actualizado con éxito.`,
              'Asegurado actualizado'
            );
            this.loading = false;
          },
          error: () => {
            this.toastr.error('Ocurrió un error al actualizar el asegurado.');
            this.loading = false;
          }
        });
    
        this.operacion = 'Editar';
        this.editAsegurado(this.id);
      }else {
        if (!this.validarEdad(asegurado.FechaNacimiento)) {
          this.toastr.error('El asegurado debe ser mayor de edad');
          this.loading = false;
          return; // Salir de la función si la validación falla
        }
        this.loading = true;
        this._AseguradoService.addAsegurado(asegurado).subscribe(() => {
          this.toastr.success(
            `Asegurado ${asegurado.PrimerNombre} ${asegurado.PrimerApellido} agregado con éxito.`,
            'Asegurado agregado'
          );
          this.loading = false;
        });
      }
    } else {
      this.toastr.warning("Valida todos los campos.");
    }
  }


  // Función para validar si el asegurado tiene más de 18 años
  validarEdad(fechaNacimiento: string): boolean {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();

    // Verifica si ya ha cumplido los 18 años
    return (
      (mes > 0 ||
        (mes === 0 && hoy.getDate() >= fechaNacimientoDate.getDate())) &&
      edad >= 18
    );
  }

  editAsegurado(id: number) {
    this.loading = true;
    this._AseguradoService.editAsegurado(id).subscribe((asegurado: Asegurado) => {
      this.loading = false;
      this.form.patchValue({
        numeroIdentificacion: asegurado.NumeroIdentificacion,
        primerNombre: asegurado.PrimerNombre,
        segundoNombre: asegurado.SegundoNombre,
        primerApellido: asegurado.PrimerApellido,
        segundoApellido: asegurado.SegundoApellido,
        telefono: asegurado.Telefono,
        email: asegurado.Email,
        fechaNacimiento: asegurado.FechaNacimiento,
        valorEstimadoSeguro: asegurado.ValorEstimadoSeguro,
        observaciones: asegurado.Observaciones,
      });
    });
  }
}
  
