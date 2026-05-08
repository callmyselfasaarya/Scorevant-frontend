import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TournamentMatchDocument = TournamentMatch & Document;

@Schema({ timestamps: true })
export class TournamentMatch {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tournament', required: true })
  tournamentId: string;

  @Prop({ required: true })
  round: number;

  @Prop({ required: true })
  matchNumber: number; // Position in the round

  // Optional because an entrant might not be known yet (e.g. winner of previous match)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Entrant', default: null })
  entrant1Id?: string | null;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Entrant', default: null })
  entrant2Id?: string | null;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Entrant', default: null })
  winnerId?: string | null;

  @Prop({ type: Object, default: {} })
  score: any; // Can be detailed score per set

  @Prop({
    required: true,
    enum: ['Upcoming', 'Queue', 'Live', 'Delayed', 'Completed'],
    default: 'Upcoming',
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Court', default: null })
  courtId?: string | null;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Umpire', default: null })
  umpireId?: string | null;
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TournamentMatch', default: null })
  nextMatchId?: string | null; // ID of the match the winner advances to
}

export const TournamentMatchSchema = SchemaFactory.createForClass(TournamentMatch);