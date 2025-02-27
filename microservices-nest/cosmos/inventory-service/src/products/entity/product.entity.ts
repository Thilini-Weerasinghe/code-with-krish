import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column('decimal')
  @IsNotEmpty()
  price: number;

  @Column()
  @IsNotEmpty()
  quantity: number;
}