import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';
import { Court, CourtSchema } from '../schemas/court.schema';
import { TournamentMatch, TournamentMatchSchema } from '../schemas/tournament-match.schema';
import { Umpire, UmpireSchema } from '../schemas/umpire.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Court.name, schema: CourtSchema },
      { name: TournamentMatch.name, schema: TournamentMatchSchema },
      { name: Umpire.name, schema: UmpireSchema },
    ]),
  ],
  controllers: [CourtController],
  providers: [CourtService]
})
export class CourtModule {}
