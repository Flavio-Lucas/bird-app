import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsEntity } from 'src/typeorm/entities/comment.entity';
import { CommentsController } from './controllers/comment.controller';
import { CommentsService } from './services/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsEntity,
    ]),
  ],
  exports: [
    CommentsService,
  ],
  providers: [
    CommentsService,
  ],
  controllers: [
    CommentsController,
  ],

})
export class CommentsModule { }
