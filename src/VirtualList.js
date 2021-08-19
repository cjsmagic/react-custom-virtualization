import Proptypes from 'proptypes';
import React, { useRef, useLayoutEffect, useState } from 'react';

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

  const itemsInWindow = height / rowSize;

  const data = useRef({
    oldScrollTop: 0
  });

  useLayoutEffect(() => {
    if ((ref.current, data.current)) {
      ref.current.addEventListener('scroll', e => {
        if (data.current.oldScrollTop === e.target.scrollTop) {
          return;
        }
        console.log('scroll event added');
        data.current.oldScrollTop = e.target.scrollTop;

        setState(prev => ({
          ...prev,
          currentIndex: Math.ceil(e.target.scrollTop / rowSize),
          scrollTop: e.target.scrollTop
        }));
      });
    }
  }, [ref.current, setState]);

  return (
    <div className="virtual-list" style={{ height: `${height}px` }} ref={ref}>
      <div
        className="virtual-list__scroll"
        style={{ minHeight: `${rowSize * items.length}px` }}
      >
        {items
          .slice(currentIndex, currentIndex + itemsInWindow)
          .map((item, index) => (
            <div
              key={index}
              className="virtual-list__item"
              style={{
                height: `${rowSize}px`,
                top: `${scrollTop + index * rowSize}px`
              }}
            >
              {renderItem(item)}
            </div>
          ))}
      </div>
    </div>
  );
}

VirtualList.proptypes = proptypes;

export default VirtualList;
