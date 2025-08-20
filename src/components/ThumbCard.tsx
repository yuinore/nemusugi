import type { JSX } from 'react';
import type { Movie } from '@src/types/Movie';
import './ThumbCard.scss';

interface Props {
  movie: Movie | null;
  isEmptySpacer?: boolean;
}

export default function ThumbCard({ movie, isEmptySpacer }: Props): JSX.Element {
  if (isEmptySpacer === true || movie == null) {
    return (
      <div className="thumb-card" style={{ visibility: 'hidden', height: 1 }}>
        <div className="thumb-image-container"></div>
      </div>
    );
  }

  const content = <ThumbCardContent movie={movie} />;

  if (movie.href) {
    return (
      <a href={movie.href} target="_blank" rel="noopener noreferrer" className="thumb-card">
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
  return (
    <>
      <div className="thumb-image-container">
        <img src={`/images/${movie.image}`} alt={movie.title} className="thumb-image" />
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
