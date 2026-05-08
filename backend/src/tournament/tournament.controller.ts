import { Controller, Get, Post, Body, Param, Put, UseGuards, Req } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tournaments')
@UseGuards(JwtAuthGuard)
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  createTournament(@Req() req: any, @Body() data: { name: string; sportType: string; maxSets: number; entrants: { name: string; seed?: number }[] }) {
    return this.tournamentService.createTournament(req.user.userId, data);
  }

  @Get()
  getTournaments(@Req() req: any) {
    return this.tournamentService.getTournaments(req.user.userId);
  }

  @Get(':id')
  getTournamentDetails(@Param('id') id: string) {
    return this.tournamentService.getTournamentDetails(id);
  }

  @Post(':id/generate-bracket')
  generateBracket(@Param('id') id: string) {
    return this.tournamentService.generateBracket(id);
  }

  @Put('matches/:matchId')
  updateMatch(@Param('matchId') matchId: string, @Body() data: { score?: any; winnerId?: string; status?: string }) {
    return this.tournamentService.updateMatch(matchId, data);
  }
}