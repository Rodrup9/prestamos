import { MetodoPago } from "src/metodo_pago/entities/metodo_pago.entity";
import { Prestamo } from "src/prestamo/entities/prestamo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Abono {

        @PrimaryGeneratedColumn()
        id: number;
    
        @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
        abono: number;

        @Column({ type: 'date', nullable: false })
        fecha_abono: Date;

        // @ManyToOne(() => Usuario, (usuario) => usuario.id)
        // usuario_creador: Usuario;
    
        @CreateDateColumn({ type: 'datetime', nullable: true })
        creado: Date;

        @ManyToOne(() => Prestamo, (prestamo) => prestamo.abonos)
        prestamo: Prestamo;

        @ManyToOne(() => MetodoPago, (metodoPago) => metodoPago.abonos)
        metodo_pago: MetodoPago;
    
        @Column({ type: 'bit', default: 1 })
        activo: boolean;
    
        @UpdateDateColumn({ type: 'datetime' })
        actualizado: Date;
}
