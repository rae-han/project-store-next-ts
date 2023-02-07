import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MenuItemContainer } from './styles';
import Menu from '@/interfaces/menu';

interface Props {
  menu: Menu;
}

const MenuItem: React.FC<Props> = ({ menu }) => {
  const [src, setSrc] = useState<string>();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if ('loading' in HTMLImageElement.prototype) {
      setSrc(menu.menu_img);
    } else if ('IntersectionObserver' in window) {
      let observer: IntersectionObserver;

      if (imageRef?.current && !src) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && imageRef.current) {
              // ?? 여기서 왜 imageRef.current를 두번 확인해줘야하지?
              setSrc(menu.menu_img);
              observer.unobserve(imageRef.current);
            }
          },
          {
            threshold: 0.25,
          },
        );

        observer.observe(imageRef.current);

        return () => {
          observer && observer.disconnect();
        };
      }
    }
  }, [imageRef]);

  return (
    <MenuItemContainer>
      <div className="menu-item-wrap">
        <div className="menu-image-wrap">
          <picture>
            {/*<source srcSet={menu.menu_img} media="(min-width: 1024px)" />*/}
            {/*<source srcSet={menu.menu_img} media="(min-width: 768px)" />*/}
            {/*<source srcSet={menu.menu_img} media="(min-width: 360px)" />*/}
            <img
              className="menu-image"
              ref={imageRef}
              src={src}
              data-src={menu.menu_img}
              alt="menu image"
              loading="lazy"
            />
          </picture>
        </div>
        <div className="menu-box">
          <h2 className="menu-title">{menu.menu_name}</h2>
          <p className="menu-price">
            <span className="origin-price">{menu.price + menu.dc_price}원</span>
            <span className="end-price">{menu.price}원</span>
          </p>
        </div>
      </div>
    </MenuItemContainer>
  );
};

export default MenuItem;
