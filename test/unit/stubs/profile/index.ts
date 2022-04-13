import { ProfileDto } from '@/presentation/dtos/profile/Profile.dto';
import { DateStub } from '../shared';

export const profileStub = (): ProfileDto => ({
  name: 'Dragoborn Silva',
  language: ['SQL'],
  birth: DateStub(),
  photo: 'http://amazon.com/photo?me',
});
