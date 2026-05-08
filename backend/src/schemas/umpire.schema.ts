import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UmpireDocument = Umpire & Document;

@Schema({ timestamps: true })
export class Umpire {
  @Prop({ required: true })
  name: string;
}

export const UmpireSchema = SchemaFactory.createForClass(Umpire);
