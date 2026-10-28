import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PresetDisguise } from '../../types';

interface DisguiseModalProps {
  visible: boolean;
  onClose: () => void;
  currentName: string;
  currentSubtitle: string;
  currentEmoji: string;
  currentImageUrl: string;
  currentIconType: 'emoji' | 'image';
  onApply: (params: {
    name: string;
    subtitle: string;
    emoji: string;
    imageUrl: string;
    iconType: 'emoji' | 'image';
  }) => void;
}

const PRESET_DISGUISES: PresetDisguise[] = [
  { name: 'AZAAD', subtitle: 'VAULT', emoji: '🦇', label: 'Default Vault' },
  { name: 'NOTES', subtitle: 'OFFLINE', emoji: '📝', label: 'Quick Notes' },
  { name: 'CALC', subtitle: 'TOOLS', emoji: '🧮', label: 'Calculator' },
  { name: 'WEATHER', subtitle: 'LOCAL', emoji: '⛅', label: 'Weather App' },
  { name: 'AUDIO', subtitle: 'PLAYER', emoji: '🎧', label: 'Music Player' },
  { name: 'WALLET', subtitle: 'SECURE', emoji: '💳', label: 'Finance Disguise' },
];

const PRESET_EMOJIS = ['🦇', '📝', '🧮', '⛅', '🎧', '💳', '📁', '⚙️', '🔍', '📊'];

