import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '@/application/services/post.service';
import { PrismaService } from '@/application/services/prisma.service';
import { PrismaService as mockedPrisma } from '../../mocks/prisma/prisma.service';
import { postStub } from '../../stubs/post/post.stub';

describe('<PostService>', () => {
  let service: PostService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: mockedPrisma,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should be able to create a new post', async () => {
      prisma.post.create = jest.fn().mockResolvedValue(postStub());

      const result = await service.createPost({
        content: postStub().content,
        user_id: postStub().user_id,
      });

      expect(result).toEqual(postStub());
    });
  });

  describe('getUserPosts', () => {
    it('should be able to list all posts from certain user', async () => {
      prisma.post.findMany = jest.fn().mockResolvedValue([postStub()]);

      const result = await service.getUserPosts({ user_id: postStub().user_id });

      expect(result).toEqual([postStub()]);
    });
  });

  describe('updatePost', () => {
    it('should be able to update a post', async () => {
      prisma.post.update = jest.fn().mockResolvedValue(postStub());

      const result = await service.updatePost({ post_id: postStub().id, updated_content: postStub().content });

      expect(result).toEqual(postStub());
    });
  });

  describe('getPost', () => {
    it('should be able to fetch a single post', async () => {
      prisma.post.findUnique = jest.fn().mockResolvedValue(postStub());

      const result = await service.getPost({ post_id: postStub().id });

      expect(result).toEqual(postStub());
    });
  });

  describe('deletePosts', () => {
    it('should be able to delete a single or multiple posts', async () => {
      prisma.post.deleteMany = jest.fn().mockResolvedValue(1);

      const result = await service.deletePosts({ posts_id: [postStub().id] });

      expect(result).toEqual(1);
    });
  });
});
