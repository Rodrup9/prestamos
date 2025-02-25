import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @CreateDateColumn({ type: 'datetime2', nullable: true })
  creado: Date;

  @ManyToMany(() => Usuario, (usuario) => usuario.id)
  @JoinTable()
  usuarios: Usuario[]

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  usuario_creador: Usuario[]

  @UpdateDateColumn({ type: 'datetime2', nullable: true })
  actualizado: Date;
}
