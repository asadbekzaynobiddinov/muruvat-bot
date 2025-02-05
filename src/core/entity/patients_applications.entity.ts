import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity, Genders } from 'src/common';
import { UsersEntity } from './users.entity';
@Entity('patients_applications')
export class PatientsEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'smallint', name: 'age' })
  age: number;

  @Column({ type: 'varchar', name: 'height' })
  height: string;

  @Column({ type: 'text', name: 'stuff' })
  stuff: string;

  @Column({ type: 'varchar', name: 'stuff_size' })
  stuff_size: string;

  @Column({ type: 'enum', enum: Genders })
  gender: Genders;

  @Column({ type: 'varchar', name: 'media' })
  media: string;

  @Column({ type: 'integer', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => UsersEntity, (users) => users.patients)
  @JoinColumn({ name: 'user_id' })
  users: UsersEntity;
}
