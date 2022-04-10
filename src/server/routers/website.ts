import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';
import getBaseUrl from 'get-base-url';
// @ts-ignore
import ogs from 'open-graph-scraper';
import { getAllItemsInFeed } from '../utils/getAllItemsInFeed';

export const websiteRouter = createRouter()
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

      const { id } = await prisma.website.create({
        data: metaToSave,
      });

      const feeds = await getAllItemsInFeed({ url: feedUrl, websiteId: id });

      await prisma.feed.createMany({
        data: feeds,
        skipDuplicates: true,
      });

      return { feed: feeds, meta: metaToSave };
    },
  })
  .query('all', {
    async resolve() {
      const all = await prisma.website.findMany();

      return all;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.website.delete({ where: { id } });
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
      const website = await prisma.website.findUnique({
        where: { id },
      });
      if (!website) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No website with id '${id}'`,
        });
      }
      return website;
    },
  });
