import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';
import getBaseUrl from 'get-base-url';
// @ts-ignore
import ogs from 'open-graph-scraper';
import { getAllItemsInFeed } from '../utils/getAllItemsInFeed';

export const sourceRouter = createRouter()
  .mutation('add', {
    input: z.object({
      feedUrl: z.string().min(10),
    }),
    async resolve({ input: { feedUrl } }) {
      const base = `https://${getBaseUrl(feedUrl)}`;
      const { result } = await ogs({ url: base });
      const metaToSave = {
        title: result?.ogTitle,
        description: result.ogDescription,
        url: base,
        image: result.ogImage?.url || result.twitterImage?.url,
        favicon: result.favicon.startsWith('http')
          ? result.favicon
          : base + result.favicon,
        feedUrl,
      };

      const { id } = await prisma.source.create({
        data: metaToSave,
      });

      const feeds = await getAllItemsInFeed({ url: feedUrl, sourceId: id });

      await prisma.feed.createMany({
        data: feeds,
        skipDuplicates: true,
      });

      return { id };
    },
  })
  .query('all', {
    async resolve() {
      const all = await prisma.source.findMany();

      return all;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.source.delete({ where: { id } });
      await prisma.feed.deleteMany({
        where: { OR: [{ sourceId: id }, { sourceId: null }], later: false },
      });
      return {
        id,
      };
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const source = await prisma.source.findUnique({
        where: { id },
      });
      if (!source) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No source with id '${id}'`,
        });
      }
      return source;
    },
  })
  .mutation('update', {
    input: z.object({
      title: z.string(),
      feedUrl: z.string(),
      url: z.string(),
      description: z.string(),
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id, ...rest } = input;
      await prisma.source.update({ where: { id }, data: rest });
      return {
        id,
      };
    },
  });
