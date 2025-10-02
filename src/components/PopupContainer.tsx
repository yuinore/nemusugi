import './PopupContainer.scss';
import { useEffect } from 'react';
import PopupScrollbar from './PopupScrollbar';

interface Props {
  active: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function PopupContainer({ active, children, onClose }: Props) {
  // 背景スクロールを無効にする
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [active]);

  // ESCキーでクローズ
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && active && onClose) {
        onClose();
      }
    };

    if (active) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // オーバーレイ自体がクリックされた時のみクローズ
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className="popup-container">
      {active && (
        <PopupScrollbar>
          <div className="popup-container-overlay" onClick={handleOverlayClick}>
            {children}
          </div>
        </PopupScrollbar>
      )}
    </div>
  );
}
