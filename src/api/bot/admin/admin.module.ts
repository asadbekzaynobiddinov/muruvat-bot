import { Module } from '@nestjs/common';
// import { ActionsModule } from './actions/actions.module';
import { CommandsModule } from './commands/commands.module';
import { ScenesModule } from './scenes/scenes.module';
// import { ActionsService } from './actions/actions.service';
import { KeysService } from './inlineKeys/keys.update';
import { KeysModule } from './inlineKeys/keys.module';

@Module({
  providers: [KeysService],
  imports: [KeysModule, CommandsModule, ScenesModule],
})
export class AdminModule {}
