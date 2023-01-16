import React, { useCallback, useRef, useState } from 'react';
// import Image from 'next/image';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  position: sticky;
  height: 44px;
  background-color: var(--color-white);
`;

function Header() {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const menuBack = useRef();

  const onClickBackground = useCallback((e: any) => {
    if (e.target === menuBack.current) {
      setIsSideMenu(false);
    }
  }, []);

  return <HeaderContainer></HeaderContainer>;
}

export default Header;
