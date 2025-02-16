import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/core';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [CommandsService],
})
export class CommandsModule {}
