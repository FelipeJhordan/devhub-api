import { Body, Controller, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { UserService } from '@/application/services/user.service';
import { UserDecorator } from '../decorators/user.decorator';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';
import { FileToBodyInterceptor } from '@/infra/rest/file.interceptor';

@Controller('user')
@ApiTags('User/Profile')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  @UseGuards(JwtAuthGuard)
  async updateUser(@UserDecorator() { userId }, @Body() updateUser: UpdateUserDto) {
    return await this.userService.updateUser({
      id: userId,
      formData: updateUser,
    });
  }
}
