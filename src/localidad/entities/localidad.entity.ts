import { Direccion } from "src/direccion/entities/direccion.entity";
import { Municipio } from "src/municipio/entities/municipio.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Localidad {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre: string;

    @ManyToOne(() => Municipio, (municipio) => municipio.id)
    municipio: Municipio;

    @ManyToOne(() => Direccion, (direccion) => direccion.id)
    @JoinColumn()
    direccion: Direccion;

    // @ManyToOne(() => Usuario, (usuario) => usuario.id)
    // usuario_creador: Usuario;

    @CreateDateColumn({ type: 'datetime2', nullable: true })
    creado: Date;

    @Column({ type: 'bit', default: 1 })
    activo: boolean;

    @UpdateDateColumn({ type: 'datetime2' })
    actualizado: Date;
}
