import { useEffect } from 'react';

/**
 * Per-route document metadata for this SPA. Sets the tab title and the
 * meta description so each route (blog posts, imprint, 404) is indexed
 * with its own snippet instead of the homepage's.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      meta?.setAttribute('content', description);
    }
  }, [title, description]);
}
