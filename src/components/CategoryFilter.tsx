import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { CategoryFilterType, Series } from '../types';

interface CategoryFilterProps {
  activeFilter: CategoryFilterType;
  onSelectFilter: (filter: CategoryFilterType) => void;
  seriesList: Series[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeFilter,
  onSelectFilter,
  seriesList,
}) => {
  const hasCommunityVault = seriesList.some((s) => s.id === 'community-vault');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Pressable
        style={[styles.pill, activeFilter === 'all' && styles.pillActive]}
        onPress={() => onSelectFilter('all')}
        hitSlop={4}
      >
        <Text style={[styles.pillText, activeFilter === 'all' && styles.pillTextActive]}>
          All Series
        </Text>
      </Pressable>

      <Pressable
        style={[styles.pill, activeFilter === 'modi-question' && styles.pillActive]}
        onPress={() => onSelectFilter('modi-question')}
        hitSlop={4}
      >
        <Text
          style={[styles.pillText, activeFilter === 'modi-question' && styles.pillTextActive]}
        >
          The Modi Question
        </Text>
      </Pressable>

      <Pressable
        style={[styles.pill, activeFilter === 'modi-friendship' && styles.pillActive]}
        onPress={() => onSelectFilter('modi-friendship')}
        hitSlop={4}
      >
        <Text
          style={[styles.pillText, activeFilter === 'modi-friendship' && styles.pillTextActive]}
        >
          The Friendship Files
        </Text>
      </Pressable>

      {hasCommunityVault && (
        <Pressable
          style={[styles.pill, activeFilter === 'community-vault' && styles.pillActive]}
          onPress={() => onSelectFilter('community-vault')}
          hitSlop={4}
        >
          <Text
            style={[styles.pillText, activeFilter === 'community-vault' && styles.pillTextActive]}
          >
            Community Vault
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 52,
    marginVertical: 4,
  },
  contentContainer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#14141E',
    borderWidth: 1,
    borderColor: '#242434',
  },
  pillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  pillText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#0A0A0E',
    fontWeight: '800',
  },
});
