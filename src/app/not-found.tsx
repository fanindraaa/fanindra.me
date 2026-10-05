import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-[480px] space-y-4">
        <p className="text-[1rem] font-semibold text-[var(--foreground)]">
          404 · Page not found.
        </p>
        <p className="text-[1rem] font-medium text-[var(--muted)] leading-relaxed">
          The requested route does not exist.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="text-[1rem] font-medium text-[var(--foreground)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--foreground)] transition-colors"
          >
            ← Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
