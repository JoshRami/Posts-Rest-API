import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

import { Blog } from './blogs';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ManyToOne(() => Blog, (blog) => blog.id)
  blog: Blog;
}
