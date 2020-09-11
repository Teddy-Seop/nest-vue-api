import {Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany} from "typeorm";
import { PostsEntity } from './posts.entity';
import { CommentsEntity } from './comments.entity';
import { LikesEntity } from './likes.entity';

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

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

    @OneToMany(
        type => PostsEntity,
        entity => entity.user    
    )
    posts: PostsEntity[];

    @OneToMany(
        type => CommentsEntity,
        entity => entity.user    
    )
    comments: CommentsEntity[];

    @OneToMany(
        type => LikesEntity,
        entity => entity.user
    )
    likes: LikesEntity[];
}