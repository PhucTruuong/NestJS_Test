import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AddressMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    next();
  }
}
