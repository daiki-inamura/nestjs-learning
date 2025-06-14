import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateUserDto {
    @IsString({message: '文字列で入力してください'})
    @IsNotEmpty({message: 'nameは必須'})
    name: string;

    @IsInt({message:'数値で入力してください'})
    @IsNotEmpty({message:'ageは必須です'})
    age: number;

}