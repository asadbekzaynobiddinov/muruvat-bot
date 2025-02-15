import { Module } from '@nestjs/common';
import { KeysService } from './keys.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity, PatientsEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, PatientsEntity])],
  providers: [KeysService],
})
export class KeysModule {}
