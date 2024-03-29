import type { EventHandler, EventHandlerRequest } from 'h3';
import { usePropelAuth } from '~/server/utils/propelauth';

export const defineProtectedEventHandler = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      event.context.user = await usePropelAuth().validateAuthHeaderAndGetUser(
        event.headers.get('Authorization')
      );

      return handler(event);
    } catch (e) {
      console.error(e);
      return createError({ status: 401, message: 'Unauthorized' });
    }
  });
