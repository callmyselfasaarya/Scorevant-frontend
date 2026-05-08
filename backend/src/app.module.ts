import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TournamentModule } from './tournament/tournament.module';
import { CourtModule } from './court/court.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/scorevant',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TournamentModule,
    CourtModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
