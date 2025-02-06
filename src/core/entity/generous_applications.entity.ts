import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity, ForWhom } from 'src/common';
import { UsersEntity } from './users.entity';

@Entity('generous_applications')
export class GenerousEntity extends BaseEntity {
  @Column({ type: 'text', name: 'stuff', nullable: true })
  stuff: string;

  @Column({ type: 'enum', enum: ForWhom, name: 'whom', nullable: true })
  whom: ForWhom;

  @Column({ type: 'integer', name: 'patient_id', nullable: true })
  patient_id: number;

  @Column({ type: 'integer', name: 'user_id', nullable: true })
  user_id: number;

  @ManyToOne(() => UsersEntity, (user) => user.generous)
  @JoinColumn({ name: 'user_id' })
  users: UsersEntity;
}
