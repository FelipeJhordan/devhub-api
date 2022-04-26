import { UserController } from '@/presentation/controllers/user.controller';
import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { FileModule } from './file.module';
@Module({
  imports: [FileModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
