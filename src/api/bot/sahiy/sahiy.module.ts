import { Module } from '@nestjs/common';
import { ActionsService } from './actions/actions.service';
import { ScenesModule } from './scenes/scenes.module';
import { ActionsModule } from './actions/actions.module';
import { ButtonModule } from '../button/button.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core';

@Module({
  providers: [ActionsService],
  imports: [
    ScenesModule,
    ActionsModule,
    ButtonModule,
    TypeOrmModule.forFeature([UsersEntity]),
  ],
})
export class SahiyModule {}
