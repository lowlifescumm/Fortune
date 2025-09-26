import { type Metadata } from 'next';
import { OrderForm } from '@/components/OrderForm';

export const metadata: Metadata = {
  title: 'Order Your Reading',
};

export default function OrderPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Your Reading Details</h1>
        <p className="mt-2 text-gray-400">
          Fill out the form below. Your information will be kept confidential.
        </p>
      </div>
      <div className="mt-8">
        <OrderForm />
      </div>
    </div>
  );
}
