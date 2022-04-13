import { User, Session, Profile, Language } from '@prisma/client';

export type IFindUserWithRelations = User & {
  Session: Session;
  Profile: Profile & {
    language: Language[];
  };
};
