import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold">Terms of Service</h1>
      <div className="prose prose-invert">
        <p>
          This is a placeholder for your terms of service. You should replace this with your own terms.
        </p>
        <p>
          By accessing our website and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">Use of Service</h2>
        <p>
          Our service provides tarot readings for entertainment purposes only. You must be 18 years or older to use this service.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">Payments and Refunds</h2>
        <p>
          All payments are processed securely through Stripe. Due to the nature of the service, all sales are final and no refunds will be issued.
        </p>
      </div>
    </div>
  );
}
