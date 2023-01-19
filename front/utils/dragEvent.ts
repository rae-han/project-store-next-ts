import { MouseEventHandler, TouchEventHandler } from 'react';

const isTouchScreen = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

interface AddDragEventParams {
  onDragStart: () => void;
  onDrag: (x: number) => void;
  onDragEnd: (x: number) => void;
  stopPropagation: boolean;
}
interface AddDragEvent {
  (args: {
    onDragStart: () => void;
    onDrag: (deltaX: number) => void;
    onDragEnd: (deltaX: number) => void;
    stopPropagation?: boolean;
  }):
    | { onTouchStart: TouchEventHandler<Element>; onMouseDown?: undefined }
    | { onMouseDown: MouseEventHandler<Element>; onTouchStart?: undefined };
}
// type AddDragEvent = (args: {
//   onDragStart: () => void;
//   onDrag: (x: number) => void;
//   onDragEnd: (x: number) => void;
//   stopPropagation: boolean;
// }) => TouchEventHandler | MouseEventHandler;

export const addDragEvent: AddDragEvent = ({ onDragStart, onDrag, onDragEnd, stopPropagation = true }) => {
  if (isTouchScreen) {
    const onTouchStart: TouchEventHandler = (touchEvent) => {
      if (stopPropagation) {
        touchEvent.stopPropagation(); // click 이벤트 전파 방지
      }

      onDragStart();

      const touchMoveHandler: TouchEventHandler = (moveEvent) => {
        console.log('moveEvent.cancelable', moveEvent.cancelable);
        if (moveEvent.cancelable) {
          moveEvent.preventDefault(); // 터치 이벤트시 스크롤 작동 안하게.
        }
        const deltaX = moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
        const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;

        console.log('touchmove', deltaX, deltaY);
        onDrag(deltaX);
      };
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });

      const touchEndHandler: TouchEventHandler = (endEvent) => {
        const deltaX = endEvent.changedTouches[0].pageX - touchEvent.changedTouches[0].pageX;
        const deltaY = endEvent.changedTouches[0].pageY - touchEvent.changedTouches[0].pageY;

        onDragEnd(deltaX);
        document.removeEventListener('touchmove', touchMoveHandler);
      };
      document.addEventListener('touchend', touchEndHandler, { once: true });
    };

    return {
      onTouchStart,
    };
  } else {
    const onMouseDown: MouseEventHandler = (downEvent) => {
      console.log('mousedown');
      if (stopPropagation) {
        downEvent.stopPropagation(); // click 이벤트 전파 방지
      }

      onDragStart();

      const mouseMoveHandler: MouseEventHandler = (moveEvent) => {
        const deltaX = moveEvent.pageX - downEvent.pageX;
        const deltaY = moveEvent.pageY - downEvent.pageY;

        console.log('mousemove', deltaX, deltaY);
        onDrag(deltaX);
      };
      document.addEventListener('mousemove', mouseMoveHandler);

      const mouseUpHandler: MouseEventHandler = (upEvent) => {
        const deltaX = upEvent.pageX - downEvent.pageX;
        const deltaY = upEvent.pageY - downEvent.pageY;

        console.log('mouseup', deltaX, deltaY);
        onDragEnd(deltaX);
        document.removeEventListener('mousemove', mouseMoveHandler);
      };
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
    };

    return {
      onMouseDown,
    };
  }
};
