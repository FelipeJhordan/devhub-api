import { Composite } from '../patterns/composite.pattern';
import { middlewares } from './middlewares.array';

export class MiddlewaresComposite extends Composite {
  private middlewares: Composite[] = middlewares;

  public apply(func) {
    for (const middleware of this.middlewares) {
      func(middleware.apply());
    }
  }
}
