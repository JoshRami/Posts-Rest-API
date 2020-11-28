import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Blog } from './blogs';
import { IsNotEmpty, IsString } from 'class-validator';
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
