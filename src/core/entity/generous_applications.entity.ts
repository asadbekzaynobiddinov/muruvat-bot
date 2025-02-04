import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity, ForWhom } from 'src/common';
import { UsersEntity } from './users.entity';

@Entity('generous_applications')
export class GenerousEntity extends BaseEntity {
  @Column({ type: 'text', name: 'stuff' })
  stuff: string;

  @Column({ type: 'enum', enum: ForWhom, name: 'whom' })
  whom: ForWhom;

  @Column({ type: 'integer', name: 'patient_id' })
  patient_id: number;

  @Column({ type: 'integer', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => UsersEntity, (user) => user.generous)
  @JoinColumn({ name: 'user_id' })
  users: UsersEntity;
}
