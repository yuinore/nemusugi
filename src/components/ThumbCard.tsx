import type { JSX } from 'react';
import { useRef, useState, useEffect } from 'react';
import type { Movie } from '@src/types/Movie';
import './ThumbCard.scss';

interface ThumbCardProps {
  movie: Movie;
  isEmptySpacer?: false; // falseまたは未指定を許容
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
  shouldLoadVideo: boolean;
  onClick: (movie: Movie) => void;
  isPopupActive: boolean;
  forcePlay: boolean;
}

interface SpacerProps {
  movie?: never; // 未指定のみを許容
  isEmptySpacer: true;
  onImageLoad?: never; // 未指定のみを許容
  onImageError?: never; // 未指定のみを許容
  shouldLoadVideo?: never; // 未指定のみを許容
  onClick?: never; // 未指定のみを許容
  isPopupActive?: never; // 未指定のみを許容
  forcePlay?: never; // 未指定のみを許容
}

type Props = ThumbCardProps | SpacerProps;

export default function ThumbCard({
  movie,
  isEmptySpacer,
  onImageLoad,
  onImageError,
  shouldLoadVideo,
  onClick,
  isPopupActive,
  forcePlay,
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
      isPopupActive={isPopupActive}
      forcePlay={forcePlay}
    />
  );

  const handleClick = (event: React.MouseEvent) => {
    if (movie.hrefEmbed) {
      event.preventDefault();
      onClick(movie);
    }
  };

  if (movie.href) {
    return (
      <a
        href={movie.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`thumb-card ${forcePlay ? 'active' : ''}`}
        aria-label={movie.title}
        onClick={handleClick}
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
  isPopupActive,
  forcePlay,
}: {
  movie: Movie;
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
  shouldLoadVideo: boolean;
  isPopupActive: boolean;
  forcePlay: boolean;
}): JSX.Element {
  // 動画要素への参照
  const videoRef = useRef<HTMLVideoElement>(null);
  // コンテナ要素への参照
  const containerRef = useRef<HTMLDivElement>(null);
  // ホバー状態を管理
  const [isHovered, setIsHovered] = useState(false);
  // ポップアップが開く前のホバー状態を保存
  const wasHoveredBeforePopup = useRef(false);

  const isVideoPlaying = isHovered || forcePlay;

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
    setIsHovered(true);
    wasHoveredBeforePopup.current = true;
  };

  const handlePlayStop = () => {
    setIsHovered(false);
    wasHoveredBeforePopup.current = false;
  };

  // ポップアップ状態とホバー状態に基づく動画制御
  useEffect(() => {
    if (!videoRef.current) return;

    // ポップアップが開いている場合は動画を停止
    if (isPopupActive) {
      pauseVideo(videoRef.current);
      return;
    }

    // ポップアップが閉じられていて、ホバー状態の場合は動画を再生
    if (isVideoPlaying) {
      playVideo(videoRef.current);
    } else {
      pauseVideo(videoRef.current);
    }
  }, [isPopupActive, isVideoPlaying]);

  // ポップアップが閉じられた時にホバー状態を復元
  useEffect(() => {
    // ポップアップが閉じられた時のみ実行
    if (!isPopupActive && containerRef.current) {
      // マウス位置を確認するためのハンドラー
      const checkMousePosition = () => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // マウス位置を取得するためにグローバルなマウス位置を使用
        const handleMouseMove = (event: MouseEvent) => {
          const isMouseOver =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

          setIsHovered(isMouseOver);
          document.removeEventListener('mousemove', handleMouseMove);
        };

        // 一時的にマウス移動イベントを監視
        document.addEventListener('mousemove', handleMouseMove);

        // 100ms後にクリーンアップ（マウスが動かない場合のフォールバック）
        setTimeout(() => {
          document.removeEventListener('mousemove', handleMouseMove);
          // マウスが動かない場合は、DOM要素の:hover疑似クラスを確認
          if (containerRef.current) {
            const isHovered = containerRef.current.matches(':hover');
            setIsHovered(isHovered);
          }
        }, 100);
      };

      // 少し遅延させてポップアップが完全に閉じてから実行
      setTimeout(checkMousePosition, 50);
    }
  }, [isPopupActive]);

  return (
    <>
      <div
        ref={containerRef}
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
            inert // Firefox で video 要素がフォーカスを獲得しないようにする
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
          <h3 className="thumb-title noto-sans-jp-regular">{movie.title}</h3>
          <p className="thumb-description noto-sans-jp-thin">
            {movie.description}
          </p>
        </div>
      </div>
    </>
  );
}
