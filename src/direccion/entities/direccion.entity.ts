import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Direccion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    calle: string;

    @Column({type: 'varchar', length: 6, nullable: false})
    codigo_postal: string;

    @Column({type: 'varchar', length: 10, nullable: false})
    numero_exterior: string;

    @Column({type: 'varchar', length: 10})
    numero_interior: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.id)
    usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime2', nullable: true })
    creado: Date;

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime2' })
    actualizado: Date;

    // @ManyToOne()
    // id_localidad: Localidad;
}
