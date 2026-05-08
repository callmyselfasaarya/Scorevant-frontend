import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RefereeProfileDocument = RefereeProfile & Document;

@Schema({ timestamps: true })
export class RefereeProfile {
  @Prop({ required: true, unique: true })
  userId: string; // Supabase Auth User ID

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false, default: 0 })
  totalMatchesOfficiated: number;
}

export const RefereeProfileSchema = SchemaFactory.createForClass(RefereeProfile);
