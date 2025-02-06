import { Module } from '@nestjs/common';
import {
  AskPatientAddress,
  AskPatientPhone,
  RegisterScenes,
} from './register.scene';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [RegisterScenes, AskPatientPhone, AskPatientAddress],
})
export class ScenesModule {}
