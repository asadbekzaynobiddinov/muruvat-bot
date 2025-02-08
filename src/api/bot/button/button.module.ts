import { Module } from '@nestjs/common';
import { ButtonsService } from './button.service';

@Module({
  exports: [ButtonsService],
  providers: [ButtonsService],
})
export class ButtonModule {}
