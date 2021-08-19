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

  const data = useRef({
    oldIndex: 0
  });

  const rows = useMemo(() => {
    const itemsInWindow = Math.ceil(height / rowSize);
    return new Array(itemsInWindow).fill(null).map((_, index) => {
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
    const scrollEventHandler = e => {
      const _currentIndex = Math.ceil(e.target.scrollTop / rowSize);
      if (data.current.oldIndex === _currentIndex) {
        return;
      }
      data.current.oldIndex = _currentIndex;

      setState(prev => ({
        ...prev,
        currentIndex: _currentIndex,
        scrollTop: e.target.scrollTop
      }));
    };
    if ((ref.current, data.current)) {
      ref.current.addEventListener('scroll', scrollEventHandler);
    }
    return () => {
      ref.current.removeEventListener('scroll', scrollEventHandler);
    };
  }, [ref.current, setState]);

  return (
    <div className="virtual-list" style={{ height: `${height}px` }} ref={ref}>
      <div
        className="virtual-list__scroll"
        style={{ minHeight: `${rowSize * items.length - rowSize}px` }}
      >
        {rows}
      </div>
    </div>
  );
}

VirtualList.proptypes = proptypes;

export default VirtualList;
