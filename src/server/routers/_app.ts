/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../createRouter';
import superjson from 'superjson';
import { sourceRouter } from './source';
import { feedRouter } from './feed';
import { videoRouter } from './video';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('videos.', videoRouter)
  .merge('sources.', sourceRouter)
  .merge('feeds.', feedRouter);
export type AppRouter = typeof appRouter;
