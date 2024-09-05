import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Asegurado } from '@interfaces/asegurado';


@Component({
  selector: 'app-add-edit-asegurado',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-edit-asegurado.component.html',
  styleUrl: './add-edit-asegurado.component.css'
})

export class AddEditAseguradoComponent {

  // Método que se llama cuando el formulario se envía
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Convertir los campos a minúsculas cuando corresponda
      const asegurado: Asegurado = {
        numeroIdentificacion: form.value.identification,
        primerNombre: form.value.firstName.toLowerCase(),  
        segundoNombre: form.value.secondName ? form.value.secondName.toLowerCase() : null,  
        primerApellido: form.value.lastName.toLowerCase(),  
        segundoApellido: form.value.secondLastName.toLowerCase(),
        telefono: form.value.phone, 
        email: form.value.email.toLowerCase(),  
        fechaNacimiento: form.value.birthDate,
        valorEstimadoSeguro: form.value.insuranceValue,
        observaciones: form.value.observations ? form.value.observations.toLowerCase() : null 
      };
  
      // Validaciones adicionales

      if (!this.validarEdad(asegurado.fechaNacimiento)) {
        alert('El asegurado debe ser mayor de 18 años.');
        return;
      }
  
      // Aquí puedes enviar los datos a una API o realizar otras acciones
      console.log('Formulario válido. Datos del asegurado:', asegurado);
    } else {
      console.log('Formulario inválido');
    }
  }
  
  // Función para validar si el asegurado tiene más de 18 años
  validarEdad(fechaNacimiento: string): boolean {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
  
    // Verifica si ya ha cumplido los 18 años
    return (mes > 0 || (mes === 0 && hoy.getDate() >= fechaNacimientoDate.getDate())) && edad >= 18;
  }
}