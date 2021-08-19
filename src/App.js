import React from 'react';
import './style.css';
import VirtualList from './VirtualList';

const items = new Array(100).fill(null).map((_, index) => `item_${index + 1}`);

const renderItem = item => <div>{item}</div>;

export default function App() {
  return (
    <div>
      <h1>Virtual List</h1>

      <VirtualList
        items={items}
        renderItem={renderItem}
        height={250}
        rowSize={50}
      />
    </div>
  );
}
