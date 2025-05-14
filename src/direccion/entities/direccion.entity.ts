import { Cliente } from "src/cliente/entities/cliente.entity";
import { Localidad } from "src/localidad/entities/localidad.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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

    @OneToOne(() => Cliente, (cliente) => cliente.direccion)
    cliente: Cliente;

    // @ManyToOne(() => Usuario, (usuario) => usuario.id)
    // usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    creado: Date;

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime' })
    actualizado: Date;

    @ManyToOne(() => Localidad, (localidad) => localidad.id)
    localidad: Localidad;
}
