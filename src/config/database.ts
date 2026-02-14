import { Sequelize } from "sequelize-typescript";
import { Usuario } from "../models/Usuario";
import { Rol } from "../models/Rol";

export const sequelize = new Sequelize({
  database: "Analisis2026",
  username: "postgres",
  password: "EMANUEL1234567",
  host: "localhost",
  dialect: "postgres",
  models: [Usuario, Rol],
  logging: false,
});