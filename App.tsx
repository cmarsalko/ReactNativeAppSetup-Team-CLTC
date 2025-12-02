import React, { useState, useRef, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Screen = 'home' | 'whereTo' | 'favoriteLines' | 'savedLocations';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');git 
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safe}>
        {/* ---------- HOME SCREEN ---------- */}
        {screen === 'home' && (
          <View style={{ flex: 1 }}>
            {/* Map / Header */}
            <View style={styles.fakeMapHeader}>
              <View style={styles.topRow} />

              <Pressable
                style={styles.searchPill}
                onPress={() => setScreen('whereTo')}
              >
                <Text style={styles.searchPillText}>Where to?</Text>
              </Pressable>
            </View>

            {/* Bottom Sheet */}
            <BottomSheet
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              keyboardBehavior="interactive"
              style={{ flex: 1 }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
              >
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
              </ScrollView>
            </BottomSheet>
          </View>
        )}

        {/* ---------- OTHER SCREENS ---------- */}
        {screen !== 'home' && (
          <View style={{ flex: 1 }}>
            <View style={styles.content}>
              <View style={styles.headerRow}>
                <Pressable onPress={() => setScreen('home')} style={{ width: 40 }}>
                  <Text style={styles.backIcon}>‹</Text>
                </Pressable>
                <Text style={styles.headerTitle}>
                  {screen === 'whereTo'
                    ? 'Where to?'
                    : screen === 'favoriteLines'
                    ? 'Favorite Lines'
                    : 'Saved Locations'}
                </Text>
                <Text style={styles.plusText}>＋</Text>
              </View>

              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
              >
                <Text>Your {screen} content here...</Text>
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#dfe6f1' },

  fakeMapHeader: {
    height: 260,
    backgroundColor: '#c9d4e5',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 24,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

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
  searchPillText: { fontSize: 16, color: '#6B7280' },

  handleBar: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
    marginBottom: 8,
  },
  section: { fontSize: 18, fontWeight: '600', marginBottom: 8, marginTop: 12 },

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

  quickRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
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

  content: { flex: 1, backgroundColor: '#f3f4f6' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
  backIcon: { fontSize: 22, width: 24 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  plusText: { fontSize: 20, width: 24, textAlign: 'right' },
});
