import './PauseToggleButton.scss';
import playIcon from '@src/assets/media_control_play.svg';
import pauseIcon from '@src/assets/media_control_pause.svg';

interface PauseToggleButtonProps {
  isPaused: boolean;
  onClick: () => void;
}

export default function PauseToggleButton({
  isPaused,
  onClick,
}: PauseToggleButtonProps) {
  return (
    <button
      className="pause-toggle-button"
      onClick={onClick}
      aria-label={isPaused ? 'Play' : 'Pause'}
    >
      <img
        src={isPaused ? playIcon : pauseIcon}
        alt={isPaused ? 'Play' : 'Pause'}
      />
    </button>
  );
}
