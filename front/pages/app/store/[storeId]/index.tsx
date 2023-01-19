import React from 'react';
import { dehydrate, QueryClient, useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import DefaultLayout from '@layouts/DefaultLayout';
import WiperCarousel from '@components/Commons/WiperCarousel';
import { loadStoreAPI, loadSettingsAPI, loadBannersAPI, loadCategoriesAPI } from '@apis/store';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

interface Params extends ParsedUrlQuery {
  storeId: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const { storeId } = router.query as Params;
  const { data: storeInfo, isLoading } = useQuery(['storeInfo', storeId], () => loadStoreAPI(storeId), {
    enabled: !!storeId,
    // staleTime: 5 * 1000,
  });
  const { data: settings } = useQuery(['settings', storeId], () => loadSettingsAPI(storeId), {
    enabled: !!storeId,
    // staleTime: 5 * 1000,
  });
  const { data: banners } = useQuery(['banners', storeId], () => loadBannersAPI(storeId), {
    enabled: !!storeId,
    // staleTime: 5 * 1000,
  });
  const { data: categories } = useQuery(['categories', storeId], () => loadCategoriesAPI(storeId), {
    enabled: !!storeId,
    // staleTime: 5 * 1000,
  });
  // const result = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['storeInfo', storeId],
  //       queryFn: () => loadStoreAPI(storeId),
  //       enabled: !!storeId,
  //     },
  //     {
  //       queryKey: ['settings', storeId],
  //       queryFn: () => loadSettingsAPI(storeId),
  //       enabled: !!storeId,
  //     },
  //   ],
  // });

  return (
    <DefaultLayout>
      {isLoading ? null : <WiperCarousel data={storeInfo.ad_list}></WiperCarousel>}
      <div>category</div>
      <div>menus</div>
      <div style={{ paddingTop: '1200px' }}>menus</div>
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

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['storeInfo', storeId], () => loadStoreAPI(storeId));
  await queryClient.prefetchQuery(['settings', storeId], () => loadSettingsAPI(storeId));
  await queryClient.prefetchQuery(['banners', storeId], () => loadBannersAPI(storeId));
  await queryClient.prefetchQuery(['categories', storeId], () => loadCategoriesAPI(storeId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
