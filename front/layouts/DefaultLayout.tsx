import React from 'react';
import styled from '@emotion/styled';
import Header from '@components/Commons/Header';
import Footer from '@components/Commons/Footer';

const DefaultLayoutContainer = styled.div`
  -webkit-overflow-scrolling: touch; /* 끝에서 바운스 되도록*/
  scroll-snap-type: y mandatory;
`;

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
      <Footer></Footer>
    </>
  );
};

export default DefaultLayout;
