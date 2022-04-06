import { ProfileDto } from '@/presentation/dtos/profile/profile.dto';
import { mockDate } from '../shared';

export const mockProfile = (): ProfileDto => ({
  name: 'Felpeira',
  language: ['SQL'],
  birth: mockDate(),
});
