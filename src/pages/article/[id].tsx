import { createSSGHelpers } from '@trpc/react/ssg';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { appRouter } from '../../server/routers/_app';
import { trpc } from '../../utils/trpc';
import superjson from 'superjson';

export default function ArticleViewPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { data, isLoading } = trpc.useQuery(['feeds.byId', { id: props.id }]);

  return (
    <>
      <h1>{data?.title}</h1>
      <em>Created {data?.createdAt.toLocaleDateString()}</em>
      {data?.content && (
        <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
      )}
    </>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>,
) {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.fetchQuery('feeds.byId', {
    id,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}
