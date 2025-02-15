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
import {
  AskPatientNeeds,
  AskPatientNeedsStuffSize,
  EnterTheAgeOfPatientScene,
  EnterTheHeightOfPatientScene,
  EnterTheNameOfPatientScene,
  SendApplyScene,
  SendMediaApplyScene,
} from './patient.application.scene';
import { ReportToAdminAsPatient } from './reportto.admin.scene';
import { ChangePatientsPhone } from './change_number';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, PatientsEntity])],
  providers: [
    RegisterScenes,
    AskPatientPhone,
    AskPatientAddress,
    ButtonsService,
    AskPatientDistrict,
    ChangePatientsPhone,
    SendApplyScene,
    SendMediaApplyScene,
    EnterTheNameOfPatientScene,
    EnterTheAgeOfPatientScene,
    EnterTheHeightOfPatientScene,
    AskPatientNeeds,
    AskPatientNeedsStuffSize,
    ReportToAdminAsPatient,
    ChangePatientsPhone,
  ],
})
export class ScenesModule {}
