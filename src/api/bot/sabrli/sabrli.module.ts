import { Module } from '@nestjs/common';
import { ActionsModule } from './actions/actions.module';
import { ScenesModule } from './scenes/scenes.module';
import { ActionsService } from '../admin/actions/actions.service';

@Module({
  imports: [ActionsModule, ScenesModule],
  providers: [ActionsService],
})
export class SabrliModule {}
