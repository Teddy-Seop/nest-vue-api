import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

import { UserEntity } from './';
import { PostsEntity } from '@/models/entities';

@Entity({ name: "comments" })
export class CommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    postsId: number;

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
        entity => entity.comments
    )
    user: UserEntity;

    @ManyToOne(
        type => PostsEntity,
        entity => entity.comments
    )
    posts: PostsEntity;
}