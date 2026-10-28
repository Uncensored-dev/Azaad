import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface SearchBarProps {
  query: string;
  onChangeQuery: (text: string) => void;
  onClose: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChangeQuery,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        placeholder="Search documentary, topics, or keywords..."
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={query}
        onChangeText={onChangeQuery}
        autoFocus
        returnKeyType="search"
      />
      {query.length > 0 && (
        <Pressable onPress={() => onChangeQuery('')} hitSlop={8} style={styles.iconButton}>
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      )}
      <Pressable onPress={onClose} hitSlop={8} style={styles.closeButton}>
        <Text style={styles.closeText}>Done</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12121B',
    borderRadius: 10,
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#262638',
  },
  searchIcon: {
    fontSize: 13,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    paddingVertical: 9,
  },
  iconButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  clearText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  closeButton: {
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#1F2937',
    borderRadius: 6,
  },
  closeText: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: '700',
  },
});
