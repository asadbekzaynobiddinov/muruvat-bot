import { Module } from '@nestjs/common';
import {
  AskPatientAddress,
  AskPatientDistrict,
  AskPatientPhone,
  RegisterScenes,
} from './register.scene';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsEntity, UsersEntity } from 'src/core';
import { ButtonsService } from '../../button/button.service';
import { changePatientPhone } from './patient.menu.scene';
import {
  enterTheNameOfPatientScene,
  SendApplyScene,
} from './patient.application.scene';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, PatientsEntity])],
  providers: [
    RegisterScenes,
    AskPatientPhone,
    AskPatientAddress,
    ButtonsService,
    AskPatientDistrict,
    changePatientPhone,
    SendApplyScene,
    enterTheNameOfPatientScene,
  ],
})
export class ScenesModule {}
