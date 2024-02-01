import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  grantTo() {
    console.log('some text from lazy-loaded RewardsService');
  }
}
