import { UserService } from '@/application/services/user.service';
import { Body, Controller, Param, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.updateUser({
      id,
      formData: updateUser,
      file,
    });
  }
}
