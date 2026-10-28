import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Episode } from '../types';

interface EpisodeCardProps {
  episode: Episode;
  onPress: (ep: Episode) => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onPress }) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(episode)}
      android_ripple={{ color: 'rgba(255,255,255,0.06)' }}
    >
      <View style={styles.thumbnailWrapper}>
        <Image source={{ uri: episode.thumbnail }} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{episode.duration}</Text>
        </View>
        <View style={styles.playIconOverlay}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.partLabel}>{episode.partLabel}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {episode.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {episode.description}
        </Text>
        <View style={styles.tagsRow}>
          {episode.topics.slice(0, 2).map((t) => (
            <Text key={t} style={styles.tagText}>
              #{t}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#13131C',
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#20202E',
  },
  thumbnailWrapper: {
    width: 125,
    height: 88,
    position: 'relative',
    backgroundColor: '#1E1E28',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  playIcon: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 16,
  },
  body: {
    flex: 1,
    padding: 9,
    justifyContent: 'center',
  },
  partLabel: {
    color: '#EF4444',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
    marginBottom: 3,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 5,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  tagText: {
    color: '#60A5FA',
    fontSize: 9.5,
    fontWeight: '600',
  },
});
