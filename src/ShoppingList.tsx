import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
}

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');

  const handleAddItem = () => {
    if (!name.trim() || !quantity.trim() || !unit.trim()) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(Number(quantity))) {
      setError('Quantity must be a number.');
      return;
    }

    if (items.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      setError('Item already exists.');
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      name,
      quantity: Number(quantity),
      unit,
      purchased: false,
    };

    setItems([...items, newItem]);
    setName('');
    setQuantity('');
    setUnit('');
    setError('');
  };

  const handleTogglePurchased = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const allPurchased = items.length > 0 && items.every(item => item.purchased);

  return (
    <div className='card'>
        <div className="card-header">
            <h1>Shopping List</h1>
        </div>
      <div className='card-body'>
        <input
          type="text"
          placeholder="Item neve"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mennyiség"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mennyigési egység"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button onClick={handleAddItem} className='btn btn-success'>Add Item</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        <ul>
            {items.map(item => (
            <li key={item.id} style={{ color: item.purchased ? 'gray' : 'black' }}>
                {item.name} - {item.quantity} {item.unit}
                <button onClick={() => handleTogglePurchased(item.id)} className='btn btn-primary'>
                {item.purchased ? 'Unmark' : 'Mark as Purchased'}
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className='btn btn-danger'>Delete</button>
            </li>
            ))}
        </ul>
        {allPurchased && <p>All items have been purchased!</p>}
      </p>
    </div>
  );
};

export default ShoppingList;