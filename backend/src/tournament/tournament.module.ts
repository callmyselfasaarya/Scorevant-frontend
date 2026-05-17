import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { Tournament, TournamentSchema } from '../schemas/tournament.schema';
import { Entrant, EntrantSchema } from '../schemas/entrant.schema';
import {
  TournamentMatch,
  TournamentMatchSchema,
} from '../schemas/tournament-match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema },
      { name: Entrant.name, schema: EntrantSchema },
      { name: TournamentMatch.name, schema: TournamentMatchSchema },
    ]),
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
