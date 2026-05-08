import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type EntrantDocument = Entrant & Document;

@Schema({ timestamps: true })
export class Entrant {
  @Prop({ required: true })
  name: string;

  @Prop()
  seed?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tournament', required: true })
  tournamentId: string;
}

export const EntrantSchema = SchemaFactory.createForClass(Entrant);
