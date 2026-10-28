import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface HeaderProps {
  customAppName: string;
  customAppSubtitle: string;
  customIconType: 'emoji' | 'image';
  customEmoji: string;
  customImageUrl: string;
  isSyncing: boolean;
  lastSyncTime: string | null;
  isSearchOpen: boolean;
  onOpenDisguise: () => void;
  onSync: () => void;
  onToggleSearch: () => void;
  onOpenSubmit: () => void;
  onTriggerDecoy: () => void;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  customAppName,
  customAppSubtitle,
  customIconType,
  customEmoji,
  customImageUrl,
  isSyncing,
  lastSyncTime,
  isSearchOpen,
  onOpenDisguise,
  onSync,
  onToggleSearch,
  onOpenSubmit,
  onTriggerDecoy,
  onOpenInfo,
}) => {
  return (
    <View style={styles.header}>
      {/* Brand Identity Group (Tappable for Disguise Settings) */}
      <Pressable
        style={styles.brandGroup}
        onPress={onOpenDisguise}
        hitSlop={6}
        accessibilityLabel="App Identity Settings"
        accessibilityRole="button"
      >
        <View style={styles.brandBadge}>
          {customIconType === 'image' && customImageUrl.trim().length > 0 ? (
            <Image
              source={{ uri: customImageUrl.trim() }}
              style={styles.badgeImage}
            />
          ) : (
            <Text style={styles.badgeEmoji}>{customEmoji}</Text>
          )}
        </View>

        <View style={styles.brandTextContainer}>
          <View style={styles.brandTitleRow}>
            <Text style={styles.appTitle} numberOfLines={1}>
              {customAppName}
            </Text>
            <View style={styles.brandDot} />
            <Text style={styles.appSubtitle} numberOfLines={1}>
              {customAppSubtitle}
            </Text>
          </View>

          <Pressable
            onPress={onSync}
            hitSlop={6}
            style={styles.statusRow}
            accessibilityLabel="Sync Archive Status"
          >
            <View style={[styles.statusIndicator, isSyncing && styles.statusIndicatorSyncing]} />
            <Text style={styles.statusText}>
              {isSyncing ? 'Syncing...' : 'Protocol Active'}
            </Text>
            {lastSyncTime && !isSyncing && (
              <Text style={styles.syncTime}>({lastSyncTime})</Text>
            )}
          </Pressable>
        </View>
      </Pressable>

      {/* Standardized Action Buttons Bar */}
      <View style={styles.actionsBar}>
        {/* Search Action */}
        <Pressable
          style={[styles.actionBtn, isSearchOpen && styles.actionBtnActive]}
          onPress={onToggleSearch}
          hitSlop={6}
          accessibilityLabel="Search documentaries"
        >
          <Text style={[styles.actionIcon, isSearchOpen && styles.actionIconActive]}>🔍</Text>
        </Pressable>

        {/* Submit Mirror Action */}
        <Pressable
          style={[styles.actionBtn, styles.actionBtnAmber]}
          onPress={onOpenSubmit}
          hitSlop={6}
          accessibilityLabel="Submit Video Mirror"
        >
          <Text style={styles.actionIconPlus}>+</Text>
        </Pressable>

        {/* Camouflage / Disguise Settings */}
        <Pressable
          style={[styles.actionBtn, styles.actionBtnPurple]}
          onPress={onOpenDisguise}
          hitSlop={6}
          accessibilityLabel="Camouflage & Disguise Settings"
        >
          <Text style={styles.actionIcon}>🎭</Text>
        </Pressable>

        {/* Panic Decoy Switch */}
        <Pressable
          style={[styles.actionBtn, styles.actionBtnBlue]}
          onPress={onTriggerDecoy}
          hitSlop={6}
          accessibilityLabel="Decoy Player Panic Mode"
        >
          <Text style={styles.actionIcon}>🎵</Text>
        </Pressable>

        {/* About & Info */}
        <Pressable
          style={styles.actionBtn}
          onPress={onOpenInfo}
          hitSlop={6}
          accessibilityLabel="Archive Information and Constitutional Rights"
        >
          <Text style={styles.actionIconMuted}>ℹ</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#171722',
    backgroundColor: '#0A0A0E',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    flexShrink: 1,
  },
  brandBadge: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#151520',
    borderWidth: 1,
    borderColor: '#262638',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  badgeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeEmoji: {
    fontSize: 20,
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  brandDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#E50914',
  },
  appSubtitle: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.9,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusIndicatorSyncing: {
    backgroundColor: '#F59E0B',
  },
  statusText: {
    color: '#10B981',
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  syncTime: {
    color: '#6B7280',
    fontSize: 8.5,
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtn: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#14141E',
    borderWidth: 1,
    borderColor: '#242434',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnActive: {
    backgroundColor: '#1F2937',
    borderColor: '#3B82F6',
  },
  actionBtnAmber: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  actionBtnPurple: {
    borderColor: 'rgba(167, 139, 250, 0.35)',
    backgroundColor: 'rgba(167, 139, 250, 0.08)',
  },
  actionBtnBlue: {
    borderColor: 'rgba(96, 165, 250, 0.35)',
    backgroundColor: 'rgba(96, 165, 250, 0.08)',
  },
  actionIcon: {
    fontSize: 13,
  },
  actionIconActive: {
    fontSize: 13,
  },
  actionIconPlus: {
    color: '#F59E0B',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  actionIconMuted: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '700',
  },
});
