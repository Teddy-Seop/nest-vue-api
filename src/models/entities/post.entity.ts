import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
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
