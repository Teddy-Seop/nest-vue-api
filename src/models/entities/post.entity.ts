import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  contents: string;

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
    entity => entity.posts,
  )
  user: UserEntity;

  @OneToMany(
    type => CommentEntity,
    entity => entity.post,
    { cascade: true, nullable: true },
  )
  comments: CommentEntity[];

  @OneToMany(
    type => LikeEntity,
    entity => entity.post,
    { cascade: true, nullable: true },
  )
  likes: LikeEntity[];
}
