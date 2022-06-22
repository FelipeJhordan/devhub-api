import { AppService } from '@/application/services/app.service';
import { envs } from '@/infra/env';
import { FilesToBodyInterceptor, FileToBodyInterceptor } from '@/infra/rest/file.interceptor';
import { AppController } from '@/presentation/controllers/app.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { CommentModule } from './comment.module';
import { EmailModule } from './email.module';
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
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, FilesToBodyInterceptor, FileToBodyInterceptor],
})
export class AppModule {}
