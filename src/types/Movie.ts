interface Movie {
  title: string;
  image: string;
  image2x: string; // TODO: ファイルパスの自動生成
  video: string | null;
  description: string;
  href: string | null;
  published_at: string;
  isComingSoon: boolean;
}

export type { Movie };
