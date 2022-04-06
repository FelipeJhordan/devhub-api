import { ProfileDto } from '../profile/profile.dto';

export class RegisterUserResponseDto {
  id: string;
  email: string;
  token: string;
  profile: ProfileDto;
}
