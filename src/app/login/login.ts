import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faUser, faEnvelope, faEye, faEyeSlash, faTimes, faIdCard, faLeaf, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
import { UsuarioRegistroDto } from '../model/usuario.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  iconoUsuario = faUser;
  iconoCorreo = faEnvelope;
  iconoCandado = faLock; 
  iconoOjoAbierto = faEye;
  iconoOjoCerrado = faEyeSlash;
  
  iconoNatural = faLeaf; 
  iconoIdentidad = faIdCard;
  iconoCerrar = faTimes;
  iconoBotica = faPrescriptionBottleMedical;

  ocultarPassword = true;
  ocultarPasswordRegistro = true; 
  mostrarModal = false;

  registroData: UsuarioRegistroDto = {
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: ''
  };

  loginData = {
    correo: '',
    contrasena: ''
  };

  constructor(private usuarioService: AuthService, private router: Router) {}


  onRegistrar(event: Event): void {
    debugger
    event.preventDefault(); 

    if (!this.registroData.nombres || !this.registroData.apellidos || !this.registroData.correo || !this.registroData.contrasena) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    this.usuarioService.registrar(this.registroData).subscribe({
      next: (usuarioCreado) => {
        alert('¡Cuenta creada de forma exitosa!');
        this.mostrarModal = false; 
      },
      error: (err) => {
        if (err.status === 400) {
          alert(`Error de registro: ${err.error}`);
        } else if (err.status === 500) {
          alert('Error de servidor: Ocurrió un fallo inesperado en el sistema.');
        } else {
          alert('No se pudo establecer comunicación con el servidor. Verifica tu conexión.');
        }
      }
    });
  }

  onLogin() {
    this.usuarioService.login(this.loginData).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Error al iniciar sesión", err);
      }
    });
  }

  onLogout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

}
