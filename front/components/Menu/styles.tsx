import styled from '@emotion/styled';

export const MenuListContainer = styled.div`
  display: flex;
  justify-content: center;

  .menu-list-wrap {
    flex: 1 1 0;
    max-width: var(--max-width);

    .menu-list {
      display: flex;
      flex-wrap: wrap;
      padding: 7px;
    }
  }
`;

export const MenuItemContainer = styled.div`
  display: flex;
  flex-basis: 50%;
  padding: 3px;

  .menu-item-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--c-white);

    .menu-image-wrap {
      min-width: 100%;
      max-width: 100%;
      padding: 24px 20px 15px;

      .menu-image {
        aspect-ratio: 1/1;
        width: 100%;
        object-fit: cover;
      }
    }

    .menu-box {
      padding: 16px 20px;
      border-top: 1px solid var(--c-f7f7f7);

      .menu-title {
        font-size: 13px;
        font-weight: bold;
        color: var(--c-666);
        line-height: 1.85;
      }

      .menu-price {
        display: flex;
        align-items: center;
        margin-top: 2px;

        .origin-price {
          margin-right: 8px;
          font-size: 12px;
          font-weight: bold;
          color: var(--c-b3b3b3);
          line-height: 1.5;
          text-decoration: line-through;
        }

        .end-price {
          font-size: 15px;
          font-weight: bolder;
          color: var(--c-424242);
          line-height: 1.73;
        }
      }
    }
  }
`;
