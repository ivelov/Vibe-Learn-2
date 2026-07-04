'use client';

import { useState } from 'react';
import { NDAForm } from '@/components/NDAForm';
import { NDADocument } from '@/components/NDADocument';
import { NDAFormData } from '@/lib/types';
import { generateNDAMarkdown } from '@/lib/generate-nda';

export default function Home() {
  const [formData, setFormData] = useState<NDAFormData | null>(null);

  function handleSubmit(data: NDAFormData) {
    setFormData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBack() {
    setFormData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDownload() {
    if (!formData) return;
    const markdown = generateNDAMarkdown(formData);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    a.download = `mutual-nda-${slug(formData.party1Company)}-${slug(formData.party2Company)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (formData) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-1 transition-colors"
          >
            ← Back to Form
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Download .md
          </button>
        </div>
        <NDADocument data={formData} />
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Download .md
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mutual NDA Creator</h1>
        <p className="text-gray-500">
          Generate a{' '}
          <a
            href="https://commonpaper.com/standards/mutual-nda/1.0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Common Paper
          </a>{' '}
          Mutual Non-Disclosure Agreement. Fill in the details below, then download the completed
          document as a Markdown file.
        </p>
      </div>
      <NDAForm onSubmit={handleSubmit} />
    </main>
  );
}
