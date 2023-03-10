import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import styled from '@emotion/styled';
// import styles from './index.module.scss';
import { CarouselContainer } from './style';
import { addDragEvent } from '@utils/dragEvent';

interface Data {
  ad_img: string;
}

interface Props {
  data: Data[];
}

const WiperCarousel: React.FC<Props> = ({ data }) => {
  const slides = [...data, ...data, ...data];
  const [currentIndex, setCurrentIndex] = useState(data.length);
  const [transX, setTransX] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [animate, setAnimate] = useState(true);
  const viewer: React.RefObject<HTMLDivElement> = useRef(null);
  const time = useRef(4_000);

  const sliderStyles = useMemo(
    () => ({
      transform: `translateX(calc(${-currentIndex * 100}% + ${transX}px))`,
      transition: `transform ease-in-out ${animate ? 250 : 0}ms 0s`,
    }),
    [currentIndex, transX, animate],
  );

  // # 인덱스를 바꿔주는 함수
  // const changeCurrentIndex = useCallback(
  //   (func) => {
  //     setCurrentIndex((prev) => {
  //       return func(prev);
  //     });
  //   },
  //   [setCurrentIndex, currentIndex, animate],
  // );
  const changeCurrentIndex = (func: (index: number) => number) => {
    setCurrentIndex((prev) => {
      return func(prev);
    });
  };

  // # 드래그 했을때 인덱스를 바꿔주는 함수를 호출해주는 함수
  const onSlider = useCallback(
    (deltaX: number) => {
      if (viewer.current) {
        const viewerWidth = viewer.current.clientWidth;
        const moveWidth = viewerWidth / 4;

        if (deltaX < -moveWidth) {
          changeCurrentIndex((prev: number) => prev + 1);
        } else if (deltaX > moveWidth) {
          changeCurrentIndex((prev: number) => prev - 1);
        }
        setTransX(0);
      }
    },
    [viewer],
  );

  // # 자동으로 인덱스를 바꿔주는 함수를 호출해주는 함수
  const startInterval = useCallback(() => {
    const id = setInterval(() => {
      setAnimate(true);
      changeCurrentIndex((prev: number) => prev + 1);
    }, time.current);

    setIntervalId(id);

    return id;
  }, [slides, currentIndex, time]);

  const endInterval = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  const onTransitionEnd = useCallback(() => {
    setAnimate(false);

    if (currentIndex >= data.length * 2) {
      setCurrentIndex(data.length);
    } else if (currentIndex <= data.length - 1) {
      setCurrentIndex(data.length * 2 - 1);
    }
  }, [data, currentIndex, setCurrentIndex, setAnimate]);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = startInterval();

    return () => clearInterval(id);
  }, []);

  // useEffect(() => {
  //   console.log(currentIndex);
  // }, [currentIndex])

  return (
    <CarouselContainer>
      <div
        className="slider"
        style={{
          transform: `translateX(calc(${-currentIndex * 100}% + ${transX}px))`,
          transition: `transform ease-in-out ${animate ? time.current / 4 : 0}ms 0s`,
        }}
        ref={viewer}
        {...addDragEvent({
          onDragStart: () => {
            endInterval();
          },
          onDrag: (deltaX) => {
            setTransX(deltaX);
          },
          onDragEnd: (deltaX) => {
            setAnimate(true);
            onSlider(deltaX);
            startInterval();
          },
        })}
        onTransitionEnd={onTransitionEnd}
      >
        {slides.map((item, index) => (
          <div className="item" key={index}>
            <div className="item-wrap">
              <img
                className="image"
                src={item.ad_img}
                alt="carousel image"
                draggable={false}
                style={{
                  transform: `translateX(calc(${(currentIndex - index) * 100}% - ${transX}px))`,
                  transition: `transform ease-in-out ${animate ? time.current / 4 : 0}ms 0s`,
                }}
              />
              <div className="text">
                <h1 className="header">{index}</h1>
                <span className="p">index</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CarouselContainer>
  );
};

export default WiperCarousel;
