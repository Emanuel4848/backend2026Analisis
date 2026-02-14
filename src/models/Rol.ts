import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Usuario } from "./Usuario";

@Table({
  tableName: "rol",
  timestamps: false,
})
export class Rol extends Model {
  @Column({
    field: "Id_Rol",
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  idRol!: number;

  @Column({
    field: "Rol",
    type: DataType.STRING(150),
    allowNull: false,
  })
  rol!: string;

  @HasMany(() => Usuario)
  usuarios!: Usuario[];
}