export interface StatInfo {
  value: string;
  label: string;
}

export interface FeatureInfo {
  id: string;
  letter: string;
  title: string;
  description: string;
  colorClass: string;
  letterColorClass?: string;
}

export interface CarouselMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string; // For videos
}
