import { IsNotEmpty, MaxLength, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @Column({
    length: 50,
  })
  tag: string;
}
