import { UpdateUserDto } from '@/presentation/dtos/user/updateUser.dto';

export interface IUpdateUser {
  id: number;
  formData: UpdateUserDto;
  file: Express.Multer.File;
}
