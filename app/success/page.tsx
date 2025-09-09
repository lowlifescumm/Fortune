import { type Metadata } from 'next';
import { SuccessDisplay } from '@/components/SuccessDisplay';

export const metadata: Metadata = {
  title: 'Order Successful!',
};

interface SuccessPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = typeof searchParams.session_id === 'string' ? searchParams.session_id : null;
  const kickChannelUrl = process.env.KICK_CHANNEL_URL || 'https://kick.com';

  return <SuccessDisplay sessionId={sessionId} kickChannelUrl={kickChannelUrl} />;
}
