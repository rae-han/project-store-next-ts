import React, { useEffect, useRef, useState } from 'react';
import { MenuListContainer } from './styles';
import MenuItem from './MenuItem';
import Menu from '@/interfaces/menu';

interface Props {
  list: Menu[];
}

const MenuList: React.FC<Props> = ({ list }) => {
  const scrollArea = useRef<HTMLElement>(null);
  // useEffect(() => {
  //   let observer: IntersectionObserver;
  //   if (scrollArea.current) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.25,
  //     });
  //     setObserver(observer);
  //
  //     observer.observe(scrollArea.current);
  //   }
  //
  //   return () => observer && observer.disconnect();
  // }, [list]);

  return (
    <MenuListContainer>
      <div className="menu-list-wrap">
        <main className="menu-list" ref={scrollArea}>
          {list.map((menu) => (
            <MenuItem menu={menu} key={menu.menu_id} />
          ))}
        </main>
      </div>
    </MenuListContainer>
  );
};

export default MenuList;
