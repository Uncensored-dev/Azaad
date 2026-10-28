import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

interface DecoyDoc {
  id: string;
  title: string;
  artist: string;
  duration: string;
  resolution: string;
  fileSize: string;
  credits: string;
  platforms: string[];
  thumbnail: string;
  embedUrl: string;
}

interface DecoyScreenProps {
  decoyDoc: DecoyDoc;
  isPlaying: boolean;
  onSetPlaying: (playing: boolean) => void;
  onExit: () => void;
}

export const DecoyScreen: React.FC<DecoyScreenProps> = ({
  decoyDoc,
  isPlaying,
  onSetPlaying,
  onExit,
}) => {
  return (
    <View style={styles.container}>
      {/* Discreet Music Player Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>BEATSTREAM</Text>
          <Text style={styles.brandSub}>Music Visualisers & Edits</Text>
        </View>
        <Pressable style={styles.exitBtn} onPress={onExit} hitSlop={8}>
          <Text style={styles.exitText}>✕ Close</Text>
        </Pressable>
      </View>

      {isPlaying ? (
        <View style={{ flex: 1 }}>
          <View style={styles.playerBar}>
            <Pressable
              style={styles.backBtn}
              onPress={() => onSetPlaying(false)}
              hitSlop={8}
            >
              <Text style={styles.backText}>← Track Details</Text>
            </Pressable>
            <Text style={styles.badge}>HD 720p</Text>
          </View>

          <View style={styles.videoFrame}>
            <WebView
              source={{ uri: decoyDoc.embedUrl }}
              allowsFullscreenVideo
              javaScriptEnabled
              domStorageEnabled
              originWhitelist={['*']}
              style={{ flex: 1, backgroundColor: '#000000' }}
            />
          </View>

          <ScrollView contentContainerStyle={styles.trackInfo}>
            <Text style={styles.trackTitle}>{decoyDoc.title}</Text>
            <Text style={styles.trackArtist}>{decoyDoc.artist}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaPill}>{decoyDoc.duration}</Text>
              <Text style={styles.metaPill}>{decoyDoc.resolution}</Text>
              <Text style={styles.metaPill}>{decoyDoc.fileSize}</Text>
            </View>
            <Text style={styles.creditsText}>{decoyDoc.credits}</Text>
          </ScrollView>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <View style={styles.artWrapper}>
              <Image source={{ uri: decoyDoc.thumbnail }} style={styles.art} />
              <Pressable
                style={styles.playOverlay}
                onPress={() => onSetPlaying(true)}
              >
                <View style={styles.playCircle}>
                  <Text style={styles.playTriangle}>▶</Text>
                </View>
              </Pressable>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{decoyDoc.duration}</Text>
              </View>
            </View>

            <View style={styles.details}>
              <Text style={styles.label}>TRENDING REMIX</Text>
              <Text style={styles.trackTitle}>{decoyDoc.title}</Text>
              <Text style={styles.trackArtist}>{decoyDoc.artist}</Text>

              <View style={styles.platformsRow}>
                {decoyDoc.platforms.map((p) => (
                  <View key={p} style={styles.platformChip}>
                    <Text style={styles.platformChipText}>{p}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.creditsText}>{decoyDoc.credits}</Text>

              <Pressable
                style={styles.playButton}
                onPress={() => onSetPlaying(true)}
              >
                <Text style={styles.playButtonText}>▶ Play Visualiser</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.footnote}>
            Discreet Mode Active. Tap '✕ Close' in top right to return to main archive.
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  brandTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandSub: {
    color: '#94A3B8',
    fontSize: 11,
  },
  exitBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  exitText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
  },
  playerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0B1120',
  },
  backBtn: {
    paddingVertical: 4,
  },
  backText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
  },
  badge: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  videoFrame: {
    height: 230,
    backgroundColor: '#000000',
  },
  trackInfo: {
    padding: 16,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  trackArtist: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  metaPill: {
    backgroundColor: '#1E293B',
    color: '#94A3B8',
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  creditsText: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    overflow: 'hidden',
  },
  artWrapper: {
    height: 220,
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  art: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(56, 189, 248, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playTriangle: {
    color: '#0F172A',
    fontSize: 22,
    marginLeft: 3,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  details: {
    padding: 16,
  },
  label: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  platformsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 10,
  },
  platformChip: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  platformChipText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#38BDF8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  playButtonText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '800',
  },
  footnote: {
    color: '#475569',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
});
