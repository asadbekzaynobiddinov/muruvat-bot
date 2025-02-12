import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AskPatientAddress,
  AskPatientDistrict,
  AskPatientPhone,
  RegisterScenes,
} from './register.scene';
import { PatientsEntity, UsersEntity } from 'src/core';
import { ButtonsService } from '../../button/button.service';
import { changePatientPhone } from './patient.menu.scene';
import {
  AskPatientNeeds,
  EnterTheAgeOfPatientScene,
  EnterTheHeightOfPatientScene,
  EnterTheNameOfPatientScene,
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
    EnterTheNameOfPatientScene,
    EnterTheAgeOfPatientScene,
    EnterTheHeightOfPatientScene,
    AskPatientNeeds,
  ],
})
export class ScenesModule {}
