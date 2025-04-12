import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  private apiUrl = 'http://localhost:3123';

  constructor(private http: HttpClient) { }

  sendTextToBackend(text: string, idioma: string, codUsuario: string): Observable<any> {
    console.log("LLAMADA A SEND TEXT SERVICE", text, idioma, codUsuario);
    
    return this.http.post(`${this.apiUrl}/api/v1/traducir`, { 
      textoPeticion: text,
      codUsuarioPeticion: codUsuario
     });
  };

  sendTextToAssintant(text: string, codUsuario: string): Observable<any> {
    console.log("LLAMADA A SEND TO ASSISTANT SERVICE", text, codUsuario);
    
    return this.http.post(`${this.apiUrl}/api/v1/traducir`, { 
      textoPeticion: text,
      codUsuarioPeticion: codUsuario
     });
  }
}