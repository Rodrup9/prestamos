import { Abono } from "src/abono/entities/abono.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetodoPago {

            @PrimaryGeneratedColumn()
            id: number;
        
            @Column({ type: 'varchar', length: 20, nullable: false })
            nombre: string;
    
            // @ManyToOne(() => Usuario, (usuario) => usuario.id)
            // usuario_creador: Usuario;
        
            @CreateDateColumn({ type: 'datetime2', nullable: true })
            creado: Date;
    
            @OneToMany(() => Abono, (abono) => abono.metodo_pago)
            abonos: Abono[];
        
            @Column({ type: 'bit', default: 1 })
            activo: boolean;
        
            @UpdateDateColumn({ type: 'datetime2' })
            actualizado: Date;
}
