import type { JSX } from 'react';
import type { Movie } from '@src/types/Movie';
import './ThumbCard.scss';

interface ThumbCardProps {
  movie: Movie;
  isEmptySpacer?: false;  // falseまたは未指定を許容
}

interface SpacerProps {
  movie?: never;
  isEmptySpacer: true;
}

type Props = ThumbCardProps | SpacerProps;

export default function ThumbCard({ movie, isEmptySpacer }: Props): JSX.Element {
  if (isEmptySpacer === true) {
    return (
      <div className="thumb-card" style={{ visibility: 'hidden', height: 1 }}>
        <div className="thumb-image-container"></div>
      </div>
    );
  }

  const content = <ThumbCardContent movie={movie} />;

  if (movie.href) {
    return (
      <a
        href={movie.href}
        target="_blank"
        rel="noopener noreferrer"
        className="thumb-card"
        aria-label={movie.title}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="thumb-card">
      {content}
    </div>
  );
}

function ThumbCardContent({ movie }: { movie: Movie }): JSX.Element {
  // @2x画像のパスを生成
  const baseImageName = movie.image.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const extension = movie.image.match(/\.(jpg|jpeg|png|webp)$/i)?.[1] || 'jpg';
  const image2x = `${baseImageName}@2x.${extension}`;

  return (
    <>
      <div className="thumb-image-container">
        <img
          src={`/images/${movie.image}`}
          srcSet={`/images/${movie.image} 1x, /images/${image2x} 2x`}
          alt={movie.title}
          className="thumb-image"
        />
        {movie.isComingSoon && (
          <div className="coming-soon-overlay">
            <span className="coming-soon-text jost-light-italic">coming soon</span>
          </div>
        )}
      </div>
      <div className="thumb-info">
        <h3 className="thumb-title jost-light">{movie.title}</h3>
        <p className="thumb-description noto-sans-jp-thin">{movie.description}</p>
      </div>
    </>
  );
}
