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
import { Comment } from './comments';
import { Tag } from './tags';
import {
  IsString,
  IS_NOT_EMPTY,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

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

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment)
  comment: Comment[];
}
