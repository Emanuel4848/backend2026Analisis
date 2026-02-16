import { AuthRepository } from "../repositories/AuthRepository";
import { AuthService } from "./AuthService";

export class AuthServiceImpl implements AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async registrar(data: {
    usuario: string;
    nombre: string;
    password: string;
    idRol: number;
    correo: string;
    telefono: string;
  }): Promise<{ id: number; usuario: string; rol: string }> {
    const usuario = data.usuario.trim();
    const correo = data.correo.trim().toLowerCase();

    const existingUser = await this.authRepository.findByUsuario(usuario);
    if (existingUser) throw new Error("Usuario ya existe");

    const existingEmail = await this.authRepository.findByCorreo(correo);
    if (existingEmail) throw new Error("Correo ya existe");



    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(data.password)) {
     throw new Error("La contraseña debe ser alfanumérica");
    }


    const created = await this.authRepository.createUser({
      usuario,
      nombre: data.nombre.trim(),
      passwordPlain: data.password,
      idRol: data.idRol,
      correo,
      telefono: data.telefono.trim(),
    });

    const rol = data.idRol === 1 ? "admin" : "usuario";

    return { id: created.id, usuario: created.usuario, rol };
  }

  async validarLogin(usuarioOrCorreo: string, password: string): Promise<{
    id: number;
    usuario: string;
    nombre: string;
    rol: string;
    token: string; 
  }> {
    const input = usuarioOrCorreo.trim();

    const user = await this.authRepository.findByUsuarioOrCorreoAndPassword(input, password);
    if (!user) throw new Error("Credenciales incorrectas");


    
    const hoy = new Date();
const ultima = new Date(user.fechaCambioPassword);

const dias = (hoy.getTime() - ultima.getTime()) / (1000 * 60 * 60 * 24);

if (dias > 30) {
  throw new Error("Debe cambiar su contraseña");
}




    const rol = user.rol?.rol ?? "usuario";

    const token = "";

    return {
      id: user.id,
      usuario: user.usuario,
      nombre: user.nombre,
      rol,
      token,
    };
    
  }

  async resetPassword(correo: string, nuevaPassword: string): Promise<void> {

  const user = await this.authRepository.findByCorreo(correo);
  if (!user) throw new Error("Correo no encontrado");

  if (nuevaPassword.length < 4) {
  throw new Error("La contraseña debe tener mínimo 4 caracteres");
} 

  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(nuevaPassword)) {
  throw new Error("La contraseña debe ser alfanumérica");
  }

  await this.authRepository.updatePassword(correo, nuevaPassword);
  await this.authRepository.updateFechaCambioPassword(correo); //actualizar fecha de cambio
}

}