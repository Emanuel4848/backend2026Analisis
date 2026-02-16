import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AuthServiceImpl } from "../services/AuthServiceImpl";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthServiceImpl();
  }

  async register(req: Request, res: Response) {
    const { usuario, nombre, password, idRol, correo, telefono } = req.body;

    try {
      if (!usuario || !nombre || !password || !idRol || !correo || !telefono) {
        return res.status(400).json({ message: "Faltan campos" });
      }

      const created = await this.authService.registrar({
        usuario,
        nombre,
        password,
        idRol: Number(idRol),
        correo,
        telefono,
      });

      return res.status(201).json({
        message: "Registro exitoso",
        id: created.id,
        usuario: created.usuario,
        rol: created.rol,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ message: error.message ?? "Error en registro" });
    }
  }



  async login(req: Request, res: Response) {
    const { usuarioOrCorreo, password } = req.body;

    try {
      if (!usuarioOrCorreo || !password) {
        return res.status(400).json({ message: "Faltan campos" });
      }

      const result = await this.authService.validarLogin(usuarioOrCorreo, password);

      return res.status(200).json({
        message: "Login exitoso",
        id: result.id,
        usuario: result.usuario,
        nombre: result.nombre,
        rol: result.rol,
        token: result.token,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(401).json({ message: error.message ?? "Login fallido" });
    }
  }


  async resetPassword(req: Request, res: Response) {
  const { correo, nuevaPassword } = req.body;

  try {
    if (!correo || !nuevaPassword) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    await this.authService.resetPassword(correo, nuevaPassword);

    return res.status(200).json({
      message: "Contraseña actualizada correctamente"
    });

  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Error al actualizar contraseña"
    });
  }
} 
}