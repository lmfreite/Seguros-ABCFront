import { Component, OnInit } from '@angular/core';
import { Asegurado } from '@interfaces/asegurado';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AseguradoService } from 'app/services/asegurado.service';
import { ProgressbarComponent } from "../progressbar/progressbar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asegurados',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressbarComponent],
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css'],
})
export class AseguradosComponent implements OnInit {
  asegurados: Asegurado[] = [];
  loading:boolean=false;
  mensajeError: any;

  constructor(private _AseguradoService: AseguradoService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.loading = true;
    this._AseguradoService.getAseguradoData().subscribe({
      next: (data: Asegurado[]) => {
        this.asegurados = data.map(asegurado => ({
          numeroIdentificacion: asegurado.numeroIdentificacion,
          primerNombre: asegurado.primerNombre,
          segundoNombre: asegurado.segundoNombre,
          primerApellido: asegurado.primerApellido,
          segundoApellido: asegurado.segundoApellido,
          telefono: asegurado.telefono,
          email: asegurado.email,
          fechaNacimiento: asegurado.fechaNacimiento,
          valorEstimadoSeguro: asegurado.valorEstimadoSeguro,
          observaciones: asegurado.observaciones
        }));
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 404) {
          this.mensajeError = 'No se encontraron asegurados.';
        } else {
          this.mensajeError = 'Ocurrió un error inesperado.';
        }
      }
    });
  }

  deleteAsegurado(numeroIdentificacion:number){
    this.loading=true
    this._AseguradoService.deleteAsegurado(numeroIdentificacion).subscribe((data) => {
    this.getList();
    this.toastr.error("Asegurado eliminado con exito.")
      });
}
}