import type { JSX } from 'react';
import type { Profile } from '@src/types/Profile';
import './ProfileModal.scss';

interface Props {
  profile: Profile;
  onClose: () => void;
}

export default function ProfileModal({ profile, onClose }: Props): JSX.Element {
  const handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-centering">
        <div className="profile-large-image-container">
          <img
            src={profile.image}
            srcSet={`${profile.image} 1x, ${profile.image2x} 2x`}
            alt={`${profile.name} のプロフィール画像`}
            className="profile-image-large"
          />
        </div>
        <div className="profile-name-large">
          <span className="jost-light">{profile.name}</span>
        </div>
        <div className="profile-modal-link-container">
          {profile.links.map((link) => (
            <a
              className={`profile-modal-link-badge profile-modal-link-${link.variant} jost-light`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
      <div className="profile-modal-description">
        <span className="noto-sans-jp-thin">{profile.description}</span>
      </div>
      <div className="profile-modal-close">
        <a className="noto-sans-jp-thin" href="#" onClick={handleClose}>
          Close
        </a>
      </div>
    </div>
  );
}
