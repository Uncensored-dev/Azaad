import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Episode } from '../types';

interface HeroBannerProps {
  heroItem: Episode;
  onPlay: (ep: Episode) => void;
  onViewSeries: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  heroItem,
  onPlay,
  onViewSeries,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: heroItem.thumbnail }} style={styles.image} />
      <View style={styles.gradient} />

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>FEATURED BBC INVESTIGATION</Text>
        </View>

        <Text style={styles.title}>India: The Modi Question</Text>

        <Text style={styles.meta}>
          2-Part Series • 2023 • Banned in India under IT Rules 2021
        </Text>

        <Text style={styles.synopsis} numberOfLines={2}>
          {heroItem.description}
        </Text>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.playButton}
            onPress={() => onPlay(heroItem)}
            hitSlop={6}
          >
            <Text style={styles.playButtonText}>▶ Watch Episode 1</Text>
          </Pressable>

          <Pressable
            style={styles.detailsButton}
            onPress={onViewSeries}
            hitSlop={6}
          >
            <Text style={styles.detailsButtonText}>View Episodes (2)</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    marginTop: 4,
    marginBottom: 20,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    height: 240,
    backgroundColor: '#14141B',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 14, 0.72)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(229, 9, 20, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  meta: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  synopsis: {
    color: '#9CA3AF',
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  playButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  playButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
