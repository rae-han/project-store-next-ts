import React, { useState } from 'react';
import type { NextPage } from 'next';
import {
  dehydrate,
  QueryClient,
  QueryFunctionContext,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from '@tanstack/react-query';
import DefaultLayout from '@layouts/DefaultLayout';
import WiperCarousel from '@components/Commons/WiperCarousel';
import { loadStoreAPI, loadSettingsAPI, loadBannersAPI, loadCategoriesAPI, loadMenusAPI } from '@apis/store';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import CategoryList from '@components/Category/CategoryList';
import MenuList from '@components/Menu/MenuList';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { increment, decrement } from '@store/counter/counterSlice';
import axios from 'axios';
import DefaultFooterLayout from '@layouts/DefaultFooterLayout';

interface Params extends ParsedUrlQuery {
  storeId: string;
}
interface Category {
  category_id: string;
  category_name: string;
}

const fetcher = async ({ queryKey }: QueryFunctionContext) => {
  console.log('QK', queryKey);
  console.log('QK', queryKey[1]);
  const { data } = await axios.get(`/store/${'2EE81511'}`);
  return data;
};

const Home: NextPage = () => {
  const router = useRouter();
  const { storeId } = router.query as Params;
  const { data: storeInfo, isLoading: isLoadingStore } = useQuery(['storeInfo', storeId], () => loadStoreAPI(storeId), {
    enabled: !!storeId,
  });
  const { data: settings } = useQuery(['settings', storeId], () => loadSettingsAPI(storeId), {
    enabled: !!storeId,
  });
  const { data: banners } = useQuery(['banners', storeId], () => loadBannersAPI(storeId), {
    enabled: !!storeId,
  });
  const { data: categories, isLoading: isLoadingCategory } = useQuery(
    ['categories', storeId],
    () => loadCategoriesAPI(storeId),
    {
      enabled: !!storeId,
    },
  );
  const { data: menus, isLoading: isLoadingMenus } = useQuery(
    ['menus', storeId],
    () => loadMenusAPI({ storeId, categoryId: categories[0]?.category_id }),
    {
      enabled: !!storeId && !!categories[0]?.category_id,
    },
  );

  const { value: count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <DefaultFooterLayout>
      <style global jsx>{`
        body {
          background-color: var(--c-f2f2f2);
        }
      `}</style>
      <div>
        <button onClick={() => dispatch(increment())}>increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>decrement</button>
      </div>
      {isLoadingStore ? null : <WiperCarousel data={storeInfo.ad_list}></WiperCarousel>}
      {isLoadingCategory ? null : <CategoryList list={categories} />}
      {isLoadingMenus ? null : <MenuList list={menus} />}
      {/*<div style={{ paddingTop: '1600px' }}>menus</div>*/}
    </DefaultFooterLayout>
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

  const categories = queryClient.getQueryData(['categories', storeId]) as Category[];
  const categoryId = categories[0]?.category_id;
  await queryClient.prefetchQuery(['menus', storeId], () => loadMenusAPI({ storeId, categoryId }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
