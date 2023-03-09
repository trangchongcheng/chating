import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  walletAddress: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  refreshToken: string | null;

  @Column({ type: 'varchar', default: false })
  isOnline: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastOnline: Date;
}
