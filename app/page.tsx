import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
      {/* Hero Section */}
      <section className="py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          Book Your 3-Card Reading
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Gain insight and clarity. Watch your reading performed live on stream.
        </p>
        <div className="mt-8">
          <Link
            href="/order"
            className="inline-block rounded-md bg-accent px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
          >
            Order a Reading
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl font-bold text-accent">1</div>
            <h3 className="text-xl font-semibold">Submit Your Order</h3>
            <p className="mt-2 text-gray-400">Fill out the form with your details and questions. Your information is kept private.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl font-bold text-accent">2</div>
            <h3 className="text-xl font-semibold">Checkout with Stripe</h3>
            <p className="mt-2 text-gray-400">Complete your payment securely via Stripe. You don't need an account.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl font-bold text-accent">3</div>
            <h3 className="text-xl font-semibold">Watch Live on Kick</h3>
            <p className="mt-2 text-gray-400">Join the live stream to see your reading performed and your questions answered.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-8 text-left">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Is my personal information safe?</h3>
            <p className="mt-2 text-gray-400">Yes. Your payment is handled by Stripe, a certified PCI Service Provider Level 1. Your personal details (name, DOB, etc.) are passed to me securely and are never shared publicly. On stream, I will only refer to you by your first name.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">When will my reading be done?</h3>
            <p className="mt-2 text-gray-400">Readings are performed live on Kick. The schedule is posted on the Kick channel. You'll be placed in a queue, and readings are done in the order they are received.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">What if I miss the live stream?</h3>
            <p className="mt-2 text-gray-400">VODs (video on demand) are available on the Kick channel, so you can watch your reading later.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
