import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Transform, TransformFnParams } from "class-transformer";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    preco: number;

    @IsNumber()
    @IsNotEmpty()
    @Column({nullable: false})
    quantidade: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria
}