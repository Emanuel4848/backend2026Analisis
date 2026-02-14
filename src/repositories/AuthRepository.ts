import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";

export class AuthRepository {
  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return Usuario.findOne({ where: { usuario } });
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    return Usuario.findOne({ where: { correo } });
  }

  async createUser(data: {
    usuario: string;
    nombre: string;
    passwordPlain: string; 
    idRol: number;
    correo: string;
    telefono: string;
  }): Promise<Usuario> {
    return Usuario.create({
      usuario: data.usuario,
      nombre: data.nombre,
      password: data.passwordPlain, 
      idRol: data.idRol,
      correo: data.correo,
      telefono: data.telefono,
    });
  }

  async findByUsuarioOrCorreoAndPassword(usuarioOrCorreo: string, password: string): Promise<Usuario | null> {
    const isEmail = usuarioOrCorreo.includes("@");

    return Usuario.findOne({
      where: isEmail
        ? { correo: usuarioOrCorreo.toLowerCase(), password }
        : { usuario: usuarioOrCorreo, password },
      include: [Rol],
    });
  }
}