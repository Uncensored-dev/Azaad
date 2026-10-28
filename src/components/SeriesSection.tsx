import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Episode, Series } from '../types';
import { EpisodeCard } from './EpisodeCard';

interface SeriesSectionProps {
  series: Series;
  onSelectEpisode: (ep: Episode) => void;
}

export const SeriesSection: React.FC<SeriesSectionProps> = ({
  series,
  onSelectEpisode,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.titleColumn}>
          <Text style={styles.title}>{series.title}</Text>
          <Text style={styles.subtitle}>
            {series.badge} • {series.episodes.length} {series.episodes.length === 1 ? 'Part' : 'Episodes'} • {series.year}
          </Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>{series.statusBadge}</Text>
        </View>
      </View>

      <View style={styles.episodesList}>
        {series.episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            episode={ep}
            onPress={onSelectEpisode}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    paddingHorizontal: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  titleColumn: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  statusBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '700',
  },
  episodesList: {
    marginTop: 2,
  },
});
