import React from 'react';
import { CategoryListContainer, CategoryListWrap } from './styles';
import CategoryItem from '@components/Category/CategoryItem';

interface Props {
  list: {
    category_id: string;
    category_name: string;
  }[];
}

const CategoryList: React.FC<Props> = ({ list }) => {
  return (
    <CategoryListContainer>
      <CategoryListWrap>
        {list.map((item) => (
          <CategoryItem item={item} key={item.category_id} />
        ))}
      </CategoryListWrap>
    </CategoryListContainer>
  );
};

export default CategoryList;
