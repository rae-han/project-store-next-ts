import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import hamburger from '@images/icons/side-menu-hamburger.svg';
import cart from '@images/icons/cart_nor.svg';

const HeaderContainer = styled.header`
  z-index: 100;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: 44px;
  background-color: var(--c-white);

  & > .wrap {
    display: flex;
    justify-content: space-between;
    max-width: var(--max-width);
    height: 100%;
    margin: 0 auto;

    .menu-area {
      display: flex;

      .title {
        height: 44px;

        font-size: 17px;
        font-weight: bold;

        line-height: 44px;

        &.left {
          margin-left: 10px;
        }
        &.center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .cart-wrap {
        position: relative;

        .count {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 3px;
          right: 3px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          font-size: 12px;
          font-weight: bold;
          background-color: var(--c-main);
          color: var(--c-white);
        }
      }
    }
  }
`;

function Header() {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const [isCenterTitle, setIsCenterTitle] = useState(false);
  const menuBack = useRef();

  const onClickBackground = useCallback((e: any) => {
    if (e.target === menuBack.current) {
      setIsSideMenu(false);
    }
  }, []);

  return (
    <HeaderContainer>
      <div className="wrap">
        <div className="menu-area">
          <Image src={hamburger} alt="side menu" width={47} height={44} />
          <h1 className={`title ${isCenterTitle ? 'center' : 'left'}`}>타이틀</h1>
        </div>
        <div className="menu-area">
          <div className="cart-wrap">
            <Image src={cart} alt="cart" width={47} height={44} />
            <span className="count">123</span>
          </div>
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Header;
