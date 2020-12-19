import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor() {}

  log(): void {
    console.log('log test');
  }
}
