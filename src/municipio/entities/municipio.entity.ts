import { Estado } from "src/estado/entities/estado.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Municipio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string;

    @ManyToOne(() => Estado, (estado) => estado.id)
    estado: Estado;

    @ManyToOne(() => Localidad, (localidad) => localidad.id)
    @JoinColumn()
    localidad: Localidad;

    // @ManyToOne(() => Usuario, (usuario) => usuario.id)
    // usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    creado: Date;

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime' })
    actualizado: Date;
}
