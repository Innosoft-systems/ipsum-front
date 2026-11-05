const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com']);

/** Extracts the 11-character YouTube video id from a link or a bare id. */
export function parseYouTubeId(input: string): string | undefined {
  const value = input.trim();
  if (YOUTUBE_ID.test(value)) return value;

  let url: URL;
  try {
    url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return undefined;
  }

  const host = url.hostname.toLowerCase();
  let candidate: string | null | undefined;

  if (host === 'youtu.be' || host === 'www.youtu.be') {
    candidate = url.pathname.split('/')[1];
  } else if (YOUTUBE_HOSTS.has(host)) {
    const [, kind, id] = url.pathname.split('/');
    if (kind === 'watch') candidate = url.searchParams.get('v');
    else if (kind === 'shorts' || kind === 'embed') candidate = id;
  }

  return candidate && YOUTUBE_ID.test(candidate) ? candidate : undefined;
}
