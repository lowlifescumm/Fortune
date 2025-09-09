import Link from 'next/link';

export function Navbar() {
  const kickChannelUrl = process.env.KICK_CHANNEL_URL || 'https://kick.com';

  return (
    <nav className="w-full border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-white hover:text-gray-300">
          3-Card Tarot
        </Link>
        <a
          href={kickChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-transform duration-200 ease-in-out hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Watch Live on Kick
        </a>
      </div>
    </nav>
  );
}
