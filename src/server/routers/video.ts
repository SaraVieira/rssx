import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';
import axios from 'axios';

export const videoRouter = createRouter()
  .mutation('add', {
    input: z.object({
      url: z.string(),
    }),
    async resolve({ input: { url } }) {
      const { data } = await axios(
        `https://www.youtube.com/oembed?url=${url}&format=json`,
      );

      const { id } = await prisma.video.create({
        data: {
          ...data,
          url: url,
        },
      });

      return { id };
    },
  })
  .query('all', {
    async resolve() {
      const all = await prisma.video.findMany();

      return all;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.video.delete({ where: { id } });

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
      const video = await prisma.video.findUnique({
        where: { id },
      });
      if (!video) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No video with id '${id}'`,
        });
      }
      return video;
    },
  })
  .mutation('toggleSeen', {
    input: z.object({ seen: z.boolean(), id: z.string() }),
    async resolve({ input }) {
      const { seen, id } = input;

      await prisma.video.update({
        where: { id },
        data: {
          seen,
        },
      });
    },
  });
