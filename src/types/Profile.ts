import type { ExternalLink } from '@src/types/ExternalLink';

interface Profile {
  name: string;
  role: string;
  furigana: string;
  image: string;
  image2x: string; // TODO: ファイルパスの自動生成
  href: string;
  links: ExternalLink[];
  description: string;
}

export type { Profile };
