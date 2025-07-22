import { NewPayment } from 'components/contents/newPayment';
import { cookies } from 'next/headers';
import { createTypedServerClient } from 'src/utils/supabase/typed-client';
import type { Item } from 'src/types/database';

// TODO: imp loading animation here
export default async function NewPaymentPage() {
  const cookieStore = await cookies();
  const supabase = createTypedServerClient(cookieStore);

  // Fetch data from items table with full typing
  const { data, error } = await supabase.from('Items').select('*');

  if (error) {
    console.error('Supabase error:', error);
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Error loading data</h2>
        <p>Unable to load items data. Please try again later.</p>
      </div>
    );
  }

  // data is now fully typed as Item[]
  return (
    <NewPayment items={data || []} />
  );
};
