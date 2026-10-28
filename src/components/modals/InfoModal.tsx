import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headTitle}>About AZAAD Archive</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.subtitle}>Censorship-Resilient Journalism</Text>
            <Text style={styles.paragraph}>
              In January 2023, emergency blocking orders were issued under Rule 16 of the IT Rules 2021 ordering platforms to take down access to investigative documentaries including "India: The Modi Question".
            </Text>

            <Text style={styles.subtitle}>Constitutional Protection</Text>
            <Text style={styles.paragraph}>
              Article 19(1)(a) of the Constitution of India and Article 19 of the Universal Declaration of Human Rights guarantee every citizen the fundamental right to receive and impart information and ideas regardless of frontiers.
            </Text>

            <Text style={styles.subtitle}>Decoy / Camouflage Feature</Text>
            <Text style={styles.paragraph}>
              If your device is inspected, tap the '🎵' decoy button in the top bar. The app instantly transforms into a discreet music visualizer player.
            </Text>

            <Text style={styles.subtitle}>Dynamic Content Architecture</Text>
            <Text style={styles.paragraph}>
              The archive pulls verified mirrors and investigative documentaries dynamically from our decentralized repository without needing Google Play / app updates.
            </Text>
          </ScrollView>

          <Pressable style={styles.primaryBtn} onPress={onClose}>
            <Text style={styles.primaryBtnText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#161622',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#262638',
    width: '100%',
    maxWidth: 420,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#242434',
    paddingBottom: 10,
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
  subtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
  },
  paragraph: {
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  primaryBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  primaryBtnText: {
    color: '#0A0A0E',
    fontWeight: '800',
    fontSize: 13,
  },
});
