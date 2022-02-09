import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FollowDto } from './dto/follow.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) {}

    @UseGuards(AuthGuard())
    @Post('/follow')
   async follow(@Body() follow: FollowDto, 
    @GetUser() user: User,): Promise<void> {
      return this.subscriptionService.followUser(follow, user);
    }

    @UseGuards(AuthGuard())
    @Delete('/unfollow')
   async unfollow(@Body() follow: FollowDto, 
    @GetUser() user: User,): Promise<void> {
      return this.subscriptionService.unfollow(follow, user);
    }

    @UseGuards(AuthGuard())
    @Get('/list-followed')
   async listFollowed(
    @GetUser() user: User,): Promise<void> {
      return this.subscriptionService.listFollowed(user);
    } 


}
