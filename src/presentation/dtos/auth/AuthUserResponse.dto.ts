import { ProfileDto } from '../profile/profile.dto';

export class AuthUserResponseDto {
  id: string;
  email: string;
  token: string;
  profile: ProfileDto;
}
