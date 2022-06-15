import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { UserService } from '@/application/services/user.service';
import { Body, Controller, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDecorator } from '../decorators/user.decorator';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';

@Controller('user')
@ApiTags('User/Profile')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @UserDecorator() { userId },
    @Body() updateUser: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.updateUser({
      id: userId,
      formData: updateUser,
      file,
    });
  }
}
