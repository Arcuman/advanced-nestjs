import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule implements OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationBootstrap() {
    //returns unique instance of the provider
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId({ hellow: 'world' }, contextId);
    const tagsServices = await Promise.all([
      this.moduleRef.resolve(TagsService, contextId),
      this.moduleRef.resolve(TagsService, contextId),
    ]);
    console.log(tagsServices[0] === tagsServices[1]);
  }
}
