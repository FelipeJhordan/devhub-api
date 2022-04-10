import { PostService } from '@/application/services/post.service';
import { PrismaService } from '@/application/services/prisma.service';
import { PostController } from '@/presentation/controllers/post.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PostService as mockedService } from '../../mocks/post/post.service';
import { postStub } from '../../stubs/post/post.stub';

describe('<PostController>', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockedService,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
    jest.clearAllMocks();
  });

  describe('Create post', () => {
    describe('when createPost is called', () => {
      let post = null;
      beforeEach(async () => {
        post = await controller.createPost({
          content: postStub().content,
          user_id: postStub().user_id,
        });
      });

      test('then it should call postService', () => {
        expect(service.createPost).toBeCalled();
      });

      test('then is should return a new post', () => {
        expect(post).toEqual(postStub());
      });
    });
  });
});
