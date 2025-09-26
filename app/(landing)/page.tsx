import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="absolute inset-0 z-0 bg-[url('/stars.png')] bg-cover bg-center opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center text-center p-4">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-glow-blue sm:text-6xl md:text-7xl">
          THE ORACLE AWAITS.
        </h1>
        <p className="mb-2 text-2xl text-glow-blue">ASK THREE QUESTIONS.</p>
        <p className="mb-2 text-2xl text-glow-blue">RECEIVE THREE CARDS.</p>
        <p className="mb-8 text-2xl text-glow-blue">UNDERSTAND THE PATTERN.</p>
        <div className="mb-8">
          <img src="/oracle.png" alt="Oracle" className="w-64 md:w-80" />
        </div>
        <div className="max-w-2xl text-lg">
          <p className="mb-4">
            In the space between ancient prophecy and artificial intelligence, THE ORACLE OF NULLA speaks.
          </p>
          <p className="mb-4">
            Her glowing crystal form responds to your questions with tarot—one card per query, pulled in real-time and revealed live.
          </p>
          <p className="mb-4">
            She offers no advice, Only symbols. You ask. She reveals. The meaning is yours to interpret.
          </p>
          <p className="mb-8 italic">“Truth is not given. It is drawn.”</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={process.env.KICK_CHANNEL_URL || 'https://kick.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border-2 border-glow-blue bg-transparent px-8 py-4 text-lg font-semibold text-glow-blue shadow-lg transition-all duration-200 ease-in-out hover:bg-glow-blue hover:text-black"
          >
            WATCH LIVE ON KICK
          </a>
          <Link
            href="/order"
            className="rounded-md border-2 border-glow-blue bg-glow-blue px-8 py-4 text-lg font-semibold text-black shadow-lg transition-all duration-200 ease-in-out hover:bg-transparent hover:text-glow-blue"
          >
            ASK THE ORACLE
          </Link>
        </div>
      </div>
    </div>
  );
}