import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { CommentService } from '@/application/services/comment.service';

@ValidatorConstraint({ name: 'CommentExists', async: true })
export class CommentExists implements ValidatorConstraintInterface {
  constructor(private readonly commentService: CommentService) {}

  async validate(id: number, args: ValidationArguments): Promise<boolean> {
    try {
      await this.commentService.getComment({ id });
      return true;
    } catch (err) {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Comment doesn't exist!!";
  }
}
