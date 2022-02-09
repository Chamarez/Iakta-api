import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Messages } from './message.entity';
  
  @EntityRepository(Messages)
  export class MessageRepository extends Repository<Messages> {
      
    async createMessage(
      userId: string,
      text: string,
    ): Promise<void> {
      const newMessage = this.create({ userId, text });
      //todo find to check if is follower
      try {
        await this.save(newMessage);
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('This email is already registered');
        }

        throw new InternalServerErrorException();
      }
    }

  }