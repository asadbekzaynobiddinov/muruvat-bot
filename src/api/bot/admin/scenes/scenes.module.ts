import { Module } from '@nestjs/common';
import {
  SearchGenerousForAdminByName,
  SearchGenerousForAdminByPhone,
} from './searchgenerous.scene';
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
  ],
})
export class ScenesModule {}
