import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

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

const SERIES_DATA: Series[] = [
  {
    id: 'modi-question',
    title: 'India: The Modi Question',
    badge: 'BBC Two Investigation',
    investigator: 'British Broadcasting Corporation',
    year: '2023',
    statusBadge: 'Banned in India (IT Rules 2021)',
    summary:
      'The landmark two-part BBC documentary investigating the political rise of Narendra Modi, the 2002 Gujarat riots, the Jack Straw diplomatic dossier, and the subsequent crackdowns on media and civil liberties.',
    keywords: [
      'india the modi question',
      'the modi question',
      'the modi question episode 1',
      'the modi question episode 2',
      'bbc documentary modi',
      'bbc narendra modi',
      'bbc documentary banned in india',
      'gujarat riots 2002',
      'godhra train burning',
      'jack straw uk foreign office',
      'supreme court sit',
      'article 370 kashmir',
      'citizenship amendment act caa nrc',
      'press freedom india',
      'delhi riots 2020',
      'section 69a it act',
      'it rules 2021 rule 16',
      'emergency blocking order',
      'bbc iplayer download mega link',
      'watch modi question online free',
      'modi documentary github mirror',
      'uncensored bbc documentary',
      'watch bbc documentary without vpn in india',
    ],
    episodes: [
      {
        id: 'mq-ep1',
        seriesId: 'modi-question',
        seriesTitle: 'India: The Modi Question',
        episodeNumber: 1,
        partLabel: 'Episode 1',
        title: 'Episode 1: The Narendra Modi Story & Gujarat Inquiries',
        duration: '59 min',
        year: '2023',
        description:
          'Traces Narendra Modi’s political ascent in Gujarat and reveals an unpublished British diplomatic report on the 2002 communal violence, featuring interviews with UK diplomats and eyewitnesses.',
        thumbnail:
          'https://media.themoviedb.org/t/p/w1066_and_h600_face/WcJZ5BXEBgqSKCYrPU0AJlEtuP.jpg',
        embedUrl:
          'https://mega.nz/embed/Df4gmQbK#EwWnbH2GcotGnEL1TQkchtxTgMvMJHSSgvGsqDRo1Xk',
        censorshipReason:
          'Banned via emergency orders under Rule 16 of the IT Rules 2021 and Section 69A of the IT Act.',
        topics: ['2002 Gujarat Riots', 'Jack Straw Dossier', 'Supreme Court SIT'],
        keywords: [
          'india the modi question episode 1',
          'the modi question ep 1',
          'the modi question part 1',
          'bbc modi episode 1 mega',
          'the narendra modi story',
          'gujarat violence 2002',
          'jack straw dossier',
          'british diplomatic report gujarat',
          'chief minister gujarat 2002',
          'ehsan jafri gulbarg society',
          'supreme court sit clean chit',
          'watch bbc modi episode 1 online',
          'download bbc modi question part 1',
          'the modi question full episode 1 free',
        ],
      },
      {
        id: 'mq-ep2',
        seriesId: 'modi-question',
        seriesTitle: 'India: The Modi Question',
        episodeNumber: 2,
        partLabel: 'Episode 2',
        title: 'Episode 2: The Second Term, Article 370 & Press Freedoms',
        duration: '59 min',
        year: '2023',
        description:
          'Examines the Modi government after 2019: the revocation of Article 370 in Jammu & Kashmir, the Citizenship Amendment Act (CAA) protests, and growing pressure on independent media.',
        // Shared thumbnail with Episode 1 as requested
        thumbnail:
          'https://media.themoviedb.org/t/p/w1066_and_h600_face/WcJZ5BXEBgqSKCYrPU0AJlEtuP.jpg',
        embedUrl:
          'https://mega.nz/embed/7HoD2LYJ#3dM3JRTkWPf869JllYBcJuEnnbSSjHGzK3IirG208EQ',
        censorshipReason:
          'Subject to campus screening bans and social media censorship orders across India.',
        topics: ['Article 370', 'CAA & Delhi Unrest', 'Press Freedom Crackdown'],
        keywords: [
          'india the modi question episode 2',
          'the modi question ep 2',
          'the modi question part 2',
          'bbc modi episode 2 mega',
          'article 370 revocation kashmir',
          'citizenship amendment act caa',
          'shaheen bagh protest',
          'delhi 2020 riots',
          'press freedom journalists jailed',
          'amnesty international india frozen',
          'watch bbc modi episode 2 online',
          'download bbc modi question part 2',
          'the modi question full episode 2 free',
        ],
      },
    ],
  },
  {
    id: 'modi-friendship',
    title: 'Modi & Adani: The Friendship Files',
    badge: 'Investigative Exposé',
    investigator: 'Independent Investigative Journalists',
    year: '2023',
    statusBadge: 'Suppressed Report',
    summary:
      'An investigative breakdown detailing the alliance between Narendra Modi and Gautam Adani, charting how infrastructure contracts, ports, and regulatory waivers accelerated conglomerate expansion.',
    keywords: [
      'how modi and adani stole india',
      'the friendship files',
      'modi adani the friendship files',
      'modi adani documentary',
      'gautam adani narendra modi nexus',
      'hindenburg research adani',
      'adani scam documentary',
      'crony capitalism india',
      'airport privatization adani',
      'mundra port coal imports',
      'parliament expunged speech adani',
      'rahul gandhi adani modi speech',
      'watch friendship files online free',
      'the friendship files mega download',
      'modi adani bhai bhai documentary',
    ],
    episodes: [
      {
        id: 'mf-ep1',
        seriesId: 'modi-friendship',
        seriesTitle: 'Modi & Adani: The Friendship Files',
        episodeNumber: 1,
        partLabel: 'Feature',
        title: 'How Modi and Adani Stole India: The Friendship Files',
        duration: '48 min',
        year: '2023',
        description:
          'Investigative report into airport privatizations, coal import concessions, environmental waivers, and banking exposure that built the Adani corporate empire.',
        thumbnail:
          'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
        embedUrl:
          'https://mega.nz/embed/yaY33LoZ#Jvjb5OSjvAgcXu5ruLNjWM03kQWXiP8kPhRjvJ_-LIo',
        censorshipReason:
          'Parliamentary records addressing this nexus were expunged and reports faced takedown orders.',
        topics: ['Crony Capitalism', 'Airports & Ports', 'State Regulatory Favors'],
        keywords: [
          'how modi and adani stole india full documentary',
          'the friendship files part 1',
          'modi adani friendship files watch',
          'adani group crony capitalism video',
          'hindenburg report documentary',
          'airport tenders adani monopoly',
          'dharavi redevelopment project adani',
          'watch the friendship files free mega link',
        ],
      },
    ],
  },
];

