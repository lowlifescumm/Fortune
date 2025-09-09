import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Order Canceled',
};

export default function CancelPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
      <h1 className="text-4xl font-bold">Order Canceled</h1>
      <p className="mt-4 text-lg text-gray-400">
        Your order has been canceled. You have not been charged.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-block rounded-md bg-accent px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
