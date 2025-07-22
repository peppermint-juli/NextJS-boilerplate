'use client';

import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button, FormControl, TextField } from '@mui/material';
import type { Item } from '../../src/types/database';
import { createTypedClient } from 'src/utils/supabase/typed-client';


export type TabOption = {
  name: string
  value: string
}

const Styled = styled.div`
  margin-top: 2rem;

  .form {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    margin-right: 2rem;
  }
  
`;

type Props = {
  items: Item[]
}

export const NewPayment: FC<Props> = ({ items }) => {
  const supabase = createTypedClient();

  const [carNum, setCarNum] = useState<number>();
  // Dynamic state for item counts using item IDs as keys
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  // Get count for a specific item
  const getItemCount = (itemId: string): number => {
    return itemCounts[itemId] || 0;
  };

  // Calculate totals with type safety
  const calculateTotal = (): number => {
    let total = 0;
    for (const item of items) {
      const count = getItemCount(item.id.toString());
      total += item.price * count;
    }
    return total;
  };

  // Type-safe form submission handler
  const handleSubmit = async () => {
    if (!carNum) {
      alert('Please enter a car number');
      return;
    }

    // Create payment data with dynamic item counts
    const paymentData = {
      car_number: carNum,
      date: new Date().toISOString().split('T')[0], // Today's date
      cash: true, // You might want to add UI for this
      credit: false, // You might want to add UI for this
      // Add item counts dynamically
      ...Object.fromEntries(
        items.map(item => [
          item.name.toLowerCase().replace(/\s+/g, '_'), // Convert name to snake_case for DB field
          getItemCount(item.id.toString())
        ])
      )
    };

    console.log('Payment data:', paymentData);
    const { data, error } = await supabase
      .from('Payments') // Use the correct table for payments
      .insert([paymentData])
      .select();

    if (data) {
      alert('Payment submitted successfully!');
    }
    if (error) {
      console.error('Error submitting payment:', error);
      alert('Failed to submit payment. Please try again.');
      return;
    }

    // Here you would typically call a server action or API
  };

  return (
    <Styled>
      <div className="form">
        <FormControl fullWidth>
          <h5>Car Number</h5>
          <TextField
            id="car-number"
            label="Car Number"
            variant="outlined"
            type="number"
            value={carNum || ''}
            onChange={(e) => setCarNum(Number(e.target.value))}
            required
          />
        </FormControl>

        {items.map((item) => {
          const count = getItemCount(item.id.toString());
          const subtotal = item.price * count;

          return (
            <FormControl key={item.id} fullWidth>
              <h5>
                {item.name}
                {` - $${item.price.toFixed(2)} each`}
              </h5>
              <TextField
                id={`item-${item.id}`}
                label={`${item.name} Count`}
                variant="outlined"
                type="number"
                value={count}
                onChange={(e) => {
                  const newCount = Number(e.target.value);
                  setItemCounts(prev => ({
                    ...prev,
                    [item.id.toString()]: newCount
                  }));
                }}
                inputProps={{ min: 0 }}
              />
              {count > 0 && (
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
              )}
            </FormControl>
          );
        })}

        <div style={{ margin: '1rem 0' }}>
          <h4>Total: ${calculateTotal().toFixed(2)}</h4>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!carNum || calculateTotal() === 0}
        >
          Submit Payment
        </Button>
      </div>
    </Styled>
  );
};