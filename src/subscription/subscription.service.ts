import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path/posix';
import { send } from 'process';
import { User } from 'src/auth/user.entity';
import { FollowDto } from './dto/follow.dto';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {

    constructor(
        @InjectRepository(SubscriptionRepository)
        private subscriptionRepository: SubscriptionRepository,
    ) { }


    async followUser(followDto: FollowDto, user:User): Promise<any> {
        const userId = user.id
        if(followDto && userId){
              return this.subscriptionRepository.follow(userId, followDto.folowingId)
        }
        throw new UnauthorizedException('Please check your credentials');
    }



    async unfollow(followDto: FollowDto, user:User): Promise<any> {

        const userId = user.id

        if(followDto && userId){
            return await this.subscriptionRepository.unfollow(userId, followDto.folowingId)
            
        }
        
        
        throw new UnauthorizedException('Please check your credentials');

      

    }





    async listFollowed( user:User): Promise<any> {

        const userId = user.id


        if(userId){
            const follows = await this.subscriptionRepository.findList(userId)
            return follows
            
        }
        
        
        throw new UnauthorizedException('Please check your credentials');

      

    }

}
