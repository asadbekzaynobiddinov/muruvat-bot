import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/core';
import {
  AskGenerousAddress,
  AskGenerousPhone,
  RegisterAsGenerous,
} from './register.scenes';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [RegisterAsGenerous, AskGenerousPhone, AskGenerousAddress],
})
export class ScenesModule {}
