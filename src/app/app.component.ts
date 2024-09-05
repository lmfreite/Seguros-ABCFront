import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AseguradosComponent } from './components/asegurados/asegurados.component';
import { AddEditAseguradoComponent } from './components/add-edit-asegurado/add-edit-asegurado.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,AseguradosComponent,AddEditAseguradoComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'segurosABC-front';
}
