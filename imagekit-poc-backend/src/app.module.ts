import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagekitModule } from './imagekit.module';
import { ImageController } from './image.controller';

@Module({
  imports: [ImagekitModule],
  controllers: [ImageController],
  providers: [AppService],
})
export class AppModule {}
