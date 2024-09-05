import { Routes } from '@angular/router';
import { AseguradosComponent } from './components/asegurados/asegurados.component';
import { AddEditAseguradoComponent } from './components/add-edit-asegurado/add-edit-asegurado.component';

export const routes: Routes = [
    {path:'',component: AseguradosComponent},
    {path:'add',component: AddEditAseguradoComponent},
    {path:'edit/:id',component: AddEditAseguradoComponent},

    {path:'**',redirectTo:'',pathMatch:'full'},
];
