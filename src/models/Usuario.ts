import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Rol } from "./Rol";

@Table({
  tableName: "usuarios",
  timestamps: false,
})
export class Usuario extends Model {
  @Column({
    field: "Id",
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    field: "Usuario",
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  usuario!: string;

  @Column({
    field: "Nombre",
    type: DataType.STRING(250),
    allowNull: false,
  })
  nombre!: string;

  @Column({
    field: "Password",
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @ForeignKey(() => Rol)
  @Column({
    field: "Id_Rol",
    type: DataType.INTEGER,
    allowNull: false,
  })
  idRol!: number;

  @BelongsTo(() => Rol)
  rol!: Rol;

  @Column({
    field: "Correo",
    type: DataType.STRING(150),
    allowNull: false,
    unique: true,
  })
  correo!: string;

  @Column({
    field: "Telefono",
    type: DataType.STRING(20),
    allowNull: false,
  })
  telefono!: string;

  @Column({
    field: "FechaCambioPassword",
    type: DataType.DATE,
  })
  fechaCambioPassword!: Date;

}