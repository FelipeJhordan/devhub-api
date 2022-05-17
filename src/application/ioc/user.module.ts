import { HashAdapterImp } from '@/infra/hashing/hash.adapter.imp';
import { UserController } from '@/presentation/controllers/user.controller';
import { Module } from '@nestjs/common';
import { HashingAdapter } from '../services/protocols/hashing.adapter';
import { UserService } from '../services/user.service';
import { FileModule } from './file.module';
@Module({
  imports: [FileModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: HashingAdapter,
      useClass: HashAdapterImp,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
