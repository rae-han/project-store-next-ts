import React, { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { loadStoreAPI } from '@apis/store';
import { useRouter } from 'next/router';
import { StoreInfo } from '@/typings/db';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/logo-elixirpay.svg';

const FooterContainr = styled.footer`
  background-color: red;

  .store-content {
    padding: 20px;
    background-color: #212121;

    .row {
      display: flex;
      justify-content: start;
      font-size: 12px;
      color: var(--c-999);
      line-height: 1.5;

      &:not(:first-of-type) {
        margin-top: 6px;
      }

      .info-title {
        flex-basis: 52px;
        margin-right: 26px;
      }

      .info-content {
      }
    }
  }
  .site-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
    background-color: var(--c-black);

    .privacy-statement {
      font-size: 12px;
      color: var(--c-white);
      line-height: 1.5;
      text-decoration: none;
    }

    .logo {
    }
  }
`;

const Footer = () => {
  const router = useRouter();
  const { storeId } = router.query as { storeId: string };
  const values = useRef([
    { text: '매장명', key: 'store_name' },
    // { text: '주소', key: ['addr1', 'addr2'] },
    { text: '주소', key: 'addr1' },
    { text: '주소', key: 'addr2' },
    { text: '대표자명', key: 'ceo_name' },
    { text: '법인명', key: 'corporation' },
    { text: '전화번호', key: 'phone_no' },
    { text: 'E-mail', key: 'email' },
    { text: '사업자번호', key: 'business_no' },
    { text: '통신판매업 신고번호', key: 'mail_order_sales_registration_number' },
  ]);
  const {
    data: storeInfoData,
    isLoading: isLoadingStore,
    isError: isErrorStoreInfo,
  } = useQuery<StoreInfo>(['storeInfo', storeId], () => loadStoreAPI(storeId), {
    enabled: !!storeId,
  });

  const onClickLogo = useCallback(() => {
    router.push(`https://www.elixirpay.com/`);
  }, []);

  if (isErrorStoreInfo) {
    return <div>error!</div>;
  }

  return (
    <FooterContainr>
      {isLoadingStore ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="store-content">
            {values?.current?.map((value, idx) => (
              <div className="row" key={idx}>
                <span className="info-title">{value.text}</span>
                <span className="info-content">{storeInfoData[value.key]}</span>
              </div>
            ))}
          </div>
          <div className="site-content">
            <Link className="privacy-statement" href={`/app/store/${storeId}`}>
              개인정보 취급방침
            </Link>
            <Image src={logo} alt="logo payment company" onClick={onClickLogo}></Image>
          </div>
        </>
      )}
    </FooterContainr>
  );
};

export default Footer;
