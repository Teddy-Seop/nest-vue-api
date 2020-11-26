import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { UserEntity } from '.';
import { PostEntity } from '@/models/entities';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updatedAt: Date;

  @ManyToOne(
    type => UserEntity,
    entity => entity.comments,
  )
  user: UserEntity;

  @ManyToOne(
    type => PostEntity,
    entity => entity.comments,
  )
  post: PostEntity;
}
