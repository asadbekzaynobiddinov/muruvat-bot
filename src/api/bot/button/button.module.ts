import { Module } from '@nestjs/common';
import { ButtonsService } from './button.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsEntity, UsersEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, PatientsEntity])],
  exports: [ButtonsService],
  providers: [ButtonsService],
})
export class ButtonModule {}
