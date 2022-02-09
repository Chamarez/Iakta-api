import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { EntityRepository, getRepository, Repository } from 'typeorm';
  import { Subscription } from './subscription.entity';
  import { getManager } from 'typeorm'
import { UsersRepository } from 'src/auth/users.repository';
  
  @EntityRepository(Subscription)
  export class SubscriptionRepository extends Repository<Subscription> {
      
    async follow(
      userId: string,
      folowingId: string,
    ): Promise<void> {
      const follow = this.create({ userId, folowingId });
      //todo find to check if is follower
      try {
        await this.save(follow);
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('This email is already registered');
        }

        throw new InternalServerErrorException();
      }
    }

    async unfollow(
      userId: string,
      folowingId: string,
    ): Promise<void> {
      //todo find to check if is follower
      try {
        const follow = this.delete({ userId, folowingId });
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('This is already followed');
        }
        throw new InternalServerErrorException();
      }
    }

    async findList(
      userId: string
    ): Promise<Subscription[]> {
      //todo find to check if is follower
      try {
        const follow = this.find({ select: ["userId"], where:{userId:userId}});
        return follow;
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
          throw new ConflictException('This is already followed');
        }
        throw new InternalServerErrorException();
      }
    }



  }