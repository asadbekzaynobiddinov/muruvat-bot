import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common';
import { UsersEntity } from './users.entity';

@Entity('generous_applications')
export class GenerousEntity extends BaseEntity {
  @Column({ type: 'text', name: 'stuff', nullable: true })
  stuff: string;

  @Column({ type: 'varchar', nullable: true })
  whom: string;

  @ManyToOne(() => UsersEntity, (user) => user.generous)
  user: UsersEntity;
}
