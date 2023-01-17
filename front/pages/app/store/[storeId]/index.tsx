import React from 'react';
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from 'react-query';
import DefaultLayout from '@layouts/DefaultLayout';
// import InfiniteCarousel from '@components/Commons/InfiniteCarousel';
import { loadStoreAPI } from '@apis/store';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

interface Params extends ParsedUrlQuery {
  storeId: string;
}

const Home: React.FC<Params> = () => {
  const router = useRouter();
  const { storeId } = router.query as Params;
  console.log(storeId);
  const { data: storeInfo } = useQuery(['storeInfo', storeId], () => loadStoreAPI(storeId));

  return (
    <DefaultLayout storeInfo={storeInfo}>
      <h1>home123</h1>
      {/*<InfiniteCarousel></InfiniteCarousel>*/}
    </DefaultLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: ['/app/store/[storeId]'],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { storeId } = params as Params;

  if (!storeId) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  console.log(storeId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['storeInfo', storeId], () => loadStoreAPI(storeId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      storeId,
    },
  };
};

export default Home;
