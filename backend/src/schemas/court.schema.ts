import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CourtDocument = Court & Document;

@Schema({ timestamps: true })
export class Court {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['Idle', 'In Use'], default: 'Idle' })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TournamentMatch', default: null })
  currentMatchId?: string;
}

export const CourtSchema = SchemaFactory.createForClass(Court);
