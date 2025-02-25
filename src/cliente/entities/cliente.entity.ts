import { Direccion } from "src/direccion/entities/direccion.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Cliente {
    
    @PrimaryGeneratedColumn()
    id: number;
        
    @Column({ type: 'varchar', length: 50, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: false})
    apellido_paterno: string;

    @Column({type: 'varchar', length: 50})
    apellido_materno: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    rfc: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    ine: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    comp_domicilio: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    curp: string;

    @Column({ type: 'date', nullable: true })
    fecha_nacimiento: Date;

    @OneToOne(() => Direccion, (direccion) => direccion.id)
    direccion: Direccion;

    @OneToOne(() => Usuario, (usuario) => usuario.id)
    usuario_asignado: Usuario;

    @ManyToOne(() => Usuario, (usuario) => usuario.id)
    usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime2', nullable: true })
    creado: Date;

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime2' })
    actualizado: Date;
}
