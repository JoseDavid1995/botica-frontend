export interface UsuarioRegistroDto {
  dni: string;
  nombres: string;
  apellidos: string;
  correo: string;
  contrasena: string;
}


export interface UsuarioRecuperacionDto {
  dni: string;
  contrasena: string;
}
