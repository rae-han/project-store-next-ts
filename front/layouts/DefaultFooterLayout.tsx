import React from 'react';
import styled from '@emotion/styled';
import Header from '@components/Commons/Header';
import Footer from '@components/Commons/Footer';

const FooterLayoutWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <FooterLayoutWrap>
        <div>{children}</div>
        <Footer></Footer>
      </FooterLayoutWrap>
    </>
  );
};

export default DefaultLayout;
