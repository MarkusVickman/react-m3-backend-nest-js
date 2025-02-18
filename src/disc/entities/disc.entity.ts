import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity'

//Ett schema för en MySql tabell. Inte så mycket att säga mer än att den skapas enligt dessa specs i MySql-databasen.
//TYPEORM ger säkerhet mot SQL-injektioner.
@Entity()
export class Disc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  heading: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ length: 10000, nullable: true  })
  about: string;

  @Column({ length: 255 }) // Kolumn som lagrar e-postadressen
  email: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Specificera onDelete och onUpdate
  @JoinColumn({ name: 'email', referencedColumnName: 'email' }) // Skapar en relation via e-postkolumnen
  user: User;
}