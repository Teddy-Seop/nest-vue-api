import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

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
