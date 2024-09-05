import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asegurado } from '@interfaces/asegurado';
import { env } from 'env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AseguradoService {
  private myappurl:string;
  private myapiurl:string;

  constructor(private http:HttpClient) { 
    this.myappurl=env.endpoint;
    this.myapiurl='api/Asegurado/'
  }

  getListAsegurados():Observable<Asegurado[]>{
    return this.http.get<Asegurado[]>(this.myappurl+this.myapiurl)
  }
}
