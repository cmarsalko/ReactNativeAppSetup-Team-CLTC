import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

type Screen = 'home' | 'whereTo' | 'favoriteLines' | 'savedLocations';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <SafeAreaView style={styles.safe}>

      {/* ---------- HOME ---------- */}
      {screen === 'home' && (
        <View style={{ flex: 2 }}>
          {/* Top map area */}
          <View style={styles.fakeMapHeader}>
            {/* Status-ish row (optional) */}
            <View style={styles.topRow}>
            </View>

            {/* Where to pill */}
            <Pressable
              style={styles.searchPill}
              onPress={() => setScreen('whereTo')}
            >
              <Text style={styles.searchPillText}>Where to?</Text>
            </Pressable>
          </View>

          {/* Bottom sheet over the map */}
          <View style={styles.sheet}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {/* handle bar */}
              <View style={styles.handleBar} />

              <Text style={styles.section}>Favorites</Text>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>71C – Fifth Ave</Text>
                <Text style={styles.cardSub}>Fifth Ave → Tennyson Ave</Text>
                <Text style={styles.cardTime}>1 min • Next bus</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>71A – Negley</Text>
                <Text style={styles.cardSub}>Craig St → Centre Ave</Text>
                <Text style={styles.cardTime}>2 min • Next bus</Text>
              </View>

              <Text style={styles.section}>Nearby Routes</Text>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>54D – 5th Ave</Text>
                <Text style={styles.cardSub}>Blvd of Allies → Oakland</Text>
                <Text style={styles.cardTime}>12 min • Next bus</Text>
              </View>

              <View style={{ height: 24 }} />

              {/* Quick actions row */}
              <View style={styles.quickRow}>
                <Pressable
                  style={styles.quickBtn}
                  onPress={() => setScreen('favoriteLines')}
                >
                  <Text style={styles.quickText}>Transit Lines</Text>
                </Pressable>

                <Pressable
                  style={styles.quickBtn}
                  onPress={() => setScreen('savedLocations')}
                >
                  <Text style={styles.quickText}>Saved Locations</Text>
                </Pressable>
              </View>

              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      )}

      {/* ---------- WHERE TO ---------- */}
      {screen === 'whereTo' && (
        <View style={[styles.content, { paddingTop: 40 }]}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => setScreen('home')} style={{ width: 40 }}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerTitle}>Where to?</Text>
            </View>

            <View style={{ width: 40 }} />
          </View>

          <View style={{ height: 60 }} />

          <View style={styles.inputPill}>
            <Text style={styles.inputLabel}>Current location</Text>
            <Text style={styles.inputValue}>4200 Fifth Ave</Text>
          </View>

          <View style={styles.inputPill}>
            <Text style={styles.inputLabel}>Destination</Text>
            <Text style={styles.inputPlaceholder}>Tap to choose</Text>
          </View>

          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Plan Trip</Text>
          </Pressable>

          <View style={{ height: 20 }} />

          <Text style={styles.section}>Recent</Text>

          <View style={styles.recentCard}>
            <Text style={styles.recentTitle}>Cathedral of Learning</Text>
            <Text style={styles.recentAddr}>4200 Fifth Avenue</Text>
          </View>

          <View style={styles.recentCard}>
            <Text style={styles.recentTitle}>PPG Paints Arena</Text>
            <Text style={styles.recentAddr}>1001 Fifth Ave</Text>
          </View>
        </View>
      )}

      {/* ---------- FAVORITE LINES ---------- */}
      {screen === 'favoriteLines' && (
        <View style={[styles.content, { paddingTop: 40 }]}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => setScreen('home')}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <Text style={styles.headerTitle}>Favorite Lines</Text>
            <Text style={styles.plusText}>＋</Text>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
            Favorites Near Me
          </Text>

          {['83 Forbes Ave/Downtown', '81 Bates St/Glen Hazel', '58 Blvd of Allies/Oakland', '93 Bates St/Downtown'].map(
            (line, idx) => (
              <View key={idx} style={styles.lineCard}>
                <Text style={styles.lineNumber}>{line.split(' ')[0]}</Text>
                <Text style={styles.lineLabel}>{line}</Text>
              </View>
            ),
          )}

          <Text style={[styles.sectionLabel, { marginTop: 16 }]}>
            Other Favorites
          </Text>

          {['54 Fifth Ave/Allegheny Station', '65 Blvd of Allies/Squirrel Hill', '28X Fifth Ave/PGH Intl Apt'].map(
            (line, idx) => (
              <View key={idx} style={styles.lineCard}>
                <Text style={styles.lineNumber}>{line.split(' ')[0]}</Text>
                <Text style={styles.lineLabel}>{line}</Text>
              </View>
            ),
          )}
        </View>
      )}

      {/* ---------- SAVED LOCATIONS ---------- */}
      {screen === 'savedLocations' && (
        <View style={[styles.content, { paddingTop: 40 }]}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => setScreen('home')}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <Text style={styles.headerTitle}>Saved Locations</Text>
            <Text style={styles.plusText}>＋</Text>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 12 }]}>
            Favorite Locations
          </Text>

          <View style={styles.savedCard}>
            <Text style={styles.savedTitle}>Home</Text>
            <Text style={styles.savedAddr}>4200 Fifth Ave, Pittsburgh</Text>
          </View>

          <View style={styles.savedCard}>
            <Text style={styles.savedTitle}>Apartment</Text>
            <Text style={styles.savedAddr}>3719 Terrace St, Pittsburgh</Text>
          </View>

          <View style={styles.savedCard}>
            <Text style={styles.savedTitle}>Work</Text>
            <Text style={styles.savedAddr}>100 Art Rooney Ave, Pittsburgh</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#dfe6f1',
    paddingTop: 8,   // NEW – moves everything down slightly
  },

  /* HOME: top map header */
  fakeMapHeader: {
    height: 260,
    backgroundColor: '#c9d4e5', // stand-in for blurred map
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusChip: {
    backgroundColor: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  searchPill: {
    marginTop: 40,
    alignSelf: 'center',
    width: '88%',
    backgroundColor: 'white',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  searchPillText: {
    fontSize: 16,
    color: '#6B7280',
  },

  /* HOME: bottom sheet */
  sheet: {
    flex: 1,
    marginTop: -24,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  handleBar: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
    marginBottom: 8,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },

  card: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSub: { color: '#6B7280', marginTop: 2, fontSize: 13 },
  cardTime: { color: '#059669', marginTop: 4, fontWeight: '600', fontSize: 13 },

  quickRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  quickText: { fontWeight: '600', fontSize: 14 },

  /* Shared content for other screens */
  content: { padding: 16, flex: 1, backgroundColor: '#f3f4f6' },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: { fontSize: 22, width: 24 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  plusText: { fontSize: 20, width: 24, textAlign: 'right' },

  inputPill: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  inputLabel: { color: '#6B7280', fontSize: 12, marginBottom: 2 },
  inputValue: { fontSize: 16, fontWeight: '500' },
  inputPlaceholder: { fontSize: 16, color: '#9CA3AF' },

  primaryBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },

  recentCard: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 16,
    marginBottom: 8,
  },
  recentTitle: { fontSize: 16, fontWeight: '600' },
  recentAddr: { color: '#6B7280', marginTop: 2 },

  lineCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },
  lineNumber: { width: 40, fontWeight: '800', fontSize: 16 },
  lineLabel: { flex: 1, fontSize: 15 },

  savedCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
  },
  savedTitle: { fontWeight: '700', fontSize: 16 },
  savedAddr: { color: '#6B7280', marginTop: 2 },
});