import React from 'react';
import './style.css';
import VirtualList from './VirtualList';

const items = new Array(100000)
  .fill(null)
  .map((_, index) => `item_${index + 1}`);

const renderItem = ({ item, index }) => (
  <div
    style={{
      background: index % 2 === 0 ? 'lightblue' : 'lightgreen',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onClick={() => console.log(item)}
  >
    {item}
  </div>
);

export default function App() {
  return (
    <div>
      <h1>Virtual List for {items.length} items</h1>

      <VirtualList
        items={items}
        renderItem={renderItem}
        height={250}
        rowSize={50}
      />
    </div>
  );
}
