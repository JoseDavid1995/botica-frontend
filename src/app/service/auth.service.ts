import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsuarioRecuperacionDto, UsuarioRegistroDto } from '../model/usuario.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Función auxiliar para saber si estamos en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Solo intentamos guardar si estamos en el navegador
        if (response.success && response.data?.token && this.isBrowser()) {
          localStorage.setItem('token', response.data.token);
        }
      })
    );
  }

  logout() {
    // Solo eliminamos si estamos en el navegador
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    // Solo leemos si estamos en el navegador
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null; // Si estamos en el servidor, retornamos null
  }

  registrar(registroDto: UsuarioRegistroDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, registroDto);
  }

  recuperarContrasena(usuarioRecuperacionDto: UsuarioRecuperacionDto): Observable<any> {
  return this.http.post(`${this.apiUrl}/recuperar-contrasena`, usuarioRecuperacionDto);
}
}