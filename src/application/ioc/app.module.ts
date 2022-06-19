import { AppService } from '@/application/services/app.service';
import { envs } from '@/infra/env';
import { AppController } from '@/presentation/controllers/app.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { CommentModule } from './comment.module';
import { FileModule } from './file.module';
import { FollowModule } from './follow.module';
import { HealthModule } from './health.module';
import { PostModule } from './post.module';
import { PrismaModule } from './prisma.module';
import { SessionModule } from './session.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    HealthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true, envFilePath: envs }),
    AuthModule,
    PostModule,
    UserModule,
    SessionModule,
    FileModule,
    CommentModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
