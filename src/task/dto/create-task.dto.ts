import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsString({message: 'titleは文字列で入力してください'})
    @IsNotEmpty({message: 'titleは必須です'})
    @MaxLength(255, {message: 'titleは最大255文字までです'})
    title: string;

     @IsString({message: 'descriptionは文字列で入力してください'})
    @IsNotEmpty({message: 'descriptionは必須です'})
    @MaxLength(255, {message: 'descriptionは最大255文字までです'})
    description: string;
}