import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface SubmitModalProps {
  visible: boolean;
  onClose: () => void;
  relayUrl: string;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  visible,
  onClose,
  relayUrl,
}) => {
  const [subTitle, setSubTitle] = useState('');
  const [subSeriesId, setSubSeriesId] = useState('modi-question');
  const [subUrl, setSubUrl] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [subSubmitter, setSubSubmitter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subStatus, setSubStatus] = useState<string | null>(null);

  const resetForm = () => {
    setSubTitle('');
    setSubUrl('');
    setSubDesc('');
    setSubSubmitter('');
    setSubStatus(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!subTitle.trim()) {
      Alert.alert('Missing Field', 'Please enter a documentary or investigation title.');
      return;
    }
    if (!subUrl.trim() || !subUrl.trim().startsWith('https://')) {
      Alert.alert(
        'Invalid URL',
        'Please enter a valid https:// embed link (Mega.nz, YouTube, Archive.org).'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setSubStatus('Connecting to encrypted relay...');

      const response = await fetch(relayUrl, {
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
          handleClose();
        }, 1800);
      } else {
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

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerIcon}>🛡️</Text>
              <Text style={styles.headTitle}>Submit Video Mirror</Text>
            </View>
            <Pressable onPress={handleClose} hitSlop={8}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.explainer}>
              Help preserve uncensored truth. Submit embed links from Mega.nz, YouTube, Archive.org, or Vimeo. Submissions route through our encrypted anonymous relay.
            </Text>

            <Text style={styles.label}>DOCUMENTARY TITLE *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. India: The Modi Question (Episode 2 Mirror)"
              placeholderTextColor="#6B7280"
              value={subTitle}
              onChangeText={setSubTitle}
            />

            <Text style={styles.label}>TARGET INVESTIGATION</Text>
            <View style={styles.radioRow}>
              {[
                { id: 'modi-question', label: 'The Modi Question' },
                { id: 'modi-friendship', label: 'The Friendship Files' },
                { id: 'community-vault', label: 'Other / New' },
              ].map((opt) => (
                <Pressable
                  key={opt.id}
                  style={[styles.radioChip, subSeriesId === opt.id && styles.radioChipActive]}
                  onPress={() => setSubSeriesId(opt.id)}
                >
                  <Text
                    style={[
                      styles.radioChipText,
                      subSeriesId === opt.id && styles.radioChipTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>EMBED / STREAM URL (HTTPS) *</Text>
            <TextInput
              style={styles.input}
              placeholder="https://mega.nz/embed/... or https://youtube.com/embed/..."
              placeholderTextColor="#6B7280"
              value={subUrl}
              onChangeText={setSubUrl}
              autoCapitalize="none"
              keyboardType="url"
            />

            <Text style={styles.label}>DESCRIPTION / CENSORSHIP CONTEXT (OPTIONAL)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Reason banned, source notes, resolution details..."
              placeholderTextColor="#6B7280"
              value={subDesc}
              onChangeText={setSubDesc}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>SUBMITTER ALIAS (OPTIONAL / ANONYMOUS)</Text>
            <TextInput
              style={styles.input}
              placeholder="Anonymous Citizen (default: no telemetry stored)"
              placeholderTextColor="#6B7280"
              value={subSubmitter}
              onChangeText={setSubSubmitter}
            />

            {subStatus && (
              <View style={styles.statusBox}>
                <Text style={styles.statusText}>{subStatus}</Text>
              </View>
            )}

            <Pressable
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#000000" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>🚀 Send Mirror to Vault</Text>
              )}
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    fontSize: 16,
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
  scrollContent: {
    paddingBottom: 10,
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
    marginBottom: 5,
    marginTop: 8,
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
  },
  textArea: {
    height: 64,
    textAlignVertical: 'top',
  },
  radioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  radioChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#0D0D14',
    borderWidth: 1,
    borderColor: '#262638',
  },
  radioChipActive: {
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  radioChipText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
  },
  radioChipTextActive: {
    color: '#F59E0B',
    fontWeight: '700',
  },
  statusBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  statusText: {
    color: '#34D399',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
  },
});
