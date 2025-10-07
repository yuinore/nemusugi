import './VideoModal.scss';
import type { Movie } from '@src/types/Movie';

interface Props {
  movie: Movie;
  onClose: () => void;
}

export default function VideoModal({ movie, onClose }: Props) {
  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div>
      <iframe
        src={movie.hrefEmbed || ''}
        title={`YouTube video player - ${movie.title}`}
        style={{
          border: 'none',
          width: 'min(560px, 95vw)',
          height: 'min(315px, calc(95vw * 0.5625))',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="video-modal-close">
        <a className="noto-sans-jp-thin" href="#" onClick={handleClose}>
          Close
        </a>
      </div>
    </div>
  );
}
