import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common';
@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'telegram_id', nullable: true })
  telegram_id: string;

  @Column({ type: 'varchar', name: 'username', nullable: true })
  username: string;

  @Column({ type: 'varchar', name: 'first_name', nullable: true })
  first_name: string;

  @Column({ type: 'varchar', name: 'last_name', nullable: true })
  last_name: string;
}
