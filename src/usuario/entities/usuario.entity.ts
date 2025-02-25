import { Rol } from 'src/rol/entities/rol.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany } from 'typeorm';

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

    @ManyToOne(() => Usuario, (usuario) => usuario.id)
    usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime2', nullable: true })
    creado: Date;

    @ManyToMany(() => Rol, (rol) => rol.id)
    roles: Rol[]

    @UpdateDateColumn({ type: 'datetime2' })
    actualizado: Date;
}
