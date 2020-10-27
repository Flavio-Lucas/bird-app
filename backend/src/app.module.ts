import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './modules/categories/category.module';
import { CommentsModule } from './modules/comments/comment.module';
import { TypeOrmService } from './modules/typeorm/type-orm.services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
    CommentsModule,
  ],
})
export class AppModule {}
