import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';


export class FollowDto {


    @IsNotEmpty()
    @IsNumber()
    folowingId: string;
}