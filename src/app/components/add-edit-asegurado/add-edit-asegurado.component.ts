import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Asegurado } from '@interfaces/asegurado';
import { AseguradoService } from 'app/services/asegurado.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressbarComponent } from "../progressbar/progressbar.component";


@Component({
  selector: 'app-add-edit-asegurado',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,ProgressbarComponent,ReactiveFormsModule],
  templateUrl: './add-edit-asegurado.component.html',
  styleUrl: './add-edit-asegurado.component.css'
})

export class AddEditAseguradoComponent implements OnInit {
  loading:boolean=false;
  id:number;
  operacion:string="Agregar "

  constructor(private _AseguradoService: AseguradoService,private toastr:ToastrService, private aRoute:ActivatedRoute) {
    
    
    this.id=Number(aRoute.snapshot.paramMap.get("id"));
  }


  ngOnInit(): void {
    if(this.id !=0)
    {this.operacion="Editar ";
      this.editAsegurado(this.id)
    };
  }

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
        return;
      }
    this.loading = true;
      
     this._AseguradoService.addAsegurado(asegurado).subscribe(()=>{
      
    this.toastr.success(`Asegurado ${asegurado.primerNombre} ${asegurado.primerApellido} agregado con exito.`,"Asegurado agregado")
    this.loading = false;

     }

     )
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

editAsegurado(id:number){
  this.loading=true;
  this._AseguradoService.editAsegurado(id).subscribe((data:Asegurado[]) => {
    console.log(data)
    this.loading = false;
    this.form
      });
}
}


