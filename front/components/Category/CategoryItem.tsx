import React from 'react';
import { CategoryItemButton, CategoryListWrap } from './styles';

interface Props {
  item: {
    category_id: string;
    category_name: string;
  };
}

const CategoryItem: React.FC<Props> = ({ item }) => {
  return <CategoryItemButton active={true}>{item.category_name}</CategoryItemButton>;
};

export default CategoryItem;
