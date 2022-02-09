import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @UseGuards(AuthGuard())
    @Post('/create')
   async creatMessage(
    @Body() createMessageDto: CreateMessageDto,   
    @GetUser() user: User,): Promise<void> {
      return this.messagesService.createMessage(createMessageDto, user );
    }


    @UseGuards(AuthGuard())
    @Get('/get-stream')
   async getStream(
    @GetUser() user: User,): Promise<void> {
      return this.messagesService.getStream(user);
    }



}
