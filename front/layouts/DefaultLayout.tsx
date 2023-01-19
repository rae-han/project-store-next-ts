import React from 'react';
import styled from '@emotion/styled';
import Header from '@components/Commons/Header';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
    </>
  );
};

export default DefaultLayout;
