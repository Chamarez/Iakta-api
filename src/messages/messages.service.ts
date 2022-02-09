import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { SubscriptionRepository } from 'src/subscription/subscription.repository';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessageRepository)
        private messageRepository: MessageRepository,
    ) { }

    createMessage(createMessageDto: CreateMessageDto, user:User): Promise<any> {
        const userId = user.id
        const {text} = createMessageDto


        if(createMessageDto && userId){
              return  this.messageRepository.createMessage(userId, text) 
        }
        throw new UnauthorizedException('Please check your credentials');
    }


    async getStream(user:User): Promise<any> {
        const userId = user.id
        let msj = await this.messageRepository.query(`
        
        SELECT test.user.name, test.messages.text
FROM test.user
INNER JOIN test.messages
WHERE test.user.id = test.messages.userId
ORDER BY test.messages.createdAt DESC
        `);
        return msj
        

    }


    
}
