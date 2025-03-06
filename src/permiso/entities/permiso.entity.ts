import { Rol } from "src/rol/entities/rol.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Permiso {

      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ type: 'varchar', length: 100, nullable: false })
      nombre: string;
    
      @ManyToMany(() => Rol, rol => rol.permisos)
      @JoinTable()
      roles: Rol[];
    
      @ManyToOne(() => Usuario, (usuario) => usuario.id)
      usuario_creador: Usuario;
    
      @CreateDateColumn({ type: 'datetime2', nullable: true })
      creado: Date;
    
      @Column({ type: 'bit', default: 1 })
      activo: boolean;
    
      @UpdateDateColumn({ type: 'datetime2' })
      actualizado: Date;

}
