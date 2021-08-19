import React from 'react';
import './style.css';
import VirtualList from './VirtualList';

const items = new Array(100).fill(null).map((_, index) => `item_${index + 1}`);

const renderItem = ({ item, index }) => (
  <div
    style={{
      background: index % 2 === 0 ? 'lightblue' : 'lightgreen',
      height: '100px',
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
      <h1>Virtual List</h1>

      <VirtualList
        items={items}
        renderItem={renderItem}
        height={400}
        rowSize={100}
      />
    </div>
  );
}
