import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center justify-between p-4 text-center text-sm text-gray-400 md:flex-row">
        <p>&copy; {new Date().getFullYear()} 3-Card Tarot. All rights reserved.</p>
        <div className="mt-2 flex gap-4 md:mt-0">
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
