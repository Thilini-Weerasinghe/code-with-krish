import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    @IsNotEmpty()
    name : string;
    @Column({ nullable: false })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @Column()
    @IsOptional()
    address : string;
}