import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost/zigtask',
    ),
    AuthModule,
  ],
})
export class AppModule {}
