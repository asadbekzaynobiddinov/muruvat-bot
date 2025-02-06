import { Entity, Column, OneToMany } from 'typeorm';
import { Role, BaseEntity } from 'src/common';
import { GenerousEntity } from './generous_applications.entity';
import { PatientsEntity } from './patients_applications.entity';
@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'telegram_id', nullable: true })
  telegram_id: string;

  @Column({ type: 'varchar', name: 'first_name', nullable: true })
  first_name: string;

  @Column({ type: 'varchar', name: 'last_name', nullable: true })
  last_name: string;

  @Column({ type: 'enum', enum: Role, name: 'role', nullable: true })
  role: Role;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phone_number: string;

  @Column({ type: 'text', name: 'location', nullable: true })
  location: string;

  @OneToMany(() => GenerousEntity, (generous) => generous.users)
  generous: GenerousEntity[];

  @OneToMany(() => PatientsEntity, (patients) => patients.users)
  patients: PatientsEntity[];
}
