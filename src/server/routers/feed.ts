import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

export const feedRouter = createRouter()
  .query('all', {
    async resolve() {
      const all = await prisma.feed.findMany({
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
        include: {
          Website: true,
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
