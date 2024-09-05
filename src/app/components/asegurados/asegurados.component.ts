import { Component, OnInit } from '@angular/core';
import { Asegurado } from '@interfaces/asegurado';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AseguradoService } from 'app/services/asegurado.service';

@Component({
  selector: 'app-asegurados',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css']
})
export class AseguradosComponent implements OnInit {
  asegurados: Asegurado[] = [{
    "numeroIdentificacion": 1140877322,
    "primerNombre": "leonardo",
    "segundoNombre": "Manuel",
    "primerApellido": "Freite",
    "segundoApellido": "Ospino",
    "telefono": "3002644600",
    "email": "dataclarogt@atlanticqi.com",
    "fechaNacimiento": "1995-05-21",
    "valorEstimadoSeguro": 20000000,
    "observaciones": ""
  }];

  constructor(private _aseguradosService: AseguradoService) {}

   ngOnInit():void {
      this._aseguradosService
   }
}
