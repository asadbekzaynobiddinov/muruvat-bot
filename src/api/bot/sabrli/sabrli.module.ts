import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { ScenesModule } from './scenes/scenes.module';
import { ScenesService } from './scenes/scenes.service';

@Module({
  imports: [ActionsModule, ScenesModule],
  providers: [ScenesService],
})
export class SabrliModule {}
