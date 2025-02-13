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
  AskPatientNeedsStuffSize,
  EnterTheAgeOfPatientScene,
  EnterTheHeightOfPatientScene,
  EnterTheNameOfPatientScene,
  SendApplyScene,
  SendMediaApplyScene,
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
    SendMediaApplyScene,
    EnterTheNameOfPatientScene,
    EnterTheAgeOfPatientScene,
    EnterTheHeightOfPatientScene,
    AskPatientNeeds,
    AskPatientNeedsStuffSize,
  ],
})
export class ScenesModule {}
