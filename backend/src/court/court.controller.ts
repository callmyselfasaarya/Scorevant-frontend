import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CourtService } from './court.service';

@Controller('courts')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  @Post()
  createCourt(@Body() data: { name: string }) {
    return this.courtService.createCourt(data.name);
  }

  @Get()
  getCourts() {
    return this.courtService.getCourts();
  }

  @Get('queue')
  getQueuedMatches() {
    return this.courtService.getQueuedMatches();
  }

  @Put(':id/assign')
  assignMatchToCourt(@Param('id') courtId: string, @Body() data: { matchId: string }) {
    return this.courtService.assignMatchToCourt(data.matchId, courtId);
  }

  @Put(':id/free')
  freeCourt(@Param('id') courtId: string) {
    return this.courtService.freeCourt(courtId);
  }
}
