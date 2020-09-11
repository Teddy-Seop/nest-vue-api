import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { PostsEntity } from './posts.entity';
import { UserEntity } from './user.entity';

@Entity({ name: "likes" })
export class LikesEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
        type => PostsEntity,
        entity => entity.likes    
    )
    posts: PostsEntity[];

    @ManyToOne(
        type => UserEntity,
        entity => entity.likes    
    )
    user: UserEntity[];
}