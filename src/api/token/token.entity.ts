import { Column, Entity, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '@/api/user/user.entity';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
  @Exclude()
  @Column({ name: 'access_token' })
  accessToken: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  createdBy: User;
}
