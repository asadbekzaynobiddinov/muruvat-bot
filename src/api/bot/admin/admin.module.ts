import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { CommandsModule } from './commands/commands.module';
import { ScenesModule } from './scenes/scenes.module';

@Module({
  imports: [ActionsModule, CommandsModule, ScenesModule],
})
export class AdminModule {}
