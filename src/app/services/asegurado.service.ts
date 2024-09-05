import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asegurado } from '@interfaces/asegurado';
import { env } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AseguradoService {
private myAppUrl: string;
private myApiurl: string;


  constructor(private http: HttpClient) { 
    this.myAppUrl= env.endpoint;
    this.myApiurl= "api/Asegurado"
  }

  getAseguradoData():Observable<Asegurado[]>{
    return this.http.get<Asegurado[]>(this.myAppUrl+this.myApiurl);
}


}