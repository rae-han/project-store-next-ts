import React from 'react';
import { NextPage } from 'next';

interface Props {
  index: number;
}

const Lazy: NextPage<Props> = ({ index }) => {
  return (
    <>
      <div>{index}</div>
    </>
  );
};

export default Lazy;
