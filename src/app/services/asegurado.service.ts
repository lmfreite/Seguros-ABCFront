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
    this.myApiurl= "api/Asegurado/";
    


  }

getAseguradoData():Observable<Asegurado[]>{
    return this.http.get<Asegurado[]>(this.myAppUrl+this.myApiurl);
}

deleteAsegurado(numeroIdentificacion:number):Observable<void>{
  return this.http.delete<void>(`${this.myAppUrl}${this.myApiurl}${numeroIdentificacion}`);
}

addAsegurado(asegurado:Asegurado): Observable<void>{
  return this.http.post<void>(this.myAppUrl+this.myApiurl,asegurado)
}

editAsegurado(id:number):Observable<Asegurado>{
  return this.http.get<Asegurado>(`${this.myAppUrl}${this.myApiurl}${id}`);
}


updateAsegurado(id: number, asegurado: Asegurado): Observable<void> {
  return this.http.put<void>(`${this.myAppUrl}${this.myApiurl}${id}`, asegurado);
}


}