export const DisguiseModal: React.FC<DisguiseModalProps> = ({
  visible,
  onClose,
  currentName,
  currentSubtitle,
  currentEmoji,
  currentImageUrl,
  currentIconType,
  onApply,
}) => {
  const [tempName, setTempName] = useState(currentName);
  const [tempSubtitle, setTempSubtitle] = useState(currentSubtitle);
  const [tempEmoji, setTempEmoji] = useState(currentEmoji);
  const [tempImageUrl, setTempImageUrl] = useState(currentImageUrl);
  const [tempIconType, setTempIconType] = useState<'emoji' | 'image'>(currentIconType);

  // Sync internal state when opened
  React.useEffect(() => {
    if (visible) {
      setTempName(currentName);
      setTempSubtitle(currentSubtitle);
      setTempEmoji(currentEmoji);
      setTempImageUrl(currentImageUrl);
      setTempIconType(currentIconType);
    }
  }, [visible, currentName, currentSubtitle, currentEmoji, currentImageUrl, currentIconType]);

  const handleApply = () => {
    onApply({
      name: tempName.trim() || 'AZAAD',
      subtitle: tempSubtitle.trim() || 'VAULT',
      emoji: tempEmoji,
      imageUrl: tempImageUrl.trim(),
      iconType: tempIconType === 'image' && tempImageUrl.trim().length > 0 ? 'image' : 'emoji',
    });
    onClose();
    Alert.alert('Identity Applied', 'App disguise & stealth camouflage updated.');
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={{ fontSize: 16 }}>🎭</Text>
              <Text style={styles.headTitle}>App Disguise & Identity</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={8}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.explainer}>
              Change how the app looks on your device for privacy during physical inspections. All settings apply instantly.
            </Text>

            {/* Quick Presets */}
            <Text style={styles.label}>QUICK PRESETS</Text>
            <View style={styles.presetGrid}>
              {PRESET_DISGUISES.map((preset) => (
                <Pressable
                  key={preset.name}
                  style={[
                    styles.presetCard,
                    tempName === preset.name && styles.presetCardActive,
                  ]}
                  onPress={() => {
                    setTempName(preset.name);
                    setTempSubtitle(preset.subtitle);
                    setTempEmoji(preset.emoji);
                    setTempIconType('emoji');
                  }}
                >
                  <Text style={styles.presetEmoji}>{preset.emoji}</Text>
                  <Text style={styles.presetLabel}>{preset.label}</Text>
                </Pressable>
              ))}
            </View>

            {/* Custom App Name & Subtitle */}
            <Text style={styles.label}>APP TITLE</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. AZAAD, NOTES, CALC"
              placeholderTextColor="#6B7280"
              value={tempName}
              onChangeText={setTempName}
              maxLength={16}
            />

            <Text style={styles.label}>APP SUBTITLE / CATEGORY</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. VAULT, SECURE, OFFLINE"
              placeholderTextColor="#6B7280"
              value={tempSubtitle}
              onChangeText={setTempSubtitle}
              maxLength={16}
            />

            {/* Icon Type Selection */}
            <Text style={styles.label}>APP EMBLEM ICON</Text>
            <View style={styles.toggleRow}>
              <Pressable
                style={[styles.toggleBtn, tempIconType === 'emoji' && styles.toggleBtnActive]}
                onPress={() => setTempIconType('emoji')}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    tempIconType === 'emoji' && styles.toggleBtnTextActive,
                  ]}
                >
                  Emoji Icon
                </Text>
              </Pressable>
              <Pressable
                style={[styles.toggleBtn, tempIconType === 'image' && styles.toggleBtnActive]}
                onPress={() => setTempIconType('image')}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    tempIconType === 'image' && styles.toggleBtnTextActive,
                  ]}
                >
                  Custom Image URL
                </Text>
              </Pressable>
            </View>

            {tempIconType === 'emoji' ? (
              <View style={styles.emojiPickerRow}>
                {PRESET_EMOJIS.map((e) => (
                  <Pressable
                    key={e}
                    style={[styles.emojiPickBtn, tempEmoji === e && styles.emojiPickBtnActive]}
                    onPress={() => setTempEmoji(e)}
                  >
                    <Text style={styles.emojiPickText}>{e}</Text>
                  </Pressable>
                ))}
              </View>
            ) : (
              <TextInput
                style={[styles.input, { marginBottom: 10 }]}
                placeholder="https://... image URL (png/jpg)"
                placeholderTextColor="#6B7280"
                value={tempImageUrl}
                onChangeText={setTempImageUrl}
                autoCapitalize="none"
              />
            )}

            {/* Live Preview */}
            <Text style={styles.label}>LIVE APP BAR PREVIEW</Text>
            <View style={styles.previewBox}>
              <View style={styles.previewBadge}>
                {tempIconType === 'image' && tempImageUrl.trim().length > 0 ? (
                  <Image source={{ uri: tempImageUrl.trim() }} style={styles.previewImage} />
                ) : (
                  <Text style={styles.previewEmoji}>{tempEmoji}</Text>
                )}
              </View>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={styles.previewTitle}>{tempName || 'AZAAD'}</Text>
                  <View style={styles.previewDot} />
                  <Text style={styles.previewSubtitle}>{tempSubtitle || 'VAULT'}</Text>
                </View>
                <Text style={styles.previewStatus}>● Truth Protocol Active</Text>
              </View>
            </View>

            {/* Save and Apply */}
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>✓ Apply App Identity</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#151522',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#262638',
    width: '100%',
    maxWidth: 440,
    maxHeight: '90%',
    padding: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#242434',
    paddingBottom: 12,
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  closeText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '700',
    padding: 4,
  },
  explainer: {
    color: '#9CA3AF',
    fontSize: 11.5,
    lineHeight: 17,
    marginBottom: 12,
  },
  label: {
    color: '#D1D5DB',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: 8,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  presetCard: {
    width: '31%',
    backgroundColor: '#12121B',
    borderWidth: 1,
    borderColor: '#242434',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
  },
  presetCardActive: {
    backgroundColor: '#1F2937',
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
  input: {
    backgroundColor: '#0D0D14',
    borderWidth: 1,
    borderColor: '#262638',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#12121B',
    borderWidth: 1,
    borderColor: '#242434',
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#1F2937',
    borderColor: '#60A5FA',
  },
  toggleBtnText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
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
    backgroundColor: '#12121B',
    borderWidth: 1,
    borderColor: '#242434',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiPickBtnActive: {
    backgroundColor: '#1F2937',
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
    borderColor: '#262638',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 6,
  },
  previewBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#151520',
    borderWidth: 1,
    borderColor: '#262638',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewEmoji: {
    fontSize: 18,
  },
  previewTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  previewDot: {
    width: 3.5,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#E50914',
  },
  previewSubtitle: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  previewStatus: {
    color: '#10B981',
    fontSize: 9.5,
    fontWeight: '600',
    marginTop: 2,
  },
  applyButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  applyButtonText: {
    color: '#0A0A0E',
    fontSize: 13,
    fontWeight: '800',
  },
});
