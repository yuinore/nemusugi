import './App.scss';
import ProfileCard from '@src/components/ProfileCard';
import ThumbCard from '@src/components/ThumbCard';
import Footer from '@src/components/Footer';
import profiles from '@src/enum/Profiles';
import movies from '@src/enum/Movies';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useMemo } from 'react';
import { useImageLoadTracker } from '@src/hooks/useImageLoadTracker';
import type { Movie } from '@src/types/Movie';

function App() {
  const sortedMovies = useMemo(
    () =>
      _.orderBy(
        movies,
        (movie: Movie) => dayjs(movie.published_at).format('YYYY-MM-DD'),
        'desc',
      ),
    [movies],
  );

  // 全ての画像ソースを収集（プロフィール画像 + 動画サムネイル + @2x画像）
  const allImageSources = useMemo(() => {
    const profileImages = profiles.flatMap((profile) => {
      return [profile.image, profile.image2x];
    });

    const movieImages = sortedMovies.flatMap((movie) => {
      return [movie.image, movie.image2x];
    });

    return [...profileImages, ...movieImages];
  }, [sortedMovies]);

  const { onImageLoad, onImageError, allImagesLoaded } =
    useImageLoadTracker(allImageSources);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title jost-light-italic">#nemusugi</h1>
        <div className="subtitle jost-light">I'm crazy sleepy.</div>
      </header>

      <main className="main">
        <section className="profiles-section">
          <div className="profiles-container">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.name}
                profile={profile}
                onImageLoad={onImageLoad}
                onImageError={onImageError}
              />
            ))}
          </div>
        </section>

        <section className="movies-section">
          <div className="movies-grid">
            {sortedMovies.map((movie: Movie, index: number) => (
              <ThumbCard
                key={index}
                movie={movie}
                onImageLoad={onImageLoad}
                onImageError={onImageError}
                shouldLoadVideo={allImagesLoaded}
              />
            ))}
            <ThumbCard isEmptySpacer={true} />
            <ThumbCard isEmptySpacer={true} />
            <ThumbCard isEmptySpacer={true} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
