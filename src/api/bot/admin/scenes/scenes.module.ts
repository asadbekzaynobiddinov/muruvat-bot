import { Module } from '@nestjs/common';
import {
  SearchGenerousForAdminByName,
  SearchGenerousForAdminByPhone,
} from './searchgenerous.scene';
import {
  SearchPatientForAdminByPhone,
  SearchpPatientForAdminByName,
} from './searchpatient.scene';
import { SendMessage } from './sendMessage.scene';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  GenerousEntity,
  PatientsEntity,
  UsersEntity,
} from 'src/core';
import { ButtonsService } from '../../button/button.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      PatientsEntity,
      GenerousEntity,
      AdminEntity,
    ]),
  ],
  providers: [
    ButtonsService,
    SearchGenerousForAdminByName,
    SearchGenerousForAdminByPhone,
    SearchPatientForAdminByPhone,
    SearchpPatientForAdminByName,
    SendMessage,
  ],
})
export class ScenesModule {}
