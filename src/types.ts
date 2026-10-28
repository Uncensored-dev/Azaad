export type Episode = {
  id: string;
  seriesId: string;
  seriesTitle: string;
  episodeNumber: number;
  partLabel: string;
  title: string;
  duration: string;
  year: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  censorshipReason: string;
  topics: string[];
  keywords?: string[];
};

export type Series = {
  id: string;
  title: string;
  badge: string;
  investigator: string;
  year: string;
  statusBadge: string;
  summary: string;
  keywords?: string[];
  episodes: Episode[];
};

export type CategoryFilterType = 'all' | 'modi-question' | 'modi-friendship' | 'community-vault';

export type PresetDisguise = {
  name: string;
  subtitle: string;
  emoji: string;
  label: string;
};
