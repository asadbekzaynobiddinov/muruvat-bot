import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core';
import {
  AskGenerousProvince,
  AskGenerousPhone,
  RegisterAsGenerous,
  AskGenerousDistrict,
} from './register.scenes';
import { ButtonsService } from '../../button/button.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [
    RegisterAsGenerous,
    AskGenerousPhone,
    AskGenerousProvince,
    ButtonsService,
    AskGenerousDistrict,
  ],
})
export class ScenesModule {}
