import styled from '@emotion/styled';

export const CategoryListContainer = styled.div`
  position: sticky;
  top: 44px;

  height: 48px;

  background-color: var(--c-white);
`;

export const CategoryListWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  max-width: var(--max-width);
  height: 100%;
  margin: 0 auto;
  padding: 0 11px;
  border-top: 1px solid var(--c-e1e1e1);

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  -webkit-overflow-scrolling: touch; /* 끝에서 바운스 되도록*/
  scroll-snap-type: x mandatory;
`;

export const CategoryItemButton = styled.button`
  flex-shrink: 0;
  height: 100%;
  padding: 0 4px;
  font-size: 15px;
  font-weight: bold;
  color: ${({ active }: { active: boolean }) => (active ? 'var(--c-main)' : 'var(--c-666)')};
  line-height: 1.6;

  scroll-snap-align: end;
`;
