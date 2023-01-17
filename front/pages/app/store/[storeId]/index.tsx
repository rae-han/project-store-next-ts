import React from 'react';
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from 'react-query';
import DefaultLayout from '@layouts/DefaultLayout';
// import InfiniteCarousel from '@components/Commons/InfiniteCarousel';
import { loadStoreAPI } from '@apis/store';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Params extends ParsedUrlQuery {
  storeId: string;
}

const Home: React.FC<Params> = ({ storeId }) => {
  console.log(storeId);
  const { data: storeInfo } = useQuery('storeInfo', () => loadStoreAPI(storeId));

  return (
    <DefaultLayout>
      <h1>home123</h1>
      {/*<InfiniteCarousel></InfiniteCarousel>*/}
    </DefaultLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    // fallback: 'blocking', //indicates the type of fallback
    fallback: true, //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { storeId } = params as Params;

  console.log(storeId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('storeInfo', () => loadStoreAPI(storeId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      storeId,
    },
  };
};

export default Home;
