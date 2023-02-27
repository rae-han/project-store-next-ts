import React from 'react';
import { NextPage } from 'next';
import { SideMenuContainer, SideMenuBackground, SideMenuWindow } from '@components/Commons/SideMenu/style';

interface SideMenuProps {
  show: boolean;
  onToggle: (value: boolean) => void;
}

const SideMenu: NextPage<SideMenuProps> = ({ show, onToggle }) => {
  return (
    <SideMenuContainer show={show}>
      <div className="background-dim"></div>
      <div className="window">asdf</div>
    </SideMenuContainer>
  );
};

export default SideMenu;
