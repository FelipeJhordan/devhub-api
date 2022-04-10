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
    jest.clearAllMocks();
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

  describe('getUserPosts', () => {
    it('should be able to list all posts from certain user', async () => {
      const posts = [
        {
          id: 1,
          content: 'First post from user 1',
          created_at: new Date(),
          user_id: 1,
        },
      ];

      prisma.post.findMany = jest.fn().mockReturnValue(posts);

      const result = await service.getUserPosts({ user_id: 1 });

      expect(result).toEqual(posts);
    });
  });

  describe('updatePost', () => {
    it('should be able to update a post', async () => {
      const post = {
        id: 1,
        content: 'updated post',
        created_at: new Date(),
        user_id: 1,
      };

      prisma.post.update = jest.fn().mockReturnValue(post);

      const result = await service.updatePost({ post_id: 1, updated_content: 'updated post' });

      expect(result).toEqual(post);
    });
  });

  describe('getPost', () => {
    it('should be able to fetch a single post', async () => {
      const post = {
        id: 1,
        content: 'First post from user 1',
        created_at: new Date(),
        user_id: 1,
      };

      prisma.post.findUnique = jest.fn().mockReturnValue(post);

      const result = await service.getPost({ post_id: 1 });

      expect(result).toEqual(post);
    });
  });

  describe('deletePosts', () => {
    it('should be able to delete a single or multiple posts', async () => {
      const posts_id = [1, 2, 3];

      prisma.post.deleteMany = jest.fn().mockReturnValue(3);

      const result = await service.deletePosts({ posts_id });

      expect(result).toEqual(posts_id.length);
    });
  });
});
