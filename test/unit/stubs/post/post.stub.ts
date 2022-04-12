import { Post } from '@prisma/client';

export const postStub = (): Post => ({
  content: 'Post stub',
  created_at: new Date(2022, 4, 22),
  id: 1,
  user_id: 1,
});
