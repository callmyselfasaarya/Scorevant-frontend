import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TournamentDocument = Tournament & Document;

@Schema({ timestamps: true })
export class Tournament {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  sportType: string;

  @Prop({ required: true, default: 3 })
  maxSets: number;

  @Prop({ required: true, default: 'Upcoming' }) // Upcoming, In Progress, Completed
  status: string;

  @Prop({ required: false })
  userId?: string; // Optional for backward compatibility, but holds the Supabase Auth user ID
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
