import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CategoryFilter } from './src/components/CategoryFilter';
import { DecoyScreen } from './src/components/DecoyScreen';
import { Header } from './src/components/Header';
import { HeroBanner } from './src/components/HeroBanner';
import { DisguiseModal } from './src/components/modals/DisguiseModal';
import { InfoModal } from './src/components/modals/InfoModal';
import { SubmitModal } from './src/components/modals/SubmitModal';
import { SearchBar } from './src/components/SearchBar';
import { SeriesSection } from './src/components/SeriesSection';
import { VideoPlayerView } from './src/components/VideoPlayerView';
import { CategoryFilterType, Episode, Series } from './src/types';

export { Episode, Series };

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

// Endpoints
const CLOUDFLARE_RELAY_URL = 'https://soft-glade-bb8e.aniversesbs.workers.dev';
const GITHUB_RAW_CONTENT_URL =
  'https://raw.githubusercontent.com/Uncensored-dev/Azaad/main/content.json';

export default function App() {
  const [seriesList, setSeriesList] = useState<Series[]>(SERIES_DATA);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [activeFilter, setActiveFilter] = useState<CategoryFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [camouflageMode, setCamouflageMode] = useState(false);
  const [camouPlaying, setCamouPlaying] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDisguiseModal, setShowDisguiseModal] = useState(false);

  // App Identity Customization State
  const [customAppName, setCustomAppName] = useState('AZAAD');
  const [customAppSubtitle, setCustomAppSubtitle] = useState('VAULT');
  const [customIconType, setCustomIconType] = useState<'emoji' | 'image'>('emoji');
  const [customEmoji, setCustomEmoji] = useState('🦇');
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Hardware Back Press Navigation
  useEffect(() => {
    const handleHardwareBack = () => {
      if (showDisguiseModal) {
        setShowDisguiseModal(false);
        return true;
      }
      if (showSubmitModal) {
        setShowSubmitModal(false);
        return true;
      }
      if (showInfoModal) {
        setShowInfoModal(false);
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
      return false;
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
          setLastSyncTime(
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          );
          if (showFeedback) {
            Alert.alert('Archive Synchronized', 'Loaded latest verified investigative mirrors.');
          }
        }
      }
    } catch {
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

  // Safe Camouflage / Decoy Mode
  if (camouflageMode) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
          <DecoyScreen
            decoyDoc={DECOY_DOC}
            isPlaying={camouPlaying}
            onSetPlaying={setCamouPlaying}
            onExit={() => {
              setCamouflageMode(false);
              setCamouPlaying(false);
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Active Video Player Screen
  if (selectedEpisode) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
          <VideoPlayerView
            episode={selectedEpisode}
            seriesList={seriesList}
            onBack={() => setSelectedEpisode(null)}
            onShare={handleShare}
            onSelectEpisode={setSelectedEpisode}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const heroItem = (seriesList[0] && seriesList[0].episodes[0]) || SERIES_DATA[0].episodes[0];

  // Main Catalog Screen
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        {/* Standardized Upper Header */}
        <Header
          customAppName={customAppName}
          customAppSubtitle={customAppSubtitle}
          customIconType={customIconType}
          customEmoji={customEmoji}
          customImageUrl={customImageUrl}
          isSyncing={isSyncing}
          lastSyncTime={lastSyncTime}
          isSearchOpen={isSearchOpen}
          onOpenDisguise={() => setShowDisguiseModal(true)}
          onSync={() => syncArchiveFromNetwork(true)}
          onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
          onOpenSubmit={() => setShowSubmitModal(true)}
          onTriggerDecoy={() => setCamouflageMode(true)}
          onOpenInfo={() => setShowInfoModal(true)}
        />

        {/* Search Bar Input (Toggled) */}
        {isSearchOpen && (
          <SearchBar
            query={searchQuery}
            onChangeQuery={setSearchQuery}
            onClose={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
          />
        )}

        {/* Category Filter Pills (Horizontal OTT Scroller) */}
        <CategoryFilter
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          seriesList={seriesList}
        />

        {/* Catalog Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Spotlight Hero Banner */}
          {activeFilter === 'all' && !searchQuery.trim() && (
            <HeroBanner
              heroItem={heroItem}
              onPlay={setSelectedEpisode}
              onViewSeries={() => setActiveFilter('modi-question')}
            />
          )}

          {/* Series Sections */}
          {filteredSeries.map((series) => (
            <SeriesSection
              key={series.id}
              series={series}
              onSelectEpisode={setSelectedEpisode}
            />
          ))}

          {/* Empty Search / Filter State */}
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

        {/* Community Submission Modal */}
        <SubmitModal
          visible={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          relayUrl={CLOUDFLARE_RELAY_URL}
        />

        {/* App Disguise & Custom Identity Modal */}
        <DisguiseModal
          visible={showDisguiseModal}
          onClose={() => setShowDisguiseModal(false)}
          currentName={customAppName}
          currentSubtitle={customAppSubtitle}
          currentEmoji={customEmoji}
          currentImageUrl={customImageUrl}
          currentIconType={customIconType}
          onApply={({ name, subtitle, emoji, imageUrl, iconType }) => {
            setCustomAppName(name);
            setCustomAppSubtitle(subtitle);
            setCustomEmoji(emoji);
            setCustomImageUrl(imageUrl);
            setCustomIconType(iconType);
          }}
        />

        {/* About & Censorship Record Modal */}
        <InfoModal
          visible={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0E',
  },
  scrollContent: {
    paddingBottom: 36,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptySub: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  emptyResetBtn: {
    backgroundColor: '#1E1E28',
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyResetText: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '700',
  },
});
