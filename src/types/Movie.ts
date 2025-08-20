interface Movie {
  title: string;
  image: string;
  description: string;
  href: string | null;
  published_at: string;
  isComingSoon: boolean;
}

export type { Movie };
