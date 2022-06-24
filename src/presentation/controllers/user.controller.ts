import { Body, Controller, Get, Param, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/application/guards/jwt.auth.guard';
import { UserService } from '@/application/services/user.service';
import { FileToBodyInterceptor } from '@/infra/rest/file.interceptor';
import { UserDecorator } from '../decorators/user.decorator';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';
import { UserParamDto } from '../dtos/user/user-param.dto';

@Controller('user')
@ApiTags('User/Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  async updateUser(@UserDecorator() { userId }, @Body() updateUser: UpdateUserDto) {
    return await this.userService.updateUser({
      id: userId,
      formData: updateUser,
    });
  }

  @Get(':id')
  async getUserProfile(@UserDecorator() { userId }, @Param() userParamDto: UserParamDto) {
    return this.userService.getUserProfile(userId, userParamDto.id);
  }
}
