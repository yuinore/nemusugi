import type { JSX } from 'react';
import { useRef } from 'react';
import type { Movie } from '@src/types/Movie';
import './ThumbCard.scss';

interface ThumbCardProps {
  movie: Movie;
  isEmptySpacer?: false; // falseまたは未指定を許容
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
  shouldLoadVideo: boolean;
}

interface SpacerProps {
  movie?: never; // 未指定のみを許容
  isEmptySpacer: true;
  onImageLoad?: never; // 未指定のみを許容
  onImageError?: never; // 未指定のみを許容
  shouldLoadVideo?: never; // 未指定のみを許容
}

type Props = ThumbCardProps | SpacerProps;

export default function ThumbCard({
  movie,
  isEmptySpacer,
  onImageLoad,
  onImageError,
  shouldLoadVideo,
}: Props): JSX.Element {
  if (isEmptySpacer === true) {
    return (
      <div className="thumb-card" style={{ visibility: 'hidden', height: 1 }}>
        <div className="thumb-image-container"></div>
      </div>
    );
  }

  const content = (
    <ThumbCardContent
      movie={movie}
      onImageLoad={onImageLoad}
      onImageError={onImageError}
      shouldLoadVideo={shouldLoadVideo}
    />
  );

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

  return <div className="thumb-card">{content}</div>;
}

function ThumbCardContent({
  movie,
  onImageLoad,
  onImageError,
  shouldLoadVideo,
}: {
  movie: Movie;
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
  shouldLoadVideo: boolean;
}): JSX.Element {
  // 動画要素への参照
  const videoRef = useRef<HTMLVideoElement>(null);

  // 動画遅延読み込み
  const videoSrc = shouldLoadVideo ? movie.video : null;

  // 画像読み込み完了を追跡
  const handleImageLoad = () => {
    onImageLoad(movie.image);
    onImageLoad(movie.image2x);
  };

  const handleImageError = () => {
    onImageError(movie.image);
    onImageError(movie.image2x);
  };

  // 動画再生制御用の関数
  const playVideo = async (video: HTMLVideoElement) => {
    try {
      // 動画が十分に読み込まれるまで待機
      if (video.readyState < 3) {
        // HAVE_FUTURE_DATA未満
        await new Promise<void>((resolve) => {
          const handleCanPlay = () => {
            video.removeEventListener('canplay', handleCanPlay);
            resolve();
          };
          video.addEventListener('canplay', handleCanPlay);
        });
      }

      // 再生を試行
      video.currentTime = 0;
      await video.play();
    } catch (err) {
      // 再生エラーを無視（ユーザーインタラクションが必要な場合など）
    }
  };

  const pauseVideo = (video: HTMLVideoElement) => {
    video.pause();
  };

  const handlePlayStart = () => {
    if (videoRef.current) {
      playVideo(videoRef.current);
    }
  };

  const handlePlayStop = () => {
    if (videoRef.current) {
      pauseVideo(videoRef.current);
    }
  };

  return (
    <>
      <div
        className="thumb-image-container"
        onMouseEnter={handlePlayStart}
        onMouseLeave={handlePlayStop}
        onTouchStart={handlePlayStart}
        onTouchEnd={handlePlayStop}
      >
        <img
          src={movie.image}
          srcSet={`${movie.image} 1x, ${movie.image2x} 2x`}
          alt={movie.title}
          className="thumb-image"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className="thumb-video"
            muted
            playsInline
            preload="auto"
            loop
          />
        )}
        {movie.isComingSoon && (
          <div className="coming-soon-overlay">
            <span className="coming-soon-text jost-light-italic">
              coming soon
            </span>
          </div>
        )}
        <div className="thumb-info">
          <h3 className="thumb-title jost-light">{movie.title}</h3>
          <p className="thumb-description noto-sans-jp-thin">
            {movie.description}
          </p>
        </div>
      </div>
    </>
  );
}
