import Link from 'next/link';
import { siteContent } from '@/data/content';

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">{siteContent.notFoundTitle}</h1>
      <p className="mt-4 leading-relaxed">{siteContent.notFoundMessage}</p>
      <Link className="mt-6 inline-block underline" href="/">
        Về trang lời mời
      </Link>
    </main>
  );
}
