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
}