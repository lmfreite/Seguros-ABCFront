import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asegurado } from '@interfaces/asegurado';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AseguradoService {
private myAppUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl= environment.endpoint;
  
  }

getAseguradoData():Observable<Asegurado[]>{
    return this.http.get<Asegurado[]>(this.myAppUrl);
}

deleteAsegurado(numeroIdentificacion:number):Observable<void>{
  return this.http.delete<void>(`${this.myAppUrl}${numeroIdentificacion}`);
}

addAsegurado(asegurado: Asegurado): Observable<void> {
  // Configuración de las cabeceras para la solicitud
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // Enviar solicitud POST al servidor
  return this.http.post<void>(this.myAppUrl, asegurado, { headers });
}


editAsegurado(id:number):Observable<Asegurado>{
  return this.http.get<Asegurado>(`${this.myAppUrl}${id}`);
}


updateAsegurado(id: number, asegurado: Asegurado): Observable<void> {
  return this.http.put<void>(`${this.myAppUrl}${id}`, asegurado);
}


}


