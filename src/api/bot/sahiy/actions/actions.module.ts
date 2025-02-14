import { Module } from '@nestjs/common';
import { ButtonModule } from '../../button/button.module';
import { ActionsService } from '../../admin/actions/actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core';

@Module({
  imports: [ButtonModule, TypeOrmModule.forFeature([UsersEntity])],
  providers: [ActionsService],
})
export class ActionsModule {}
