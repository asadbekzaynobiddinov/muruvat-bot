import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotModule } from './bot/bot.module';
import { config } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    BotModule,
  ],
})
export class AppModule {}
