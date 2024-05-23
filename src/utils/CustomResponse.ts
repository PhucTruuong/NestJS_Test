// custom-response.ts
import { StandardResponse } from 'nest-standard-response';

export class CustomResponse {
  constructor(public readonly status: number, public readonly data: typeof StandardResponse) {}
}

