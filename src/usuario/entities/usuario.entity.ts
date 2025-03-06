import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, OneToOne } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    clave: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    correo: string;

    @OneToMany(() => Cliente, (cliente) => cliente.usuario_asignado)
    @JoinColumn()
    clientes_asignados: Cliente[];

    @ManyToOne(() => Usuario, (usuario) => usuario.id)
    usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime2', nullable: true })
    creado: Date;

    @ManyToMany(() => Rol, (rol) => rol.usuarios)
    roles: Rol[]

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime2' })
    actualizado: Date;
}
