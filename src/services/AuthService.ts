export interface AuthService {

  registrar(data: {
    usuario: string;
    nombre: string;
    password: string;
    idRol: number;
    correo: string;
    telefono: string;
  }): Promise<{
    id: number;
    usuario: string;
    rol: string;
  }>;

  validarLogin(usuarioOrCorreo: string, password: string): Promise<{
    id: number;
    usuario: string;
    nombre: string;
    rol: string;
    token: string;
  }>;

  resetPassword(correo: string, nuevaPassword: string): Promise<void>;
}