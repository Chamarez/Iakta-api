import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';


export class CreateMessageDto {

    @IsNotEmpty()
    @IsString()
    receiverId: string;


    @IsNotEmpty()
    @IsString()
    text: string;
}