import { Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class User {
  username: string;
  password: string;
}

export const ProductSchema = SchemaFactory.createForClass(User);
