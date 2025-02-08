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
import { ButtonModule } from '../../button/button.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), ButtonModule],
  providers: [
    RegisterAsGenerous,
    AskGenerousPhone,
    AskGenerousProvince,
    ButtonsService,
    AskGenerousDistrict,
  ],
})
export class ScenesModule {}
