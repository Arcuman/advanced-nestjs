import { Module } from '@nestjs/common';
import { FibonacciController } from './fibonacci.controller';
import { FibonacciWorkerHost } from './fibonacci.host';

@Module({
  controllers: [FibonacciController],
  providers: [FibonacciWorkerHost],
})
export class FibonacciModule {}
