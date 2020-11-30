import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  MinKey,
} from 'typeorm';
import { IsString, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { Comment } from './comments';
import { Tag } from './tags';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column('text')
  @IsNotEmpty()
  @MinLength(128)
  @IsString()
  content: string;

  @CreateDateColumn({ name: 'creationDate' })
  creationDate: Date;

  @ManyToMany((type) => Tag, (tag) => tag.blogs)
  @JoinTable({ name: 'blog_tags' })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment)
  comment: Comment[];
}
