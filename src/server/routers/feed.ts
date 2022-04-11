import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';
import { getAllItemsInFeed } from '../utils/getAllItemsInFeed';

export const feedRouter = createRouter()
  .query('all', {
    async resolve() {
      const all = await prisma.feed.findMany({
        orderBy: {
          isoDate: 'desc',
        },
        select: {
          Website: true,
          id: true,
          read: true,
          title: true,
          pubDate: true,
          creator: true,
          contentSnippet: true,
        },
      });
      // @ts-ignore
      return all.sort((a) => a.read);
    },
  })
  .query('saved', {
    async resolve() {
      const saved = await prisma.feed.findMany({
        where: {
          later: true,
        },
        orderBy: {
          isoDate: 'desc',
        },
        include: {
          Website: {
            select: {
              title: true,
            },
          },
        },
      });
      return saved;
    },
  })
  .mutation('toggleRead', {
    input: z.object({ read: z.boolean(), id: z.string() }),
    async resolve({ input }) {
      const { read, id } = input;

      await prisma.feed.update({
        where: { id },
        data: {
          read,
        },
      });
    },
  })
  .query('new', {
    async resolve() {
      const websites = await prisma.website.findMany({
        select: {
          id: true,
          feedUrl: true,
        },
      });
      const allFeeds = await Promise.all(
        websites.map(
          async (website) =>
            await getAllItemsInFeed({
              url: website.feedUrl,
              websiteId: website.id,
            }),
        ),
      );
      await prisma.feed.createMany({
        data: allFeeds.flat(),
        skipDuplicates: true,
      });

      return { updated: true };
    },
  })
  .mutation('toggleLater', {
    input: z.object({ later: z.boolean(), id: z.string() }),
    async resolve({ input }) {
      const { later, id } = input;

      await prisma.feed.update({
        where: { id },
        data: {
          later,
        },
      });
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
      const feed = await prisma.feed.findUnique({
        where: { id },
        select: {
          Website: true,
          id: true,
          read: true,
          title: true,
          creator: true,
          content: true,
        },
      });
      if (!feed) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No feed with id '${id}'`,
        });
      }
      return feed;
    },
  });
