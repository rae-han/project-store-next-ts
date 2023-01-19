import React from 'react';
import { MenuItemContainer } from './styles';
import Menu from '@/interfaces/menu';

interface Props {
  menu: Menu;
}

const MenuItem: React.FC<Props> = ({ menu }) => {
  return (
    <MenuItemContainer>
      <div>123</div>
    </MenuItemContainer>
  );
};

export default MenuItem;
