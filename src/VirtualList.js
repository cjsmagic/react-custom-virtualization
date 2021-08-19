import Proptypes from 'proptypes';
import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';

const proptypes = {
  items: Proptypes.array.required,
  renderItem: Proptypes.func.required,
  height: Proptypes.number.required,
  rowSize: Proptypes.number.required
};

function VirtualList({ items, renderItem, height, rowSize }) {
  const ref = useRef();

  const [state, setState] = useState({
    currentIndex: 0,
    scrollTop: 0
  });
  const { currentIndex, scrollTop } = state;

  const rows = useMemo(() => {
    return new Array(Math.ceil(height / rowSize)).fill(null).map((_, index) => {
      // this should give us item based on array index and currentIndex
      const item = items[index + currentIndex];
      return (
        <div
          key={index}
          className="virtual-list__item"
          style={{
            height: `${rowSize}px`,
            top: `${scrollTop + index * rowSize}px`
          }}
        >
          {renderItem({ item, index: index + currentIndex })}
        </div>
      );
    });
  }, [height, rowSize, items, scrollTop, currentIndex]);

  useLayoutEffect(() => {
    let oldIndex = 0;

    const scrollEventHandler = e => {
      /* 
      a single scroll should cross 50px to make on scroll unit of 1,
      when scrollTop = 50, and rowSize = 50, 50/50 should equal to 1, this will tell us the current index, also we got to avoid calculating for same index due to extra events fired
      */
      const _currentIndex = Math.ceil(e.target.scrollTop / rowSize);
      if (oldIndex === _currentIndex) {
        return;
      }
      oldIndex = _currentIndex;

      setState(prev => ({
        ...prev,
        currentIndex: _currentIndex,
        scrollTop: e.target.scrollTop
      }));
    };

    if (ref.current) {
      ref.current.style.height = `${height}px`;
      ref.current.querySelector(
        '.virtual-list__scroll'
      ).style.minHeight = `${rowSize * items.length - rowSize}px`;
      ref.current.addEventListener('scroll', scrollEventHandler);
    }

    return () => {
      ref.current.removeEventListener('scroll', scrollEventHandler);
    };
  }, [ref.current, setState]);

  return (
    <div className="virtual-list" ref={ref}>
      <div className="virtual-list__scroll">{rows}</div>
    </div>
  );
}

VirtualList.proptypes = proptypes;

export default VirtualList;
