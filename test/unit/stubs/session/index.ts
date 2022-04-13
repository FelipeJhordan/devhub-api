import { CreateSessionDto } from '@/presentation/dtos/session/CreateSession.dto';
import { Session } from '@prisma/client';
import { randomIdStub, tokenDummy } from '../shared';

export const createSessionDtoStub = (): CreateSessionDto => ({
  idUser: randomIdStub(),
  token: tokenDummy(),
});

export const sessionEntityStub = (): Session => ({
  id: randomIdStub(),
  user_id: randomIdStub(),
  token: tokenDummy(),
});
