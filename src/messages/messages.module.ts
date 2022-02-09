import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SubscriptionRepository } from 'src/subscription/subscription.repository';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports:[ TypeOrmModule.forFeature([SubscriptionRepository]), PassportModule, AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
