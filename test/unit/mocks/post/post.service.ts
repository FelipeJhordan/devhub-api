import { postStub } from '../../stubs/post/post.stub';

export const PostService = {
  createPost: jest.fn().mockResolvedValue(postStub()),
  getUserPosts: jest.fn().mockResolvedValue([postStub()]),
  updatePost: jest.fn().mockResolvedValue(postStub()),
  getPost: jest.fn().mockResolvedValue(postStub()),
  deletePosts: jest.fn().mockResolvedValue(1),
};
