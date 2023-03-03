import React, { Suspense, useEffect, useState } from 'react';
const Lazy = React.lazy(() => import('@pages/test/lazy'));

const init = () => {
  return Array.from({ length: 200_000 }).map((_, index) => ({
    index,
    value: `this is ${index}`,
  }));
};

const SuspensePage = () => {
  // const [sampleData, setSampleData] = useState(() => init());
  // const [newData, setNewData] = useState([]);
  //
  // useEffect(() => {
  //   sampleData.reduce((acc, cur, idx) => {
  //     const index = acc[Math.floor(idx / 1_000)];
  //     if (index) {
  //       acc[index] = [...acc[index], cur];
  //     }
  //   }, []);
  // }, [sampleData]);

  return (
    <>
      <h1>Suspense and Lazy</h1>
      {/*<Suspense fallback={<div>loading</div>}>*/}
      {/*  {sampleData.map((data) => (*/}
      {/*    <Lazy index={data.index} key={data.index} />*/}
      {/*  ))}*/}
      {/*</Suspense>*/}
    </>
  );
};

export default SuspensePage;
