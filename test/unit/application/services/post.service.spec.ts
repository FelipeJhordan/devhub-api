import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '@/application/services/post.service';
import { PrismaService } from '@/application/services/prisma.service';

describe('<PostService>', () => {
  let service: PostService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createPost', () => {
    it('should be able to create a new post', async () => {
      const post = {
        id: 1,
        content: 'Create post unit test',
        created_at: new Date(),
        user_id: 1,
      };

      prisma.post.create = jest.fn().mockReturnValue(post);

      const result = await service.createPost({
        content: 'Create post unit test',
        created_at: new Date().toISOString(),
        user_id: 1,
      });

      expect(result).toEqual(post);
    });
  });
});
