import { Abono } from "src/abono/entities/abono.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity()
export class Prestamo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    monto: number;

    @Column({ type: 'date', nullable: false })
    fecha_inicio: Date;

    @Column({ type: 'date', nullable: false })
    fecha_fin: Date;

    @Column({ type: 'int', nullable: false })
    intervalo_pago: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    pago_minimo: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    tasa: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    contrato: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.prestamos)
    prestamista: Usuario;

    @ManyToOne(() => Cliente, (cliente) => cliente.prestamos)
    cliente: Cliente; 

    @OneToMany(() => Abono, (abono) => abono.prestamo)
    abonos: Abono[];

    // @ManyToOne(() => Usuario, (usuario) => usuario.id)
    // usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime2', nullable: true })
    creado: Date;

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime2' })
    actualizado: Date;

}
