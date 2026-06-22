import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsuarioRecuperacionDto, UsuarioRegistroDto } from '../model/usuario.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicamentosService {
  private apiUrl = `${environment.apiUrl}/medicamentos`;

  constructor(private http: HttpClient) {}

 
subirExcel(formData: FormData): Observable<any> {
  // NO añadas manualmente el header 'Content-Type'
  return this.http.post(`${this.apiUrl}/subir-medicamentos`, formData);
}
}