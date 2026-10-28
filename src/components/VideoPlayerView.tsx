import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Episode, Series } from '../types';

interface VideoPlayerViewProps {
  episode: Episode;
  seriesList: Series[];
  onBack: () => void;
  onShare: (ep: Episode) => void;
  onSelectEpisode: (ep: Episode) => void;
}

export const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({
  episode,
  seriesList,
  onBack,
  onShare,
  onSelectEpisode,
}) => {
  const [showLegalNotes, setShowLegalNotes] = useState(false);
  const [playerKey, setPlayerKey] = useState(1);

  const currentSeries = seriesList.find((s) => s.id === episode.seriesId);
  const allEpisodes = currentSeries?.episodes || [];

  return (
    <View style={styles.container}>
      {/* Player Top Bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={onBack} hitSlop={8}>
          <Text style={styles.backIcon}>‹</Text>
          <Text style={styles.backLabel}>Catalog</Text>
        </Pressable>

        <View style={styles.titleWrapper}>
          <Text style={styles.seriesLabel} numberOfLines={1}>
            {episode.seriesTitle}
          </Text>
        </View>

        <Pressable
          style={styles.shareBtn}
          onPress={() => onShare(episode)}
          hitSlop={8}
        >
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
      </View>

      {/* Video Player Frame */}
      <View style={styles.playerFrame}>
        <WebView
          key={playerKey}
          source={{ uri: episode.embedUrl }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          style={{ flex: 1, backgroundColor: '#000000' }}
        />
      </View>

      {/* Scrollable Details */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metaSection}>
          <View style={styles.tagRow}>
            <View style={styles.seriesPill}>
              <Text style={styles.seriesPillText}>{episode.partLabel}</Text>
            </View>
            <Text style={styles.metaText}>{episode.duration}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{episode.year}</Text>
          </View>

          <Text style={styles.episodeTitle}>{episode.title}</Text>
          <Text style={styles.episodeDesc}>{episode.description}</Text>

          <View style={styles.topicRow}>
            {episode.topics.map((t) => (
              <View key={t} style={styles.topicChip}>
                <Text style={styles.topicChipText}>#{t}</Text>
              </View>
            ))}
          </View>

          {/* Toggle Censorship Context */}
          <Pressable
            style={styles.legalToggle}
            onPress={() => setShowLegalNotes(!showLegalNotes)}
          >
            <Text style={styles.legalToggleText}>
              {showLegalNotes ? 'Hide Censorship Dossier ▲' : 'View Censorship Record & IT Rules Notice ▼'}
            </Text>
          </Pressable>
        </View>

        {/* Censorship Record Box */}
        {showLegalNotes && (
          <View style={styles.contextBox}>
            <Text style={styles.contextTitle}>CENSORSHIP & LEGAL RECORD</Text>
            <Text style={styles.contextBody}>{episode.censorshipReason}</Text>
            <Text style={styles.contextLegal}>
              Protected under Article 19(1)(a) of the Constitution of India and Article 19 of the Universal Declaration of Human Rights (Freedom of Opinion & Information).
            </Text>
          </View>
        )}

        {/* Other Episodes in this Series */}
        <View style={styles.episodesSection}>
          <Text style={styles.sectionTitle}>Episodes in this Series</Text>
          {allEpisodes.map((ep) => {
            const isCurrent = ep.id === episode.id;
            return (
              <Pressable
                key={ep.id}
                style={[
                  styles.episodeItem,
                  isCurrent && styles.episodeItemActive,
                ]}
                onPress={() => {
                  if (!isCurrent) {
                    onSelectEpisode(ep);
                    setPlayerKey((k) => k + 1);
                  }
                }}
              >
                <View style={styles.thumbWrapper}>
                  <Image source={{ uri: ep.thumbnail }} style={styles.thumb} />
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationBadgeText}>{ep.duration}</Text>
                  </View>
                  {isCurrent && (
                    <View style={styles.nowPlayingOverlay}>
                      <Text style={styles.nowPlayingText}>PLAYING</Text>
                    </View>
                  )}
                </View>

                <View style={styles.itemMeta}>
                  <Text style={styles.itemPart}>{ep.partLabel}</Text>
                  <Text
                    style={[
                      styles.itemTitle,
                      isCurrent && styles.itemTitleActive,
                    ]}
                    numberOfLines={2}
                  >
                    {ep.title}
                  </Text>
                  <Text style={styles.itemSnippet} numberOfLines={2}>
                    {ep.description}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0E',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#171722',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 8,
  },
  backIcon: {
    color: '#60A5FA',
    fontSize: 22,
    fontWeight: '300',
    marginRight: 4,
    marginTop: -2,
  },
  backLabel: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '600',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  seriesLabel: {
    color: '#D1D5DB',
    fontSize: 13,
    fontWeight: '700',
  },
  shareBtn: {
    backgroundColor: '#161622',
    borderWidth: 1,
    borderColor: '#262638',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  playerFrame: {
    height: 230,
    backgroundColor: '#000000',
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  metaSection: {
    marginBottom: 16,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  seriesPill: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  seriesPillText: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  metaText: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  metaDot: {
    color: '#4B5563',
    fontSize: 11,
  },
  episodeTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },
  episodeDesc: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  topicRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  topicChip: {
    backgroundColor: '#161622',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  topicChipText: {
    color: '#60A5FA',
    fontSize: 10,
    fontWeight: '600',
  },
  legalToggle: {
    paddingVertical: 8,
    marginTop: 4,
  },
  legalToggleText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
  },
  contextBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
    padding: 12,
    borderRadius: 4,
    marginBottom: 20,
  },
  contextTitle: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  contextBody: {
    color: '#D1D5DB',
    fontSize: 11.5,
    lineHeight: 16,
    marginBottom: 6,
  },
  contextLegal: {
    color: '#9CA3AF',
    fontSize: 10.5,
    fontStyle: 'italic',
  },
  episodesSection: {
    marginTop: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  episodeItem: {
    flexDirection: 'row',
    backgroundColor: '#12121B',
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1F1F2E',
  },
  episodeItemActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#181E2E',
  },
  thumbWrapper: {
    width: 110,
    height: 72,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
  },
  thumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  durationBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  nowPlayingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(59, 130, 246, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nowPlayingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  itemMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  itemPart: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 2,
  },
  itemTitleActive: {
    color: '#60A5FA',
  },
  itemSnippet: {
    color: '#9CA3AF',
    fontSize: 10.5,
  },
});
