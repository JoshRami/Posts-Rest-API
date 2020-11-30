import { IsNotEmpty, MaxLength, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Blog } from './blogs';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => Blog, (blog) => blog.tags)
  blogs: Blog[];

  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @Column({
    length: 50,
  })
  tag: string;
}
