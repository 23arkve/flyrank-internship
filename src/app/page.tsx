'use client';

import { useState } from 'react';
import { ContentInputForm } from '@/components/ContentInputForm';

export default function Home() {
  const [submittedData, setSubmittedData] = useState<string | null>(null);

  const handleSubmit = async (content: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmittedData(content);
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto flex flex-col justify-center">
      <div className="card bg-base-100 shadow-xl border border-base-300 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Content Input Form</h1>
        
        <ContentInputForm onSubmit={handleSubmit} />

        {submittedData && (
          <div className="alert alert-success mt-4">
            <div>
              <h3 className="font-bold">Submitted Content:</h3>
              <p className="whitespace-pre-wrap mt-1">{submittedData}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