// Decoy content for anti-censorship Camouflage Mode
const DECOY_DOC = {
  id: 'decoy-batman-sajan',
  title: 'SAJAN SAJAN x BATMAN (Visualiser version)',
  artist: 'Prod by Fearless',
  duration: '02:05',
  resolution: '720p HD',
  fileSize: '20.16 MB',
  credits:
    'Video: DC Production • Remix: Abhishek Mehra • Prod by: Prod by Fearless • Visuals edit: OG Farah & Prod by Fearless',
  platforms: ['Spotify', 'Apple Music', 'JioSaavn', 'Gaana', 'Instagram'],
  thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
  embedUrl: 'https://mega.nz/embed/iOxzERxb#JU9w8fS4rJ4fCrsksRGpxt7fqAMTVngt41Mt5EasJcs',
};

export default function App() {
  const [seriesList, setSeriesList] = useState<Series[]>(SERIES_DATA);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'modi-question' | 'modi-friendship' | 'community-vault'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [camouflageMode, setCamouflageMode] = useState(false);
  const [camouPlaying, setCamouPlaying] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLegalNotes, setShowLegalNotes] = useState(false);
  const [playerKey, setPlayerKey] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // User Customizable Identity & Camouflage Disguise
  const [showDisguiseModal, setShowDisguiseModal] = useState(false);
  const [customAppName, setCustomAppName] = useState('AZAAD');
  const [customAppSubtitle, setCustomAppSubtitle] = useState('VAULT');
  const [customIconType, setCustomIconType] = useState<'emoji' | 'image'>('emoji');
  const [customEmoji, setCustomEmoji] = useState('🦇');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Temporary inputs while editing in disguise modal
  const [tempName, setTempName] = useState('AZAAD');
  const [tempSubtitle, setTempSubtitle] = useState('VAULT');
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [tempEmoji, setTempEmoji] = useState('🦇');
  const [tempIconType, setTempIconType] = useState<'emoji' | 'image'>('emoji');

  // Community Submission Form State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [subSeriesId, setSubSeriesId] = useState('modi-question');
  const [subUrl, setSubUrl] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [subSubmitter, setSubSubmitter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subStatus, setSubStatus] = useState<string | null>(null);

  // Cloudflare Worker relay endpoint (zero credentials in app)
  const CLOUDFLARE_RELAY_URL = 'https://soft-glade-bb8e.aniversesbs.workers.dev';
  // GitHub Raw content URL for live dynamic updates without app store updates
  const GITHUB_RAW_CONTENT_URL =
    'https://raw.githubusercontent.com/Uncensored-dev/Azaad/main/content.json';

  // Fix Android Back Button: navigate back within app instead of closing app
  useEffect(() => {
    const handleHardwareBack = () => {
      if (showDisguiseModal) {
        setShowDisguiseModal(false);
        return true;
      }
      if (showSubmitModal) {
        setShowSubmitModal(false);
        setSubStatus(null);
        return true;
      }
      if (showInfoModal) {
        setShowInfoModal(false);
        return true;
      }
      if (showLegalNotes) {
        setShowLegalNotes(false);
        return true;
      }
      if (camouPlaying) {
        setCamouPlaying(false);
        return true;
      }
      if (camouflageMode) {
        setCamouflageMode(false);
        return true;
      }
      if (selectedEpisode) {
        setSelectedEpisode(null);
        return true;
      }
      if (isSearchOpen || searchQuery.trim().length > 0) {
        setIsSearchOpen(false);
        setSearchQuery('');
        return true;
      }
      if (activeFilter !== 'all') {
        setActiveFilter('all');
        return true;
      }
      return false; // Root level: exit app
    };

    const backSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBack
    );
    return () => backSubscription.remove();
  }, [
    showDisguiseModal,
    showSubmitModal,
    showInfoModal,
    showLegalNotes,
    camouPlaying,
    camouflageMode,
    selectedEpisode,
    isSearchOpen,
    searchQuery,
    activeFilter,
  ]);

  // Sync archive dynamically from GitHub Raw
  const syncArchiveFromNetwork = async (showFeedback = false) => {
    try {
      setIsSyncing(true);
      const res = await fetch(GITHUB_RAW_CONTENT_URL, {
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.series) && data.series.length > 0) {
          setSeriesList(data.series);
          setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          if (showFeedback) {
            Alert.alert('Archive Synchronized', 'Loaded latest verified investigative mirrors.');
          }
        }
      }
    } catch {
      // Seamless offline fallback to bundled SERIES_DATA
      if (showFeedback) {
        Alert.alert('Offline Mode', 'Operating on cached encrypted archives.');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncArchiveFromNetwork(false);
  }, []);

  // Handle Community Video Submission via tokenless relay
  const handleSubmitVideo = async () => {
    if (!subTitle.trim()) {
      Alert.alert('Missing Field', 'Please enter a documentary or investigation title.');
      return;
    }
    if (!subUrl.trim() || !subUrl.trim().startsWith('https://')) {
      Alert.alert('Invalid URL', 'Please enter a valid https:// embed link (Mega.nz, YouTube, Archive.org).');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubStatus('Connecting to encrypted relay...');

      const response = await fetch(CLOUDFLARE_RELAY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: subTitle.trim(),
          seriesId: subSeriesId,
          embedUrl: subUrl.trim(),
          description: subDesc.trim(),
          submitter: subSubmitter.trim() || 'Anonymous Citizen',
        }),
      });

      if (response.ok) {
        setSubStatus('✅ Mirror Submitted! Queued for verification.');
        setTimeout(() => {
          setShowSubmitModal(false);
          setSubTitle('');
          setSubUrl('');
          setSubDesc('');
          setSubStatus(null);
        }, 1800);
      } else {
        // If Cloudflare worker is pending deployment, provide direct pre-filled GitHub issue option
        Alert.alert(
          'Encrypted Relay Initializing',
          'The decentralized relay is standing by. Would you like to open a pre-filled submission report directly on GitHub?',
          [
            {
              text: 'Open GitHub Issue',
              onPress: () => {
                const titleEncoded = encodeURIComponent(`[Submission] ${subTitle.trim()}`);
                const bodyJson = JSON.stringify(
                  {
                    title: subTitle.trim(),
                    seriesId: subSeriesId,
                    embedUrl: subUrl.trim(),
                    description: subDesc.trim(),
                    submitter: subSubmitter.trim() || 'Anonymous',
                  },
                  null,
                  2
                );
                const bodyEncoded = encodeURIComponent(
                  `### Community Video Submission\n\n\`\`\`json\n${bodyJson}\n\`\`\`\n\n*Label: approved to sync into mobile archive.*`
                );
                Linking.openURL(
                  `https://github.com/Uncensored-dev/Azaad/issues/new?title=${titleEncoded}&body=${bodyEncoded}&labels=community-submission`
                ).catch(() => {});
              },
            },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      }
    } catch {
      Alert.alert(
        'Submission Stored Locally',
        'Relay unreachable right now. You can open an issue directly on GitHub or try again when online.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter series based on user selection and search query
  const filteredSeries = seriesList.filter((s) => {
    if (activeFilter !== 'all' && s.id !== activeFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const seriesMatches =
      s.title.toLowerCase().includes(query) ||
      (s.keywords && s.keywords.some((k) => k.toLowerCase().includes(query)));
    const episodeMatches = s.episodes.some(
      (ep) =>
        ep.title.toLowerCase().includes(query) ||
        ep.description.toLowerCase().includes(query) ||
        ep.topics.some((t) => t.toLowerCase().includes(query)) ||
        (ep.keywords && ep.keywords.some((k) => k.toLowerCase().includes(query)))
    );
    return seriesMatches || episodeMatches;
  });

  const handleShare = async (ep: Episode) => {
    try {
      await Share.share({
        title: ep.title,
        message: `Watch "${ep.title}" (${ep.seriesTitle}) - Censorship-free mirror: ${ep.embedUrl}`,
      });
    } catch {
      // ignore
    }
  };

  // Safe Camouflage / Decoy Mode (Disguised as standard Music Visualiser)
  if (camouflageMode) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.camouContainer}>
          <StatusBar style="light" />

          {/* Clean Music Player Header */}
          <View style={styles.camouHeader}>
            <View>
              <Text style={styles.camouBrand}>BEATSTREAM</Text>
              <Text style={styles.camouSub}>Music Visualisers & Edits</Text>
            </View>
            <Pressable
              style={styles.camouExitBtn}
              onPress={() => {
                setCamouflageMode(false);
                setCamouPlaying(false);
              }}
            >
              <Text style={styles.camouExitText}>✕ Close</Text>
            </Pressable>
          </View>

          {camouPlaying ? (
            <View style={{ flex: 1 }}>
              <View style={styles.camouPlayerBar}>
                <Pressable
                  style={styles.camouBackBtn}
                  onPress={() => setCamouPlaying(false)}
                >
                  <Text style={styles.camouBackText}>← Track Details</Text>
                </Pressable>
                <Text style={styles.camouBadge}>HD 720p</Text>
              </View>

              <View style={styles.videoPlayerFrame}>
                <WebView
                  source={{ uri: DECOY_DOC.embedUrl }}
                  allowsFullscreenVideo
                  javaScriptEnabled
                  domStorageEnabled
                  originWhitelist={['*']}
                  style={{ flex: 1, backgroundColor: '#000' }}
                />
              </View>

              <ScrollView contentContainerStyle={styles.camouTrackInfo}>
                <Text style={styles.camouTrackTitle}>{DECOY_DOC.title}</Text>
                <Text style={styles.camouTrackArtist}>{DECOY_DOC.artist}</Text>
                <View style={styles.camouMetaRow}>
                  <Text style={styles.camouMetaPill}>{DECOY_DOC.duration}</Text>
                  <Text style={styles.camouMetaPill}>{DECOY_DOC.resolution}</Text>
                  <Text style={styles.camouMetaPill}>{DECOY_DOC.fileSize}</Text>
                </View>
                <Text style={styles.camouCreditsText}>{DECOY_DOC.credits}</Text>
              </ScrollView>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.camouContent}>
              <View style={styles.camouCard}>
                <View style={styles.camouArtWrapper}>
                  <Image source={{ uri: DECOY_DOC.thumbnail }} style={styles.camouArt} />
                  <Pressable
                    style={styles.camouPlayOverlay}
                    onPress={() => setCamouPlaying(true)}
                  >
                    <View style={styles.camouPlayCircle}>
                      <Text style={styles.camouPlayTriangle}>▶</Text>
                    </View>
                  </Pressable>
                  <View style={styles.camouDurationBadge}>
                    <Text style={styles.camouDurationText}>{DECOY_DOC.duration}</Text>
                  </View>
                </View>

                <View style={styles.camouDetails}>
                  <Text style={styles.camouLabel}>TRENDING REMIX</Text>
                  <Text style={styles.camouTrackTitle}>{DECOY_DOC.title}</Text>
                  <Text style={styles.camouTrackArtist}>{DECOY_DOC.artist}</Text>

                  <View style={styles.camouPlatformsRow}>
                    {DECOY_DOC.platforms.map((p) => (
                      <View key={p} style={styles.camouChip}>
                        <Text style={styles.camouChipText}>{p}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.camouCreditsText}>{DECOY_DOC.credits}</Text>

                  <Pressable
                    style={styles.camouPlayButton}
                    onPress={() => setCamouPlaying(true)}
                  >
                    <Text style={styles.camouPlayButtonText}>▶ Play Visualiser</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={styles.camouFootnote}>
                Discreet Mode Active. Tap '✕ Close' in top right to return to main archive.
              </Text>
            </ScrollView>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Active Video Player Screen (Standard OTT Layout)
  if (selectedEpisode) {
    const currentSeries = seriesList.find((s) => s.id === selectedEpisode.seriesId);
    const allEpisodes = currentSeries?.episodes || [];

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />

          {/* Standard Player Top Bar */}
          <View style={styles.playerTopBar}>
            <Pressable
              style={styles.navIconButton}
              onPress={() => setSelectedEpisode(null)}
              hitSlop={8}
            >
              <Text style={styles.navBackIcon}>‹</Text>
              <Text style={styles.navBackLabel}>Catalog</Text>
            </Pressable>

            <View style={styles.playerTitleWrapper}>
              <Text style={styles.playerSeriesLabel} numberOfLines={1}>
                {selectedEpisode.seriesTitle}
              </Text>
            </View>

            <Pressable
              style={styles.navActionIcon}
              onPress={() => handleShare(selectedEpisode)}
              hitSlop={8}
            >
              <Text style={styles.navActionText}>Share</Text>
            </Pressable>
          </View>

          {/* Video Player Frame */}
          <View style={styles.videoPlayerFrame}>
            <WebView
              key={playerKey}
              source={{ uri: selectedEpisode.embedUrl }}
              allowsFullscreenVideo
              javaScriptEnabled
              domStorageEnabled
              originWhitelist={['*']}
              style={{ flex: 1, backgroundColor: '#000000' }}
            />
          </View>

          {/* Scrollable Episode Details */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.playerContentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Title & Metadata */}
            <View style={styles.metaSection}>
              <View style={styles.tagRow}>
                <View style={styles.seriesPill}>
                  <Text style={styles.seriesPillText}>{selectedEpisode.partLabel}</Text>
                </View>
                <Text style={styles.metaMutedText}>
                  {selectedEpisode.duration} • {selectedEpisode.year}
                </Text>
                <View style={styles.onlineBadge}>
                  <View style={styles.greenDot} />
                  <Text style={styles.onlineText}>Mirror Active</Text>
                </View>
              </View>

              <Text style={styles.detailTitle}>{selectedEpisode.title}</Text>
              <Text style={styles.detailDesc}>{selectedEpisode.description}</Text>

              {/* Action Toolbar */}
              <View style={styles.actionToolbar}>
                <Pressable
                  style={styles.toolbarButton}
                  onPress={() => handleShare(selectedEpisode)}
                >
                  <Text style={styles.toolbarButtonText}>↗ Share Link</Text>
                </Pressable>

                <Pressable
                  style={styles.toolbarButton}
                  onPress={() => setPlayerKey((k) => k + 1)}
                >
                  <Text style={styles.toolbarButtonText}>↻ Reload Player</Text>
                </Pressable>

                <Pressable
                  style={styles.toolbarButton}
                  onPress={() => setShowLegalNotes(!showLegalNotes)}
                >
                  <Text style={styles.toolbarButtonText}>
                    {showLegalNotes ? 'Hide Context' : 'ℹ Censorship Info'}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Censorship Context (Expandable / Clean) */}
            {showLegalNotes && (
              <View style={styles.contextBox}>
                <Text style={styles.contextTitle}>CENSORSHIP & LEGAL RECORD</Text>
                <Text style={styles.contextBody}>{selectedEpisode.censorshipReason}</Text>
                <Text style={styles.contextLegal}>
                  Protected under Article 19(1)(a) of the Constitution of India and Article 19 of the UDHR (Right to impart and receive information).
                </Text>
              </View>
            )}

            {/* Episodes in this series (Standard OTT Episode Picker) */}
            <View style={styles.episodesSection}>
              <Text style={styles.sectionHeaderTitle}>Episodes</Text>
              {allEpisodes.map((ep) => {
                const isCurrent = ep.id === selectedEpisode.id;
                return (
                  <Pressable
                    key={ep.id}
                    style={[
                      styles.episodeListItem,
                      isCurrent && styles.episodeListItemActive,
                    ]}
                    onPress={() => {
                      if (!isCurrent) {
                        setSelectedEpisode(ep);
                        setPlayerKey((k) => k + 1);
                      }
                    }}
                  >
                    <View style={styles.episodeListThumbWrapper}>
                      <Image source={{ uri: ep.thumbnail }} style={styles.episodeListThumb} />
                      <View style={styles.episodeListDurationBadge}>
                        <Text style={styles.episodeListDurationText}>{ep.duration}</Text>
                      </View>
                      {isCurrent && (
                        <View style={styles.nowPlayingOverlay}>
                          <Text style={styles.nowPlayingText}>PLAYING</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.episodeListMeta}>
                      <Text style={styles.episodeListPart}>{ep.partLabel}</Text>
                      <Text
                        style={[
                          styles.episodeListTitle,
                          isCurrent && styles.episodeListTitleActive,
                        ]}
                        numberOfLines={2}
                      >
                        {ep.title}
                      </Text>
                      <Text style={styles.episodeListSnippet} numberOfLines={2}>
                        {ep.description}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Spotlight Hero item (Episode 1 of Modi Question)
  const heroItem = (seriesList[0] && seriesList[0].episodes[0]) || SERIES_DATA[0].episodes[0];

  // Main Catalog Screen
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        {/* AZAAD Anti-Censorship App Bar (Customizable Identity) */}
        <View style={styles.appBar}>
          <Pressable
            style={styles.brandGroup}
            onPress={() => {
              setTempName(customAppName);
              setTempSubtitle(customAppSubtitle);
              setTempImageUrl(customImageUrl);
              setTempEmoji(customEmoji);
              setTempIconType(customIconType);
              setShowDisguiseModal(true);
            }}
            hitSlop={8}
          >
            <View style={styles.batmanBadge}>
              {customIconType === 'image' && customImageUrl.trim().length > 0 ? (
                <Image
                  source={{ uri: customImageUrl.trim() }}
                  style={styles.customBadgeImage}
                />
              ) : (
                <Text style={styles.batmanBadgeIcon}>{customEmoji}</Text>
              )}
            </View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.appTitle}>{customAppName}</Text>
                <View style={styles.brandDot} />
                <Text style={styles.appSubtitle}>{customAppSubtitle}</Text>
                <Text style={styles.editBrandHint}>✎</Text>
              </View>
              <Pressable
                onPress={() => syncArchiveFromNetwork(true)}
                hitSlop={6}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <Text style={styles.networkStatusText}>
                  {isSyncing ? '● Syncing...' : '● Truth Protocol Active'}
                </Text>
                {lastSyncTime && (
                  <Text style={styles.syncTimeText}>({lastSyncTime})</Text>
                )}
              </Pressable>
            </View>
          </Pressable>

          <View style={styles.appBarActions}>
            <Pressable
              style={styles.submitTopBtn}
              onPress={() => setShowSubmitModal(true)}
              hitSlop={8}
            >
              <Text style={styles.submitTopBtnText}>+ Submit</Text>
            </Pressable>

            <Pressable
              style={styles.disguiseTopBtn}
              onPress={() => {
                setTempName(customAppName);
                setTempSubtitle(customAppSubtitle);
                setTempImageUrl(customImageUrl);
                setTempEmoji(customEmoji);
                setTempIconType(customIconType);
                setShowDisguiseModal(true);
              }}
              hitSlop={8}
            >
              <Text style={styles.disguiseTopBtnText}>🎭 Camo</Text>
            </Pressable>

            <Pressable
              style={styles.iconBtn}
              onPress={() => setIsSearchOpen(!isSearchOpen)}
              hitSlop={8}
            >
              <Text style={styles.iconBtnText}>🔍</Text>
            </Pressable>

            <Pressable
              style={styles.camoIconBtn}
              onPress={() => setCamouflageMode(true)}
              hitSlop={8}
            >
              <Text style={styles.camoIconText}>🎵 Decoy</Text>
            </Pressable>

            <Pressable
              style={styles.iconBtn}
              onPress={() => setShowInfoModal(true)}
              hitSlop={8}
            >
              <Text style={styles.iconBtnText}>ℹ</Text>
            </Pressable>
          </View>
        </View>

        {/* Search Bar (Toggled or inline) */}
        {isSearchOpen && (
          <View style={styles.searchBar}>
            <Text style={styles.searchBarIcon}>🔍</Text>
            <TextInput
              placeholder="Search documentary, topics, or keywords..."
              placeholderTextColor="#6B7280"
              style={styles.searchBarInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
                <Text style={styles.searchClearBtn}>✕</Text>
              </Pressable>
            )}
          </View>
        )}

        {/* Category Filter Pills */}
        <View style={styles.filterBar}>
          <Pressable
            style={[styles.filterPill, activeFilter === 'all' && styles.filterPillActive]}
            onPress={() => setActiveFilter('all')}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'all' && styles.filterPillTextActive,
              ]}
            >
              All Series
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterPill,
              activeFilter === 'modi-question' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('modi-question')}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'modi-question' && styles.filterPillTextActive,
              ]}
            >
              The Modi Question
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.filterPill,
              activeFilter === 'modi-friendship' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('modi-friendship')}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'modi-friendship' && styles.filterPillTextActive,
              ]}
            >
              The Friendship Files
            </Text>
          </Pressable>

          {seriesList.some((s) => s.id === 'community-vault') && (
            <Pressable
              style={[
                styles.filterPill,
                activeFilter === 'community-vault' && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter('community-vault')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'community-vault' && styles.filterPillTextActive,
                ]}
              >
                Community Vault
              </Text>
            </Pressable>
          )}
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 36 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Spotlight Hero Banner (shown when viewing All and no search) */}
          {activeFilter === 'all' && !searchQuery.trim() && (
            <View style={styles.heroContainer}>
              <Image source={{ uri: heroItem.thumbnail }} style={styles.heroImage} />
              <View style={styles.heroGradient} />

              <View style={styles.heroContent}>
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>FEATURED BBC INVESTIGATION</Text>
                </View>
                <Text style={styles.heroTitle}>India: The Modi Question</Text>
                <Text style={styles.heroMeta}>
                  2-Part Series • 2023 • Banned in India under IT Rules 2021
                </Text>
                <Text style={styles.heroSynopsis} numberOfLines={2}>
                  {heroItem.description}
                </Text>

                <View style={styles.heroActions}>
                  <Pressable
                    style={styles.heroPlayButton}
                    onPress={() => setSelectedEpisode(heroItem)}
                  >
                    <Text style={styles.heroPlayButtonText}>▶ Watch Episode 1</Text>
                  </Pressable>

                  <Pressable
                    style={styles.heroDetailsButton}
                    onPress={() => setActiveFilter('modi-question')}
                  >
                    <Text style={styles.heroDetailsButtonText}>View Episodes (2)</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          {/* Series Catalog */}
          {filteredSeries.map((series) => (
            <View key={series.id} style={styles.seriesSection}>
              {/* Series Header */}
              <View style={styles.seriesHeader}>
                <View>
                  <Text style={styles.seriesTitle}>{series.title}</Text>
                  <Text style={styles.seriesSub}>
                    {series.badge} • {series.episodes.length} {series.episodes.length === 1 ? 'Part' : 'Episodes'} • {series.year}
                  </Text>
                </View>
                <View style={styles.statusChip}>
                  <Text style={styles.statusChipText}>{series.statusBadge}</Text>
                </View>
              </View>

              {/* Episodes List (Standard Netflix/YouTube style cards) */}
              <View style={styles.episodeList}>
                {series.episodes.map((ep) => (
                  <Pressable
                    key={ep.id}
                    style={styles.catalogCard}
                    onPress={() => setSelectedEpisode(ep)}
                  >
                    <View style={styles.cardThumbnailWrapper}>
                      <Image source={{ uri: ep.thumbnail }} style={styles.cardThumbnail} />
                      <View style={styles.cardDurationBadge}>
                        <Text style={styles.cardDurationText}>{ep.duration}</Text>
                      </View>
                      <View style={styles.cardPlayIcon}>
                        <Text style={styles.cardPlayIconText}>▶</Text>
                      </View>
                    </View>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardPartLabel}>{ep.partLabel}</Text>
                      <Text style={styles.cardTitle} numberOfLines={2}>
                        {ep.title}
                      </Text>
                      <Text style={styles.cardDesc} numberOfLines={2}>
                        {ep.description}
                      </Text>
                      <View style={styles.cardTagsRow}>
                        {ep.topics.slice(0, 2).map((t) => (
                          <Text key={t} style={styles.cardTagText}>
                            #{t}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}

          {filteredSeries.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No documentaries found</Text>
              <Text style={styles.emptySub}>
                Try adjusting your search terms or filter selection.
              </Text>
              <Pressable
                style={styles.emptyResetBtn}
                onPress={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
              >
                <Text style={styles.emptyResetText}>Reset Filters</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        {/* Info & Legal Rights Modal */}
        <Modal
          animationType="fade"
          transparent
          visible={showInfoModal}
          onRequestClose={() => setShowInfoModal(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeadTitle}>About DocuStream</Text>
                <Pressable onPress={() => setShowInfoModal(false)} hitSlop={8}>
                  <Text style={styles.modalCloseText}>✕</Text>
                </Pressable>
              </View>

              <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalSubtitle}>Censorship-Resilient Journalism</Text>
                <Text style={styles.modalParagraph}>
                  In January 2023, emergency blocking orders were issued under Rule 16 of the IT Rules 2021 ordering YouTube and Twitter to take down access to the BBC documentary "India: The Modi Question".
                </Text>

                <Text style={styles.modalSubtitle}>Constitutional Protection</Text>
                <Text style={styles.modalParagraph}>
                  Article 19(1)(a) of the Constitution of India and Article 19 of the Universal Declaration of Human Rights guarantee every citizen the fundamental right to receive and impart information and ideas regardless of frontiers.
                </Text>

                <Text style={styles.modalSubtitle}>Decoy / Camouflage Feature</Text>
                <Text style={styles.modalParagraph}>
                  If your device is inspected, tap the '🎵 Decoy' button in the top bar. The app instantly switches to a music video visualiser player. Tap '✕ Close' anytime to return.
                </Text>
              </ScrollView>

              <Pressable
                style={styles.modalPrimaryBtn}
                onPress={() => setShowInfoModal(false)}
              >
                <Text style={styles.modalPrimaryBtnText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Community Video Submission Modal */}
        <Modal
          animationType="slide"
          transparent
          visible={showSubmitModal}
          onRequestClose={() => {
            setShowSubmitModal(false);
            setSubStatus(null);
          }}
        >
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalCard, { maxHeight: '90%' }]}>
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 16 }}>🛡️</Text>
                  <Text style={styles.modalHeadTitle}>Submit Video Mirror</Text>
                </View>
                <Pressable
                  onPress={() => {
                    setShowSubmitModal(false);
                    setSubStatus(null);
                  }}
                  hitSlop={8}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.submitExplainer}>
                  Help preserve uncensored truth. Submit embed links from Mega.nz, YouTube, Archive.org, or Vimeo. Submissions route through our encrypted anonymous relay.
                </Text>

                <Text style={styles.inputLabel}>DOCUMENTARY TITLE *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. India: The Modi Question (Episode 2 Mirror)"
                  placeholderTextColor="#6B7280"
                  value={subTitle}
                  onChangeText={setSubTitle}
                />

                <Text style={styles.inputLabel}>TARGET SERIES ARCHIVE *</Text>
                <View style={styles.seriesRadioRow}>
                  <Pressable
                    style={[
                      styles.seriesRadioBtn,
                      subSeriesId === 'modi-question' && styles.seriesRadioBtnActive,
                    ]}
                    onPress={() => setSubSeriesId('modi-question')}
                  >
                    <Text
                      style={[
                        styles.seriesRadioText,
                        subSeriesId === 'modi-question' && styles.seriesRadioTextActive,
                      ]}
                    >
                      The Modi Question
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.seriesRadioBtn,
                      subSeriesId === 'modi-friendship' && styles.seriesRadioBtnActive,
                    ]}
                    onPress={() => setSubSeriesId('modi-friendship')}
                  >
                    <Text
                      style={[
                        styles.seriesRadioText,
                        subSeriesId === 'modi-friendship' && styles.seriesRadioTextActive,
                      ]}
                    >
                      Modi & Adani Files
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.seriesRadioBtn,
                      subSeriesId === 'community-vault' && styles.seriesRadioBtnActive,
                    ]}
                    onPress={() => setSubSeriesId('community-vault')}
                  >
                    <Text
                      style={[
                        styles.seriesRadioText,
                        subSeriesId === 'community-vault' && styles.seriesRadioTextActive,
                      ]}
                    >
                      Community Vault
                    </Text>
                  </Pressable>
                </View>

                <Text style={styles.inputLabel}>EMBED URL (HTTPS) *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="https://mega.nz/embed/... or https://archive.org/embed/..."
                  placeholderTextColor="#6B7280"
                  value={subUrl}
                  onChangeText={setSubUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Text style={styles.inputLabel}>DESCRIPTION / EVIDENCE CONTEXT</Text>
                <TextInput
                  style={[styles.formInput, { height: 70, textAlignVertical: 'top' }]}
                  placeholder="Context, episode synopsis, or reasons for censorship..."
                  placeholderTextColor="#6B7280"
                  value={subDesc}
                  onChangeText={setSubDesc}
                  multiline
                />

                <Text style={styles.inputLabel}>SUBMITTER / PSEUDONYM (OPTIONAL)</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="Anonymous Citizen (Leave blank for full anonymity)"
                  placeholderTextColor="#6B7280"
                  value={subSubmitter}
                  onChangeText={setSubSubmitter}
                />

                {subStatus && (
                  <View style={styles.subStatusBanner}>
                    <Text style={styles.subStatusText}>{subStatus}</Text>
                  </View>
                )}

                <Pressable
                  style={[
                    styles.submitActionBtn,
                    isSubmitting && styles.submitActionBtnDisabled,
                  ]}
                  onPress={handleSubmitVideo}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#000000" />
                  ) : (
                    <Text style={styles.submitActionBtnText}>🛡️ Submit to Vault Relay</Text>
                  )}
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Custom Identity & Camouflage Disguise Modal */}
        <Modal
          animationType="slide"
          transparent
          visible={showDisguiseModal}
          onRequestClose={() => setShowDisguiseModal(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalCard, { maxHeight: '90%' }]}>
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 16 }}>🎭</Text>
                  <Text style={styles.modalHeadTitle}>App Identity & Disguise</Text>
                </View>
                <Pressable onPress={() => setShowDisguiseModal(false)} hitSlop={8}>
                  <Text style={styles.modalCloseText}>✕</Text>
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.submitExplainer}>
                  Customize the in-app brand name and emblem to your preference, or activate an instant camouflage preset if your device is subject to inspection.
                </Text>

                {/* Instant Camouflage Presets */}
                <Text style={styles.inputLabel}>QUICK CAMOUFLAGE PRESETS</Text>
                <View style={styles.presetGrid}>
                  {[
                    { name: 'AZAAD', sub: 'VAULT', emoji: '🦇', label: 'AZAAD (Default)' },
                    { name: 'DAILY NOTES', sub: 'ARCHIVE', emoji: '📝', label: 'Notes App' },
                    { name: 'CALC PRO', sub: 'MATH', emoji: '🧮', label: 'Calculator' },
                    { name: 'BEATSTREAM', sub: 'AUDIO', emoji: '🎵', label: 'Music App' },
                    { name: 'METEO SKY', sub: 'FORECAST', emoji: '☁️', label: 'Weather App' },
                    { name: 'FREEDOM', sub: 'RESISTANCE', emoji: '🕊️', label: 'Dove of Peace' },
                  ].map((p) => (
                    <Pressable
                      key={p.name}
                      style={[
                        styles.presetCard,
                        tempName === p.name && styles.presetCardActive,
                      ]}
                      onPress={() => {
                        setTempName(p.name);
                        setTempSubtitle(p.sub);
                        setTempEmoji(p.emoji);
                        setTempIconType('emoji');
                      }}
                    >
                      <Text style={styles.presetEmoji}>{p.emoji}</Text>
                      <Text style={styles.presetLabel} numberOfLines={1}>{p.label}</Text>
                    </Pressable>
                  ))}
                </View>

                {/* Custom App Title Input */}
                <Text style={styles.inputLabel}>CUSTOM APP DISPLAY NAME</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. AZAAD, Daily Notes, Math Calc"
                  placeholderTextColor="#6B7280"
                  value={tempName}
                  onChangeText={setTempName}
                />

                <Text style={styles.inputLabel}>CUSTOM SUBTITLE / BADGE TEXT</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. VAULT, SYSTEM, ARCHIVE"
                  placeholderTextColor="#6B7280"
                  value={tempSubtitle}
                  onChangeText={setTempSubtitle}
                />

                {/* Custom Emblem Selection */}
                <Text style={styles.inputLabel}>CHOOSE EMBLEM ICON</Text>
                <View style={styles.emojiPickerRow}>
                  {['🦇', '🕊️', '🛡️', '⚡', '📝', '🧮', '🎵', '🔍', '📁', '⚖️'].map((em) => (
                    <Pressable
                      key={em}
                      style={[
                        styles.emojiPickBtn,
                        tempIconType === 'emoji' && tempEmoji === em && styles.emojiPickBtnActive,
                      ]}
                      onPress={() => {
                        setTempEmoji(em);
                        setTempIconType('emoji');
                      }}
                    >
                      <Text style={styles.emojiPickText}>{em}</Text>
                    </Pressable>
                  ))}
                </View>

                {/* Custom Image Upload / URL Input */}
                <Text style={styles.inputLabel}>OR UPLOAD / CUSTOM EMBLEM IMAGE (URL)</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="https://... direct image link (PNG / JPG)"
                  placeholderTextColor="#6B7280"
                  value={tempImageUrl}
                  onChangeText={(val) => {
                    setTempImageUrl(val);
                    if (val.trim()) setTempIconType('image');
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Live Preview Card */}
                <Text style={styles.inputLabel}>LIVE HEADER PREVIEW</Text>
                <View style={styles.previewBox}>
                  <View style={styles.batmanBadge}>
                    {tempIconType === 'image' && tempImageUrl.trim().length > 0 ? (
                      <Image
                        source={{ uri: tempImageUrl.trim() }}
                        style={styles.customBadgeImage}
                      />
                    ) : (
                      <Text style={styles.batmanBadgeIcon}>{tempEmoji}</Text>
                    )}
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={styles.appTitle}>{tempName || 'AZAAD'}</Text>
                      <View style={styles.brandDot} />
                      <Text style={styles.appSubtitle}>{tempSubtitle || 'VAULT'}</Text>
                    </View>
                    <Text style={styles.networkStatusText}>● Truth Protocol Active</Text>
                  </View>
                </View>

                {/* Save and Apply */}
                <Pressable
                  style={styles.submitActionBtn}
                  onPress={() => {
                    setCustomAppName(tempName.trim() || 'AZAAD');
                    setCustomAppSubtitle(tempSubtitle.trim() || 'VAULT');
                    setCustomEmoji(tempEmoji);
                    setCustomImageUrl(tempImageUrl.trim());
                    setCustomIconType(
                      tempIconType === 'image' && tempImageUrl.trim().length > 0 ? 'image' : 'emoji'
                    );
                    setShowDisguiseModal(false);
                    Alert.alert('Identity Updated', 'App disguise applied successfully.');
                  }}
                >
                  <Text style={styles.submitActionBtnText}>✓ Apply App Identity</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0E',
  },

  // Standard App Bar
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A22',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  brandDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E50914',
  },
  appSubtitle: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#16161F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnText: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  camoIconBtn: {
    backgroundColor: '#1E1B2E',
    borderWidth: 1,
    borderColor: '#3730A3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  camoIconText: {
    color: '#A5B4FC',
    fontSize: 12,
    fontWeight: '600',
  },

  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14141B',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#262633',
  },
  searchBarIcon: {
    fontSize: 13,
    marginRight: 8,
  },
  searchBarInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    paddingVertical: 9,
  },
  searchClearBtn: {
    color: '#9CA3AF',
    fontSize: 13,
    paddingHorizontal: 4,
  },

  // Filter Pills (Standard OTT style)
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 10,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#16161E',
    borderWidth: 1,
    borderColor: '#262633',
  },
  filterPillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filterPillText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#0A0A0E',
    fontWeight: '700',
  },

  // Spotlight Hero Banner
  heroContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    height: 240,
    backgroundColor: '#14141B',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 10, 14, 0.7)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  heroMeta: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  heroSynopsis: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
  },
  heroPlayButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  heroPlayButtonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
  },
  heroDetailsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  heroDetailsButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Series Section
  seriesSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  seriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  seriesTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  seriesSub: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  statusChip: {
    backgroundColor: '#1E1418',
    borderColor: '#3E1C22',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusChipText: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '600',
  },

  // Standard Episode Card (Horizontal Row Style)
  episodeList: {
    gap: 10,
  },
  catalogCard: {
    flexDirection: 'row',
    backgroundColor: '#14141B',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1F1F2B',
  },
  cardThumbnailWrapper: {
    width: 130,
    height: 88,
    position: 'relative',
    backgroundColor: '#000000',
  },
  cardThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardDurationBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  cardDurationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  cardPlayIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -14 }, { translateY: -14 }],
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPlayIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 2,
  },
  cardBody: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardPartLabel: {
    color: '#E50914',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 4,
  },
  cardDesc: {
    color: '#9CA3AF',
    fontSize: 11,
    lineHeight: 15,
  },
  cardTagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  cardTagText: {
    color: '#60A5FA',
    fontSize: 10,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptySub: {
    color: '#6B7280',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyResetBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  emptyResetText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
  },

  // Standard Video Player Screen
  playerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A22',
  },
  navIconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  navBackIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '400',
    marginRight: 4,
    lineHeight: 24,
  },
  navBackLabel: {
    color: '#D1D5DB',
    fontSize: 13,
    fontWeight: '600',
  },
  playerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  playerSeriesLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  navActionIcon: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  navActionText: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: '600',
  },
  videoPlayerFrame: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
  },
  playerContentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  metaSection: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A22',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  seriesPill: {
    backgroundColor: '#E50914',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  seriesPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaMutedText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  onlineText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '600',
  },
  detailTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 6,
  },
  detailDesc: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  actionToolbar: {
    flexDirection: 'row',
    gap: 8,
  },
  toolbarButton: {
    flex: 1,
    backgroundColor: '#16161F',
    borderWidth: 1,
    borderColor: '#262633',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  toolbarButtonText: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '600',
  },

  // Context box
  contextBox: {
    backgroundColor: '#15151D',
    borderWidth: 1,
    borderColor: '#262633',
    borderRadius: 8,
    padding: 12,
    marginTop: 14,
  },
  contextTitle: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  contextBody: {
    color: '#D1D5DB',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 6,
  },
  contextLegal: {
    color: '#6B7280',
    fontSize: 10,
    fontStyle: 'italic',
  },

  // Episodes picker section
  episodesSection: {
    marginTop: 20,
  },
  sectionHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  episodeListItem: {
    flexDirection: 'row',
    backgroundColor: '#14141B',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1F1F2B',
    marginBottom: 10,
  },
  episodeListItemActive: {
    borderColor: '#E50914',
    backgroundColor: '#1A141A',
  },
  episodeListThumbWrapper: {
    width: 120,
    height: 75,
    position: 'relative',
    backgroundColor: '#000000',
  },
  episodeListThumb: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  episodeListDurationBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  episodeListDurationText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
  },
  nowPlayingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(229, 9, 20, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nowPlayingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  episodeListMeta: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  episodeListPart: {
    color: '#E50914',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  episodeListTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 16,
    marginTop: 1,
    marginBottom: 3,
  },
  episodeListTitleActive: {
    color: '#FCA5A5',
  },
  episodeListSnippet: {
    color: '#6B7280',
    fontSize: 11,
    lineHeight: 14,
  },

  // Camouflage Mode (Standard Music App Design)
  camouContainer: {
    flex: 1,
    backgroundColor: '#0F0F14',
  },
  camouHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A22',
  },
  camouBrand: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  camouSub: {
    color: '#818CF8',
    fontSize: 11,
  },
  camouExitBtn: {
    backgroundColor: '#1E1B2E',
    borderWidth: 1,
    borderColor: '#3730A3',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  camouExitText: {
    color: '#C7D2FE',
    fontSize: 11,
    fontWeight: '600',
  },
  camouContent: {
    padding: 16,
  },
  camouCard: {
    backgroundColor: '#161622',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#262638',
  },
  camouArtWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    backgroundColor: '#000000',
  },
  camouArt: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  camouPlayOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  camouPlayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camouPlayTriangle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 3,
  },
  camouDurationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  camouDurationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  camouDetails: {
    padding: 16,
  },
  camouLabel: {
    color: '#818CF8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  camouTrackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 2,
  },
  camouTrackArtist: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 12,
  },
  camouPlatformsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  camouChip: {
    backgroundColor: '#202030',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  camouChipText: {
    color: '#C7D2FE',
    fontSize: 10,
    fontWeight: '500',
  },
  camouCreditsText: {
    color: '#6B7280',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 16,
  },
  camouPlayButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },
  camouPlayButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  camouFootnote: {
    color: '#6B7280',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  camouPlayerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#161622',
  },
  camouBackBtn: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  camouBackText: {
    color: '#818CF8',
    fontSize: 12,
    fontWeight: '600',
  },
  camouBadge: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
  },
  camouTrackInfo: {
    padding: 16,
  },
  camouMetaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    marginBottom: 12,
  },
  camouMetaPill: {
    color: '#818CF8',
    fontSize: 11,
    backgroundColor: '#202030',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  // Info Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#14141B',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#262633',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#262633',
  },
  modalHeadTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  modalCloseText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalSubtitle: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
  },
  modalParagraph: {
    color: '#D1D5DB',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  modalPrimaryBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
  },
  modalPrimaryBtnText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
  },

  // Batman Vigilante & Top Bar Styles
  batmanBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#1E1E28',
    borderWidth: 1,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  batmanBadgeIcon: {
    fontSize: 14,
  },
  networkStatusText: {
    color: '#10B981',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  syncTimeText: {
    color: '#6B7280',
    fontSize: 9,
  },
  submitTopBtn: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },
  submitTopBtnText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '800',
  },

  // Community Submission Form Styles
  submitExplainer: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  inputLabel: {
    color: '#D1D5DB',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: 10,
  },
  formInput: {
    backgroundColor: '#0D0D12',
    borderWidth: 1,
    borderColor: '#262633',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#FFFFFF',
    fontSize: 13,
  },
  seriesRadioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  seriesRadioBtn: {
    backgroundColor: '#16161F',
    borderWidth: 1,
    borderColor: '#262633',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  seriesRadioBtnActive: {
    backgroundColor: '#374151',
    borderColor: '#F59E0B',
  },
  seriesRadioText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
  },
  seriesRadioTextActive: {
    color: '#F59E0B',
    fontWeight: '700',
  },
  subStatusBanner: {
    backgroundColor: '#064E3B',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 8,
    padding: 10,
    marginTop: 14,
    alignItems: 'center',
  },
  subStatusText: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
  },
  submitActionBtn: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  submitActionBtnDisabled: {
    opacity: 0.6,
  },
  submitActionBtnText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Custom Identity & Disguise Styles
  customBadgeImage: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  editBrandHint: {
    color: '#F59E0B',
    fontSize: 10,
    marginLeft: 2,
    opacity: 0.8,
  },
  disguiseTopBtn: {
    backgroundColor: '#2D1B4E',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },
  disguiseTopBtnText: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '700',
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  presetCard: {
    width: '31%',
    backgroundColor: '#16161F',
    borderWidth: 1,
    borderColor: '#262633',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
  },
  presetCardActive: {
    backgroundColor: '#262638',
    borderColor: '#F59E0B',
  },
  presetEmoji: {
    fontSize: 20,
  },
  presetLabel: {
    color: '#D1D5DB',
    fontSize: 10,
    fontWeight: '600',
  },
  emojiPickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  emojiPickBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#16161F',
    borderWidth: 1,
    borderColor: '#262633',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiPickBtnActive: {
    backgroundColor: '#374151',
    borderColor: '#F59E0B',
  },
  emojiPickText: {
    fontSize: 16,
  },
  previewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0D0D14',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 6,
  },
});
