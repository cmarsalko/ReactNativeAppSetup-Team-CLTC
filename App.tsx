<<<<<<< HEAD
import React, { useState, useRef, useMemo } from 'react';
=======
import React, {useState, useRef, useMemo} from 'react';
>>>>>>> 452cf00 (Add proper gitignore and clean Android build artifacts)
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
<<<<<<< HEAD
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
=======
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
>>>>>>> 452cf00 (Add proper gitignore and clean Android build artifacts)

type Screen = 'home' | 'whereTo' | 'favoriteLines' | 'savedLocations';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');git 
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);


  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['45%', '80%'], []); // 45% + 80% of screen height

  return (
<<<<<<< HEAD
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
=======
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.safe}>
          {/* ---------- HOME ---------- */}
          {screen === 'home' && (
            <View style={styles.homeContainer}>
              {/* Full-screen map */}
              <MapView
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                  latitude: 40.4444,
                  longitude: -79.954,
                  // smaller deltas = more zoomed in
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                // shift the camera up visually so marker is closer to center
                mapPadding={{top: 0, right: 0, bottom: 220, left: 0}}
                paddingAdjustmentBehavior="always">
                <Marker
                  coordinate={{latitude: 40.4444, longitude: -79.954}}
                  title="Pitt Campus"
                  description="Sample marker for prototype"
                />
              </MapView>

              {/* Floating search pill */}
              <Pressable
                style={styles.searchPill}
                onPress={() => setScreen('whereTo')}>
                <View style={styles.searchPillInner}>
                  <Text style={styles.searchPillIcon}>🔍</Text>
                  <Text style={styles.searchPillText}>Where to?</Text>
                  <Text style={styles.searchPillChevron}>›</Text>
                </View>
              </Pressable>

              {/* Draggable bottom sheet */}
              <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                handleIndicatorStyle={styles.handleBar}
                backgroundStyle={styles.sheetBg}
                style={styles.sheetContainer}>
                <BottomSheetScrollView
                  contentContainerStyle={styles.sheetContent}
                  showsVerticalScrollIndicator={false}>
                  {/* Favorites section */}
                  <Text style={styles.section}>
                    <Text style={styles.sectionIcon}>★ </Text>
                    Favorites
                  </Text>

                  {/* 71C card */}
                  <View style={styles.card}>
                    <View style={styles.cardIconBubble}>
                      <Text style={styles.cardIcon}>🚌</Text>
                    </View>
                    <View style={styles.cardMiddle}>
                      <Text style={styles.cardTitle}>71C – Fifth Ave</Text>
                      <Text style={styles.cardSub}>
                        Fifth Ave → Tennyson Ave
                      </Text>
                    </View>
                    <View style={styles.cardRight}>
                      <Text
                        style={[
                          styles.cardTimeValue,
                          styles.cardTimeGreen,
                        ]}>
                        1 min
                      </Text>
                      <Text style={styles.cardTimeLabel}>Next bus</Text>
                    </View>
                  </View>

                  {/* 71A card */}
                  <View style={styles.card}>
                    <View style={styles.cardIconBubble}>
                      <Text style={styles.cardIcon}>🚌</Text>
                    </View>
                    <View style={styles.cardMiddle}>
                      <Text style={styles.cardTitle}>71A – Negley</Text>
                      <Text style={styles.cardSub}>
                        Craig St → Centre Ave
                      </Text>
                    </View>
                    <View style={styles.cardRight}>
                      <Text
                        style={[
                          styles.cardTimeValue,
                          styles.cardTimeGreen,
                        ]}>
                        2 min
                      </Text>
                      <Text style={styles.cardTimeLabel}>Next bus</Text>
                    </View>
                  </View>

                  {/* Nearby Routes section */}
                  <Text style={[styles.section, {marginTop: 18}]}>
                    <Text style={styles.sectionIcon}>🚌 </Text>
                    Nearby Routes
                  </Text>

                  {/* 54D card */}
                  <View style={styles.card}>
                    <View style={styles.cardIconBubble}>
                      <Text style={styles.cardIcon}>🚌</Text>
                    </View>
                    <View style={styles.cardMiddle}>
                      <Text style={styles.cardTitle}>54D – 5th Ave</Text>
                      <Text style={styles.cardSub}>
                        Blvd of Allies → Oakland
                      </Text>
                    </View>
                    <View style={styles.cardRight}>
                      <Text
                        style={[
                          styles.cardTimeValue,
                          styles.cardTimeAmber,
                        ]}>
                        12 min
                      </Text>
                      <Text style={styles.cardTimeLabel}>Next bus</Text>
                    </View>
                  </View>

                  <View style={{height: 24}} />

                  {/* Quick actions row */}
                  <View style={styles.quickRow}>
                    <Pressable
                      style={styles.quickBtn}
                      onPress={() => setScreen('favoriteLines')}>
                      <Text style={styles.quickText}>Transit Lines</Text>
                    </Pressable>

                    <Pressable
                      style={styles.quickBtn}
                      onPress={() => setScreen('savedLocations')}>
                      <Text style={styles.quickText}>Saved Locations</Text>
                    </Pressable>
                  </View>

                  <View style={{height: 20}} />
                </BottomSheetScrollView>
              </BottomSheet>
            </View>
          )}

          {/* ---------- WHERE TO ---------- */}
          {screen === 'whereTo' && (
            <View style={[styles.content, {paddingTop: 40}]}>
              <View style={styles.headerRow}>
                <Pressable
                  onPress={() => setScreen('home')}
                  style={{width: 40}}>
                  <Text style={styles.backIcon}>‹</Text>
                </Pressable>

                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.headerTitle}>Where to?</Text>
                </View>

                <View style={{width: 40}} />
              </View>

              <View style={{height: 60}} />

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

              <View style={{height: 20}} />

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
            <View style={[styles.content, {paddingTop: 40}]}>
              <View style={styles.headerRow}>
                <Pressable onPress={() => setScreen('home')}>
                  <Text style={styles.backIcon}>‹</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Favorite Lines</Text>
                <Text style={styles.plusText}>＋</Text>
              </View>

              <Text style={[styles.sectionLabel, {marginTop: 20}]}>
                Favorites Near Me
              </Text>

              {[
                '83 Forbes Ave/Downtown',
                '81 Bates St/Glen Hazel',
                '58 Blvd of Allies/Oakland',
                '93 Bates St/Downtown',
              ].map((line, idx) => (
                <View key={idx} style={styles.lineCard}>
                  <Text style={styles.lineNumber}>{line.split(' ')[0]}</Text>
                  <Text style={styles.lineLabel}>{line}</Text>
                </View>
              ))}

              <Text style={[styles.sectionLabel, {marginTop: 16}]}>
                Other Favorites
              </Text>

              {[
                '54 Fifth Ave/Allegheny Station',
                '65 Blvd of Allies/Squirrel Hill',
                '28X Fifth Ave/PGH Intl Apt',
              ].map((line, idx) => (
                <View key={idx} style={styles.lineCard}>
                  <Text style={styles.lineNumber}>{line.split(' ')[0]}</Text>
                  <Text style={styles.lineLabel}>{line}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ---------- SAVED LOCATIONS ---------- */}
          {screen === 'savedLocations' && (
            <View style={[styles.content, {paddingTop: 40}]}>
              <View style={styles.headerRow}>
                <Pressable onPress={() => setScreen('home')}>
                  <Text style={styles.backIcon}>‹</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Saved Locations</Text>
                <Text style={styles.plusText}>＋</Text>
              </View>

              <Text style={[styles.sectionLabel, {marginTop: 12}]}>
                Favorite Locations
              </Text>

              <View style={styles.savedCard}>
                <Text style={styles.savedTitle}>Home</Text>
                <Text style={styles.savedAddr}>
                  4200 Fifth Ave, Pittsburgh
                </Text>
              </View>

              <View style={styles.savedCard}>
                <Text style={styles.savedTitle}>Apartment</Text>
                <Text style={styles.savedAddr}>
                  3719 Terrace St, Pittsburgh
                </Text>
              </View>

              <View style={styles.savedCard}>
                <Text style={styles.savedTitle}>Work</Text>
                <Text style={styles.savedAddr}>
                  100 Art Rooney Ave, Pittsburgh
                </Text>
              </View>
            </View>
          )}
        </SafeAreaView>
      </BottomSheetModalProvider>
>>>>>>> 452cf00 (Add proper gitignore and clean Android build artifacts)
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
  safe: {
    flex: 1,
    backgroundColor: '#dfe6f1',
    paddingTop: 8,
  },

  homeContainer: {
    flex: 1,
  },

  // SEARCH PILL
  searchPill: {
    position: 'absolute',
    top: 50,
>>>>>>> 452cf00 (Add proper gitignore and clean Android build artifacts)
    alignSelf: 'center',
    width: '88%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 10},
    elevation: 8,
  },
  searchPillInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchPillIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchPillText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  searchPillChevron: {
    fontSize: 20,
    color: '#6B7280',
    marginLeft: 8,
  },

  // make sheet sit above the map
  sheetContainer: {
    zIndex: 50,
    elevation: 50,
  },

  // Bottom sheet styles
  sheetBg: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
  sheetContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginVertical: 8,
  },
<<<<<<< HEAD
  section: { fontSize: 18, fontWeight: '600', marginBottom: 8, marginTop: 12 },
=======

  section: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 12,
    color: '#111827',
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
>>>>>>> 452cf00 (Add proper gitignore and clean Android build artifacts)

  // CARD STYLES
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 4,
  },
  cardIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardIcon: {
    fontSize: 20,
  },
  cardMiddle: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardSub: {
    color: '#6B7280',
    marginTop: 2,
    fontSize: 13,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 8,
  },
  cardTimeValue: {
    fontWeight: '700',
    fontSize: 14,
  },
  cardTimeGreen: {
    color: '#059669',
  },
  cardTimeAmber: {
    color: '#F59E0B',
  },
  cardTimeLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

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
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  quickText: {fontWeight: '600', fontSize: 14},

<<<<<<< HEAD
  content: { flex: 1, backgroundColor: '#f3f4f6' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
  backIcon: { fontSize: 22, width: 24 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  plusText: { fontSize: 20, width: 24, textAlign: 'right' },
});
=======
  // OTHER SCREENS
  content: {padding: 16, flex: 1, backgroundColor: '#f3f4f6'},

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: {fontSize: 22, width: 24},
  headerTitle: {fontSize: 20, fontWeight: '700'},
  plusText: {fontSize: 20, width: 24, textAlign: 'right'},

  inputPill: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  inputLabel: {color: '#6B7280', fontSize: 12, marginBottom: 2},
  inputValue: {fontSize: 16, fontWeight: '500'},
  inputPlaceholder: {fontSize: 16, color: '#9CA3AF'},

  primaryBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnText: {color: 'white', fontWeight: '700', fontSize: 16},

  recentCard: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 16,
    marginBottom: 8,
  },
  recentTitle: {fontSize: 16, fontWeight: '600'},
  recentAddr: {color: '#6B7280', marginTop: 2},

  lineCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },
  lineNumber: {width: 40, fontWeight: '800', fontSize: 16},
  lineLabel: {flex: 1, fontSize: 15},

  savedCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
  },
  savedTitle: {fontWeight: '700', fontSize: 16},
  savedAddr: {color: '#6B7280', marginTop: 2},
});
>>>>>>> 452cf00 (Add proper gitignore and clean Android build artifacts)
