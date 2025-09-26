import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
      <div className="prose prose-invert">
        <p>
          This is a placeholder for your privacy policy. You should replace this with your own policy.
        </p>
        <p>
          We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">Information We Collect</h2>
        <p>
          We may collect personal information from you such as your name, email address, and payment information when you place an order.
        </p>
        <h2 className="mt-6 text-2xl font-semibold">How We Use Your Information</h2>
        <p>
          We use the information we collect to process your orders, communicate with you, and improve our services.
        </p>
      </div>
    </div>
  );
}
