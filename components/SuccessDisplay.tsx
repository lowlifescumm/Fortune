"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderSummary {
  name: string;
  dob: string;
  birthplace: string;
  q1: string;
  q2?: string;
  q3?: string;
}

interface SuccessDisplayProps {
  sessionId: string | null;
  kickChannelUrl: string;
}

export function SuccessDisplay({ sessionId, kickChannelUrl }: SuccessDisplayProps) {
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found.');
      setIsLoading(false);
      return;
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/order/summary?session_id=${sessionId}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch order summary.');
        }
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [sessionId]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-accent">Thank You!</h1>
      <p className="mt-4 text-lg text-gray-300">
        You're in the queue. We'll read your spread live on stream.
      </p>
      <div className="mt-8">
        <a
          href={kickChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-accent px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
        >
          Watch Live on Kick
        </a>
      </div>

      <div className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6 text-left">
        <h2 className="text-2xl font-semibold">Your Order Summary</h2>
        {isLoading && <p className="mt-4">Loading your details...</p>}
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}
        {summary && (
          <div className="mt-4 space-y-3">
            <p><strong>Name:</strong> {summary.name}</p>
            <p><strong>Date of Birth:</strong> {summary.dob}</p>
            <p><strong>Birthplace:</strong> {summary.birthplace}</p>
            <p><strong>Question 1:</strong> {summary.q1}</p>
            {summary.q2 && <p><strong>Question 2:</strong> {summary.q2}</p>}
            {summary.q3 && <p><strong>Question 3:</strong> {summary.q3}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
