import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { PostService } from '@/application/services/post.service';

@ValidatorConstraint({ name: 'PostExists', async: true })
export class PostExists implements ValidatorConstraintInterface {
  constructor(private readonly postService: PostService) {}

  async validate(id: number, args: ValidationArguments): Promise<boolean> {
    try {
      await this.postService.getPost({ post_id: id });
      return true;
    } catch (err) {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Post doesn't exist!!";
  }
}
