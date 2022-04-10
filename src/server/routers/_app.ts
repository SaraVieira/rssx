/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../createRouter';
import superjson from 'superjson';
import { websiteRouter } from './website';
import { feedRouter } from './feed';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('websites.', websiteRouter)
  .merge('feeds.', feedRouter);
export type AppRouter = typeof appRouter;
