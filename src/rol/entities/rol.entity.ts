import { Permiso } from 'src/permiso/entities/permiso.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @ManyToMany(() => Usuario, usuario => usuario.roles)
  @JoinTable()
  usuarios: Usuario[];

  @ManyToMany(() => Permiso, (permiso) => permiso.roles)
  permisos: Permiso[];

  // @ManyToOne(() => Usuario, (usuario) => usuario.id)
  // usuario_creador: Usuario;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  creado: Date;

  @Column({ type: 'bit', default: 1 })
  activo: boolean;

  @UpdateDateColumn({ type: 'datetime' })
  actualizado: Date;
}
