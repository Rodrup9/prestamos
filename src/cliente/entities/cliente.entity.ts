import { Direccion } from "src/direccion/entities/direccion.entity";
import { Prestamo } from "src/prestamo/entities/prestamo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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

    @OneToOne(() => Direccion, { cascade: true }) // Opcional: cascade permite guardar automáticamente la dirección
    @JoinColumn()
    direccion: Direccion;

    @ManyToOne(() => Usuario, (usuario) => usuario.clientes_asignados)
    usuario_asignado: Usuario;

    @OneToMany(() => Prestamo, (prestamo) => prestamo.cliente)
    prestamos: Prestamo[];

    // @ManyToOne(() => Usuario, (usuario) => usuario.id)
    // usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime2', nullable: true })
    creado: Date;

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime2' })
    actualizado: Date;
}
