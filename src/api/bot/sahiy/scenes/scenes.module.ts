import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core';
import { RegisterAsGenerous } from './scenes.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [RegisterAsGenerous],
})
export class ScenesModule {}
