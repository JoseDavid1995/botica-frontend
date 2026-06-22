import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faUser, faEnvelope, faEye, faEyeSlash, faTimes, faIdCard, faLeaf, faPrescriptionBottleMedical, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { UsuarioRegistroDto } from '../model/usuario.model';
import { AuthService } from '../service/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { OnlyNumberDirective } from '../directives/only-number.directive';
import { OnlyTextDirective } from '../directives/only-text.directive';
import { EmailValidatorDirective } from '../directives/email-validator.directive.ts';
import { AlphaNumericDirective } from '../directives/alpha-numeric.directive';
import { AlertService } from '../services/alert';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FontAwesomeModule, FormsModule, OnlyNumberDirective, OnlyTextDirective, EmailValidatorDirective, AlphaNumericDirective],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login implements OnInit {
  emailError: boolean = false;
  emailErrorLogin: boolean = false;
  iconoUsuario = faUser;
  iconoCorreo = faEnvelope;
  iconoCandado = faLock; 
  iconoOjoAbierto = faEye;
  iconoOjoCerrado = faEyeSlash;
  iconoApellidos = faUserTag;
  iconoNatural = faLeaf; 
  iconoIdentidad = faIdCard;
  iconoCerrar = faTimes;
  iconoBotica = faPrescriptionBottleMedical;

  ocultarPassword = true;
  ocultarPasswordRegistro = true; 
  mostrarModal = false;

  registroData: UsuarioRegistroDto = {
    dni: '',
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: ''
  };

  loginData = {
    correo: '',
    contrasena: ''
  };

  showSidebar = true;

  ngOnInit() {
 console.log(this.mostrarModal)
  }

  constructor(private usuarioService: AuthService, private router: Router, private alertService: AlertService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Oculta el sidebar solo si estamos en la ruta 'login'
        this.showSidebar = event.url !== '/login';
      }
    });
  
  }


  onRegistrar(form: NgForm): void {
   form.form.markAllAsTouched();

    if (!this.registroData.dni || !this.registroData.nombres || !this.registroData.apellidos || !this.registroData.correo || !this.registroData.contrasena) {
      this.alertService.show("Campos incompletos", "Por favor, completa todos los campos del formulario.", "error");      return;
    }

    this.usuarioService.registrar(this.registroData).subscribe({
      next: () => {
     this.cerrarModal(); 
      // 2. Éxito
      setTimeout(() => {
        this.alertService.show("Éxito", "¡Cuenta creada exitosamente!", "success");
      }, 100);
      },
      error: (err) => {
        let mensajeError = 'Ocurrió un error inesperado.';
        if (err.status === 400) {
          mensajeError = err.error?.mensaje || "Error en los datos enviados.";
        } else if (err.status === 500) {
          mensajeError = 'Error de servidor: Intente más tarde.';
        }
        this.alertService.show("Error de Registro", mensajeError, "error");
      }
    });
  }

  onLogin() {
    debugger

    this.usuarioService.login(this.loginData).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const mensaje = err.error?.mensaje || "Correo o contraseña incorrectos.";
        console.log("Disparando modal con:", mensaje); // ¿Ves esto en la consola?
        this.alertService.show("Error de Acceso", mensaje, "error");
      }
    });
  }

  onLogout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }

  private resetFormulario() {
  this.registroData = {
    dni: '',
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: ''
  };
  this.emailError = false; // También reinicia los errores
}

// Modifica tus funciones de cierre
cerrarModal() {
  this.mostrarModal = false;
  this.resetFormulario(); // Limpia los datos
   console.log(this.mostrarModal)
   this.cdr.detectChanges();
   // Cierra la modal
}

abrirModalRegistro() {
  this.resetFormulario(); // Limpiamos los datos primero
  this.mostrarModal = true; // Luego abrimos la modal
  console.log(this.mostrarModal)
}
}
