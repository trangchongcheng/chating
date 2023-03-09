import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Room extends BaseEntity {
  @Column({ type: 'varchar' })
  roomName: string;

  @Column({ type: 'varchar' })
  fromWalletAddress: string;

  @Column({ type: 'varchar' })
  toWalletAddress: string;

  @Column({ type: 'varchar' })
  createdBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  user: User;
}
