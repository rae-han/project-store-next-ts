import styled from '@emotion/styled';

export const SideMenuContainer = styled.div<{ show: boolean }>`
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  z-index: 1;
  position: fixed;
  top: var(--header-height);
  right: 0;
  bottom: 0;
  left: 0;

  .background-dim {
    z-index: 10;
    position: fixed;
    top: var(--header-height);
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.84);
    opacity: ${(props) => (props.show ? '1' : '0')};
    transition: all 0.25s ease-out;
  }

  .window {
    z-index: 100;
    position: fixed;
    top: var(--header-height);
    bottom: 0;
    left: 0;
    width: 270px;
    min-width: 270px;
    border-top: 1px solid var(--c-e1e1e1);
    background-color: var(--c-white);
    //opacity: ${(props) => (props.show ? '1' : '0')};
    transition: all 0.5s ease-out;
    transform: translateX(${(props) => (props.show ? '0' : '-100%')});
  }
`;
