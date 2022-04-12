import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';
import { getAllItemsInFeed } from '../utils/getAllItemsInFeed';

const listFetch = {
  Source: true,
  id: true,
  read: true,
  later: true,
  title: true,
  pubDate: true,
  creator: true,
  contentSnippet: true,
};

export const feedRouter = createRouter()
  .query('all', {
    async resolve() {
      const all = await prisma.feed.findMany({
        orderBy: {
          isoDate: 'desc',
        },
        select: listFetch,
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
        select: listFetch,
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
      const sources = await prisma.source.findMany({
        select: {
          id: true,
          feedUrl: true,
        },
      });
      const allFeeds = await Promise.all(
        sources.map(
          async (source) =>
            await getAllItemsInFeed({
              url: source.feedUrl,
              sourceId: source.id,
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
      await prisma.source.delete({ where: { id } });
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
          Source: true,
          id: true,
          read: true,
          title: true,
          creator: true,
          content: true,
          later: true,
          link: true,
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
  })
  .query('search', {
    input: z.object({
      query: z.string(),
      saved: z.boolean(),
    }),
    async resolve({ input: { query, saved } }) {
      const feeds = await prisma.feed.findMany({
        where: {
          OR: [
            {
              content: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              Source: {
                title: { contains: query, mode: 'insensitive' },
                feedUrl: { contains: query, mode: 'insensitive' },
              },
            },
          ],
          AND: {
            later: saved,
          },
        },
        select: listFetch,
      });
      return feeds;
    },
  });
