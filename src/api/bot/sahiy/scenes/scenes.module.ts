import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsEntity, UsersEntity } from 'src/core';
import {
  AskGenerousProvince,
  AskGenerousPhone,
  RegisterAsGenerous,
  AskGenerousDistrict,
} from './register.scenes';
import { ChangeGenerosPhone } from './change.phone.scene';
import { ButtonsService } from '../../button/button.service';
import { ButtonModule } from '../../button/button.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, PatientsEntity]),
    ButtonModule,
  ],
  providers: [
    RegisterAsGenerous,
    AskGenerousPhone,
    AskGenerousProvince,
    ButtonsService,
    AskGenerousDistrict,
    ChangeGenerosPhone,
  ],
})
export class ScenesModule {}
