import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'CustomMatchPasswords', async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments): boolean | Promise<boolean> {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Passwords do not match!';
  }
}
