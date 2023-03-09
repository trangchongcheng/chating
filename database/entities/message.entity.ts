import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity()
export class Message extends BaseEntity {
  @Column({ type: 'varchar' })
  message: string;

  @PrimaryColumn({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @PrimaryColumn({ type: 'varchar' })
  roomId: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
