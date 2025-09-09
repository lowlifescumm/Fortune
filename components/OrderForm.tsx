"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema, type OrderFormData } from '@/lib/schemas';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Label } from '@/components/Label';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function OrderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      lang: 'en',
      product: 'three',
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const session = await response.json();

      if (!response.ok) {
        throw new Error(session.error || 'An unexpected error occurred.');
      }

      if (session.url) {
        window.location.href = session.url;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-1">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register('name')} className="mt-1" />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Date of Birth */}
        <div className="sm:col-span-1">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" {...register('dob')} className="mt-1" />
          {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob.message}</p>}
        </div>
      </div>

      {/* Birthplace */}
      <div>
        <Label htmlFor="birthplace">Birthplace (City, State/Country)</Label>
        <Input id="birthplace" {...register('birthplace')} className="mt-1" />
        {errors.birthplace && <p className="mt-1 text-sm text-red-500">{errors.birthplace.message}</p>}
      </div>

      {/* Questions */}
      <div>
        <Label htmlFor="q1">Question 1 (Required)</Label>
        <Textarea id="q1" {...register('q1')} className="mt-1" placeholder="What do I need to know about..."/>
        {errors.q1 && <p className="mt-1 text-sm text-red-500">{errors.q1.message}</p>}
      </div>
      <div>
        <Label htmlFor="q2">Question 2 (Optional)</Label>
        <Textarea id="q2" {...register('q2')} className="mt-1" />
        {errors.q2 && <p className="mt-1 text-sm text-red-500">{errors.q2.message}</p>}
      </div>
      <div>
        <Label htmlFor="q3">Question 3 (Optional)</Label>
        <Textarea id="q3" {...register('q3')} className="mt-1" />
        {errors.q3 && <p className="mt-1 text-sm text-red-500">{errors.q3.message}</p>}
      </div>

      {/* Card Pulls */}
      <div>
        <Label htmlFor="cardPulls">Specific Card Pulls (Optional)</Label>
        <Input id="cardPulls" {...register('cardPulls')} className="mt-1" placeholder="e.g., The Lovers, The Tower" />
        <p className="mt-1 text-sm text-gray-400">If you have specific cards you'd like me to pull, list them here.</p>
        {errors.cardPulls && <p className="mt-1 text-sm text-red-500">{errors.cardPulls.message}</p>}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full rounded-md bg-accent px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105",
          { "cursor-not-allowed opacity-50": isLoading }
        )}
      >
        {isLoading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </form>
  );
}
