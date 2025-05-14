import { Municipio } from "src/municipio/entities/municipio.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Estado {
        @PrimaryGeneratedColumn()
        id: number;
    
        @Column({ type: 'varchar', length: 255, nullable: false })
        nombre: string;

        @ManyToOne(() => Municipio, (municipio) => municipio.id)
        @JoinColumn()
        municipio: Municipio;
    
        // @ManyToOne(() => Usuario, (usuario) => usuario.id)
        // usuario_creador: Usuario;
    
        @CreateDateColumn({ type: 'datetime', nullable: true })
        creado: Date;
    
        @Column({ type: 'bit', default: 1 })
        activo: boolean;
    
        @UpdateDateColumn({ type: 'datetime' })
        actualizado: Date;

}
