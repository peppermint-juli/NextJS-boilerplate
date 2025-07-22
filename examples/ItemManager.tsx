// Example: Using types in a component that manages Items
'use client';

import { useState, useEffect } from 'react';
import { createTypedClient } from '../src/utils/supabase/typed-client';
import type { Item, ItemInsert, ItemUpdate, Payment } from '../src/types/database';

export function ItemManager() {
  // Typed state variables
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<ItemInsert>({
    name: '',
    price: 0
  });

  const supabase = createTypedClient();

  // Fetch items with full typing
  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Items')
      .select('*');

    if (data) {
      setItems(data); // data is typed as Item[]
    }
    setLoading(false);
  };

  // Create new item with typed insert
  const createItem = async (itemData: ItemInsert) => {
    const { data, error } = await supabase
      .from('Items')
      .insert([itemData])
      .select();

    if (data) {
      setItems(prev => [...prev, ...data]);
    }
    return { data, error };
  };

  // Update item with typed update
  const updateItem = async (id: number, updates: ItemUpdate) => {
    const { data, error } = await supabase
      .from('Items')
      .update(updates)
      .eq('id', id)
      .select();

    if (data) {
      setItems(prev => prev.map(item =>
        item.id === id ? data[0] : item
      ));
    }
    return { data, error };
  };

  // Delete item
  const deleteItem = async (id: number) => {
    const { error } = await supabase
      .from('Items')
      .delete()
      .eq('id', id);

    if (!error) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
    return { error };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createItem(newItem);
    setNewItem({ name: '', price: 0 }); // Reset form
  };

  return (
    <div>
      <h2>Item Manager</h2>

      {/* Create new item form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name || ''}
          onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
        />
        <button type="submit">Create Item</button>
      </form>

      {/* Display items */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item: Item) => (
            <li key={item.id}>
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => setSelectedItem(item)}>
                Edit
              </button>
              <button onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Edit selected item */}
      {selectedItem && (
        <div>
          <h3>Edit Item</h3>
          <input
            type="text"
            value={selectedItem.name}
            onChange={(e) => setSelectedItem(prev =>
              prev ? { ...prev, name: e.target.value } : null
            )}
          />
          <input
            type="number"
            value={selectedItem.price}
            onChange={(e) => setSelectedItem(prev =>
              prev ? { ...prev, price: Number(e.target.value) } : null
            )}
          />
          <button
            onClick={() => {
              if (selectedItem) {
                updateItem(selectedItem.id, {
                  name: selectedItem.name,
                  price: selectedItem.price
                });
                setSelectedItem(null);
              }
            }}
          >
            Save Changes
          </button>
          <button onClick={() => setSelectedItem(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
