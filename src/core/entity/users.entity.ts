import { Entity, Column, OneToMany } from 'typeorm';
import { Role, BaseEntity } from 'src/common';
import { GenerousEntity } from './generous_applications.entity';
import { PatientsEntity } from './patients_applications.entity';
import { Languages } from 'src/common/enum/language';
@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'telegram_id', unique: true })
  telegram_id: string;

  @Column({ type: 'varchar', name: 'name', nullable: true })
  name: string;

  @Column({ type: 'enum', enum: Role, name: 'role', nullable: true })
  role: Role;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', name: 'region', nullable: true })
  region: string;

  @Column({ type: 'varchar', name: 'districet', nullable: true })
  district: string;

  @Column({ type: 'enum', enum: Languages })
  lang: Languages;

  @OneToMany(() => GenerousEntity, (generous) => generous.users)
  generous: GenerousEntity[];

  @OneToMany(() => PatientsEntity, (patients) => patients.users)
  patients: PatientsEntity[];
}
