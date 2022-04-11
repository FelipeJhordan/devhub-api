import { ProfileDto } from '@/presentation/dtos/profile/profile.dto';
import { DateStub } from '../shared';

export const profileStub = (): ProfileDto => ({
  name: 'Felpeira',
  language: ['SQL'],
  birth: DateStub(),
});
