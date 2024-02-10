import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  //A collection of context identifiers representing separate DI sub-trees per tenant
  private readonly tenants = new Map<string, ContextId>();

  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver {
    //tenantid could be associated with JWT payload
    //or you could have a proxy in front of our API that would attach the corresponding
    //x-tenant-id header
    //internal - between private services running in internal cluster
    //we could manually attach header to every request when calling another service
    const tenantId = request.headers['x-tenant-id'] as string;
    if (!tenantId) {
      //or log error depending on what we want to accomplish
      return () => contextId;
    }
    let tenantSubTreeId: ContextId;
    if (this.tenants.has(tenantId)) {
      tenantSubTreeId = this.tenants.get(tenantId);
    } else {
      //Construct a new context id
      tenantSubTreeId = ContextIdFactory.create();
      this.tenants.set(tenantId, tenantSubTreeId);

      setTimeout(() => this.tenants.delete(tenantId), 3000);
    }

    return {
      payload: { tenantId },
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId,
    };
  }
}
