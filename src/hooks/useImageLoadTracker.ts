import { useState, useEffect, useCallback } from 'react';

interface ImageLoadState {
  [imageSrc: string]: boolean;
}

export function useImageLoadTracker(imageSources: string[]) {
  const [loadedImages, setLoadedImages] = useState<ImageLoadState>({});
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // 画像の読み込み完了を記録する関数
  const onImageLoad = useCallback((imageSrc: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageSrc]: true,
    }));
  }, []);

  // 画像の読み込み失敗を記録する関数
  const onImageError = useCallback((imageSrc: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageSrc]: true, // エラーも「完了」として扱う
    }));
  }, []);

  // 全ての画像が読み込まれたかをチェック
  useEffect(() => {
    if (imageSources.length === 0) {
      setAllImagesLoaded(true);
      return;
    }

    const loadedCount = imageSources.filter((src) => loadedImages[src]).length;
    setAllImagesLoaded(loadedCount === imageSources.length);
  }, [imageSources, loadedImages]);

  return {
    onImageLoad,
    onImageError,
    allImagesLoaded,
  };
}
