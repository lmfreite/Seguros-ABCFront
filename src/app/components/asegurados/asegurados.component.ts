import { Component, OnInit } from '@angular/core';
import { Asegurado } from '@interfaces/asegurado';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AseguradoService } from 'app/services/asegurado.service';
import { ProgressbarComponent } from "../progressbar/progressbar.component";

@Component({
  selector: 'app-asegurados',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressbarComponent],
  templateUrl: './asegurados.component.html',
  styleUrls: ['./asegurados.component.css'],
})
export class AseguradosComponent implements OnInit {
  asegurados: Asegurado[] = [];

  constructor(private _AseguradoService: AseguradoService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._AseguradoService.getAseguradoData().subscribe((data) => {
      this.asegurados=data;
    });
  }
}
