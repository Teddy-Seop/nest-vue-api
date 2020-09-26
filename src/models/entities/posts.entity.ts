import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";

import { UserEntity } from './user.entity';
import { CommentsEntity } from './comments.entity';
import { LikesEntity } from './likes.entity';

@Entity({ name: "posts" })
export class PostsEntity {
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
        onUpdate: 'NOW()'
    })
    updatedAt: Date;

    @ManyToOne(
        type => UserEntity,
        entity => entity.posts
    )
    user: UserEntity;

    @OneToMany(
        type => CommentsEntity,
        entity => entity.posts,
        { cascade: true, nullable: true }
    )
    comments: CommentsEntity[];

    @OneToMany(
        type => LikesEntity,
        entity => entity.posts,
        { cascade: true, nullable: true }
    )
    likes: LikesEntity[];
}