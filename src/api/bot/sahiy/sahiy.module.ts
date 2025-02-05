import { Module } from '@nestjs/common';
import { ActionsService } from './actions/actions.service';
import { ScenesModule } from './scenes/scenes.module';
import { ActionsModule } from './actions/actions.module';

@Module({
  providers: [ActionsService],
  imports: [ScenesModule, ActionsModule],
})
export class SahiyModule {}
