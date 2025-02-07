import { Module } from '@nestjs/common';
import {
  AskPatientAddress,
  AskPatientDistrict,
  AskPatientPhone,
  RegisterScenes,
} from './register.scene';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core';
import { ButtonsService } from '../../button/button.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [
    RegisterScenes,
    AskPatientPhone,
    AskPatientAddress,
    ButtonsService,
    AskPatientDistrict,
  ],
})
export class ScenesModule {}
