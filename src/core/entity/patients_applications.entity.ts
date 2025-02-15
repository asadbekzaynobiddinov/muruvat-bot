import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity, Genders } from 'src/common';
import { UsersEntity } from './users.entity';
@Entity('patients_applications')
export class PatientsEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', nullable: true })
  name: string;

  @Column({ type: 'smallint', name: 'age', nullable: true })
  age: number;

  @Column({ type: 'varchar', name: 'height', nullable: true })
  height: string;

  @Column({ type: 'text', name: 'stuff', nullable: true })
  stuff: string;

  @Column({ type: 'varchar', name: 'stuff_size', nullable: true })
  size: string;

  @Column({ type: 'varchar', name: 'region', nullable: true })
  region: string;

  @Column({ type: 'varchar', name: 'district', nullable: true })
  district: string;

  @Column({ type: 'enum', enum: Genders, nullable: true })
  gender: Genders;

  @Column({ type: 'jsonb', name: 'media', nullable: true })
  media: { type: string; file_id: string };

  @Column({ type: 'varchar', name: 'user_id', nullable: true })
  user_id: string;

  @ManyToOne(() => UsersEntity, (user) => user.patients)
  user: UsersEntity;
}
