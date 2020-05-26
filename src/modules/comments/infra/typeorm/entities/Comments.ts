import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Post from '@modules/posts/infra/typeorm/entities/Posts';
import User from '@modules/users/infra/typeorm/entities/Users';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'post_id' })
  user: User;

  @ManyToOne(() => Post, post => post.comment, { eager: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
