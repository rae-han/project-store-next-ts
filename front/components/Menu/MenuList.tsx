import React from 'react';
import { MenuListContainer } from './styles';
import MenuItem from './MenuItem';
import Menu from '@/interfaces/menu';

interface Props {
  list: Menu[];
}

const MenuList: React.FC<Props> = ({ list }) => {
  return (
    <MenuListContainer>
      <div className="menu-list-wrap">
        {list.map((menu) => (
          <MenuItem menu={menu} key={menu.menu_id} />
        ))}
      </div>
    </MenuListContainer>
  );
};

export default MenuList;
