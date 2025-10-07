import './PopupContainer.scss';
import { useEffect } from 'react';

interface Props {
  active: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function PopupContainer({ active, children, onClose }: Props) {
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
        <div className="popup-container-overlay" onClick={handleOverlayClick}>
          {children}
        </div>
      )}
    </div>
  );
}
