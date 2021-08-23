import Proptypes from 'proptypes';
import React, { useRef, useEffect, useState, useMemo } from 'react';

const defaultProps = {
  indexPointed: 0
};

const proptypes = {
  items: Proptypes.array.required,
  renderItem: Proptypes.func.required,
  height: Proptypes.number.required,
  rowSize: Proptypes.number.required,
  indexPointed: Proptypes.string.required
};

function VirtualList({ items, renderItem, height, rowSize, indexPointed }) {
  const ref = useRef();

  const [state, setState] = useState({
    currentIndex: 0,
    scrollTop: 0
  });

  const { currentIndex, scrollTop } = state;

  const rows = useMemo(() => {
    return new Array(Math.round(height / rowSize))
      .fill(null)
      .map((_, index) => {
        // this should give us item based on array index and currentIndex
        const item = items[index + currentIndex];

        if (!item) {
          return null;
        }

        return (
          <div
            key={index}
            className="virtual-list__item"
            style={{
              height: `${rowSize}px`,
              transform: `translate3d(0,${index * rowSize + scrollTop}px,0)`
            }}
          >
            {renderItem({ item, index: index + currentIndex })}
          </div>
        );
      });
    // .filter(item => item);
  }, [height, rowSize, items, scrollTop, currentIndex]);

  useEffect(() => {
    if (ref.current) {
      // if items length is less than previous chosen index we need to make 0 as  index
      const chosenIndex = indexPointed > items.length ? 0 : indexPointed;
      ref.current.scrollTop = chosenIndex * rowSize;
      setState(prev => ({
        ...prev,
        currentIndex: chosenIndex,
        scrollTop: ref.current.scrollTop
      }));
    }
  }, [items.length, indexPointed]);

  useEffect(() => {
    const scrollEventHandler = e => {
      const id = window.requestAnimationFrame(function() {
        //if diff of scroll and rowsize is greater than scroll value of 10 we can ignore update
        if (Math.ceil(e.target.scrollTop % rowSize) > 10) {
          return;
        }
        setState(() => ({
          currentIndex: Math.floor(e.target.scrollTop / rowSize),
          scrollTop: e.target.scrollTop
        }));
        cancelAnimationFrame(id);
      });
    };

    if (ref.current) {
      ref.current.style.height = `${height}px`;
      ref.current.querySelector(
        '.virtual-list__scroll'
      ).style.minHeight = `${rowSize * items.length}px`;
      ref.current.addEventListener('scroll', scrollEventHandler, {
        passive: true
      });
    }

    return () => {
      console.log('effect destroyed');
      ref.current.removeEventListener('scroll', scrollEventHandler);
    };
  }, [ref.current, setState, items]);

  return (
    <div className="virtual-list" ref={ref}>
      <div className="virtual-list__scroll">{rows}</div>
    </div>
  );
}

VirtualList.defaultProps = defaultProps;
VirtualList.proptypes = proptypes;

export default VirtualList;
