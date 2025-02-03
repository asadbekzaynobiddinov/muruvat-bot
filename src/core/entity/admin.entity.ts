import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common';
@Entity('admin')
export class AdminEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'telegram_id' })
  telegram_id: string;

  @Column({ type: 'varchar', name: 'username' })
  username: string;

  @Column({ type: 'varchar', name: 'first_name' })
  first_name: string;

  @Column({ type: 'varchar', name: 'last_name' })
  last_name: string;

  @Column({ type: 'varchar', name: 'phone_number' })
  phone_number: string;
}
