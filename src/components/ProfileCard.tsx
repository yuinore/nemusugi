import type { JSX } from "react";
import type { Profile } from "@src/types/Profile";
import "./ProfileCard.scss";

interface Props {
  profile: Profile;
}

export default function ProfileCard({ profile }: Props): JSX.Element {
  return (
    <div className="profile-card">
      <a
        className="profile-anchor"
        href={profile.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={profile.name}
      >
        <div className="profile-image-container">
          <img
            src={`/images/${profile.image}`}
            alt={`${profile.name} のプロフィール画像`}
            className="profile-image"
          />
        </div>
      </a>
      <div className="profile-name">
        <span className="jost-light">{profile.name}</span>
      </div>
    </div>
  );
}
