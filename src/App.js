import React, { useState } from 'react';
import './style.css';
import VirtualList from './VirtualList';

const newItems = count =>
  new Array(count).fill(null).map((_, index) => `item_${index + 1}`);

const renderItem = ({ item, index }) => (
  <div
    style={{
      background: index % 2 === 0 ? 'lightblue' : '#000',
      color: index % 2 === 0 ? '#000' : '#fff',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }}
    onClick={() => console.log(item)}
  >
    {item}
  </div>
);

const initialCount = 100;

export default function App() {
  const [list, setList] = useState(() => newItems(initialCount));
  const [count, setCount] = useState(() => initialCount);
  const [indexPointed, setIndexPointed] = useState(0);

  return (
    <div>
      <h1>Virtual List for {list.length} items</h1>

      <input
        type="number"
        value={count}
        onChange={e => setCount(e.target.value)}
      />

      <button
        onClick={() => {
          setList(newItems(parseInt(count)));
        }}
      >
        Update items
      </button>

      <button onClick={() => setList(['test', ...list])}>
        change random item
      </button>

      <div>
        change index
        <select
          value={indexPointed}
          onChange={e => setIndexPointed(parseInt(e.target.value))}
        >
          {list.map((item, index) => (
            <option value={index}>{item}</option>
          ))}
        </select>
      </div>

      <VirtualList
        items={list}
        renderItem={renderItem}
        height={500}
        rowSize={50}
        indexPointed={indexPointed}
      />
    </div>
  );
}
