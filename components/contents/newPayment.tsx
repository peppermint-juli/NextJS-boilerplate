import { FC, useState } from 'react';
import styled from 'styled-components';
import { Button, FormControl, TextField } from '@mui/material';
import { supabase } from 'src/utils/supabase-client';


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

export const NewPayment: FC = async () => {

  const { data: items } = await supabase.from('items').select();

  const [rabiesCount, setRabiesCount] = useState<number>(0);
  const [distemperCount, setDistemperCount] = useState<number>(0);
  const [carNum, setCarNum] = useState<number>();

  return (
    <Styled>
      <div className="form">
        <FormControl fullWidth>
          <h5>Car Number</h5>
          <TextField
            id="car-number"
            label="Car Number"
            variant="outlined"
            value={carNum}
            onChange={(e) => setCarNum(Number(e.target.value))}
          />
        </FormControl>
        <FormControl fullWidth>
          <h5>Rabies {items?.find(item => item.name === 'Rabies')?.price}</h5>
          <TextField
            id="rabies-count"
            label="Rabies"
            variant="outlined"
            value={rabiesCount}
            onChange={(e) => setRabiesCount(Number(e.target.value))}
          />
        </FormControl>
        <FormControl fullWidth>
          <h5>Distemper</h5>
          <TextField
            id="distemper-count"
            label="Distemper"
            variant="outlined"
            value={distemperCount}
            onChange={(e) => setDistemperCount(Number(e.target.value))}
          />
        </FormControl>

        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </Styled>
  );
};