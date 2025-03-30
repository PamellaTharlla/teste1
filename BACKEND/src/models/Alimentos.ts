
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IAlimento {
  id?: number;
  nome: string;
  calorias: string;
  carboidratos: string;
  proteina: string;
  gordura: string;
  vitaminas: object;  
  minerais: object;   
}

@Entity()
export class Alimento implements IAlimento {
  @PrimaryGeneratedColumn('increment') 
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 100 })
  calorias!: string;

  @Column({ type: 'varchar', length: 100 })
  carboidratos!: string;

  @Column({ type: 'varchar', length: 100 })
  proteina!: string;

  @Column({ type: 'varchar', length: 100 })
  gordura!: string;

  @Column({ type: 'json' })
  vitaminas!: object;  

  @Column({ type: 'json' })
  minerais!: object;   
}
