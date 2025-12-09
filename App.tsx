import React, {useState, useRef, useMemo} from 'react';
import routesData from './pgh_bus_routes.json';

type BusStop = {
  stop_id: string;
  stop_name: string;
  address: string;
  arrival_times: string[];
};

type BusDirection = {
  direction: string;
  stops: BusStop[];
};

type BusRoute = {
  route_id: string;
  route_name: string;
  directions: BusDirection[];
};
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type Screen = 'home' | 'whereTo' | 'favoriteLines' | 'savedLocations';

export default function App() {
  const insets = useSafeAreaInsets();
  const [screen, setScreen] = useState<Screen>('home');

  // Map region state
  const [region, setRegion] = useState<Region>({
    latitude: 40.4444,
    longitude: -79.954,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  // Map ref so we can animate zoom
  const mapRef = useRef<MapView | null>(null);

  // Bottom sheet ref
  const sheetRef = useRef<BottomSheet | null>(null);
  // Snap points for the sheet
  const snapPoints = useMemo(() => ['6%', '45%', '80%'], []);

    const routes: BusRoute[] = (routesData as {routes: BusRoute[]}).routes;
    const nearbyRoutes = routes.slice(0, 3);
    const otherRoutes = routes.slice(3);

  const handleZoom = (direction: 'in' | 'out') => {
    setRegion(prev => {
      const factor = direction === 'in' ? 0.5 : 2; // zoom in = closer, zoom out = farther
      const next: Region = {
        ...prev,
        latitudeDelta: prev.latitudeDelta * factor,
        longitudeDelta: prev.longitudeDelta * factor,
      };

      if (mapRef.current) {
        mapRef.current.animateToRegion(next, 200);
      }

      return next;
    });
  };

  const handleOpenWhereTo = () => {
    setScreen('whereTo');
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(2); // snap to 80%
    }
  };

  const handleBackToHome = () => {
    setScreen('home');
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(1); // snap back to mid position
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.safe}>
          {/* ---------- HOME + WHERE TO OVERLAY ---------- */}
          {(screen === 'home' || screen === 'whereTo') && (
            <View style={styles.homeContainer}>
              {/* Full-screen map */}
              <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={StyleSheet.absoluteFillObject}
                initialRegion={region}
                region={region}
                onRegionChangeComplete={setRegion}
                mapPadding={{top: 0, right: 0, bottom: 220, left: 0}}
                paddingAdjustmentBehavior="always">
                <Marker
                  coordinate={{latitude: 40.4444, longitude: -79.954}}
                  title="Pitt Campus"
                  description="Sample marker for prototype"
                />
              </MapView>

              {/* Zoom controls */}
              <View style={styles.zoomControls}>
                <Pressable
                  style={styles.zoomBtn}
                  onPress={() => handleZoom('in')}>
                  <Text style={styles.zoomText}>＋</Text>
                </Pressable>
                <Pressable
                  style={styles.zoomBtn}
                  onPress={() => handleZoom('out')}>
                  <Text style={styles.zoomText}>−</Text>
                </Pressable>
              </View>

              {/* Floating search pill - only show on home screen */}
              {screen === 'home' && (
                <Pressable
                  style={styles.searchPill}
                  onPress={handleOpenWhereTo}>
                  <View style={styles.searchPillInner}>
                    <Text style={styles.searchPillIcon}>🔍</Text>
                    <Text style={styles.searchPillText}>Where to?</Text>
                    <Text style={styles.searchPillChevron}>›</Text>
                  </View>
                </Pressable>
              )}

              {/* Draggable bottom sheet */}
              <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                enablePanDownToClose={false}
                handleIndicatorStyle={styles.handleBar}
                backgroundStyle={styles.sheetBg}
                style={styles.sheetContainer}
                topInset={insets.top + 8}>
                <BottomSheetScrollView
                  contentContainerStyle={styles.sheetContent}
                  showsVerticalScrollIndicator={false}>
                  {screen === 'home' && (
                    <>
                      {/* Shortcuts moved to top */}
                      <Text style={[styles.section, {marginTop: 0}]}>
                          <Text style={styles.sectionIcon}>★ </Text>
                          Shortcuts
                        </Text>
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

                      {/* Favorites section */}
                      <Text style={[styles.section, {marginTop: 16}]}>
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

                      {/* Nearby Routes using JSON data */}
                      <Text style={[styles.section, {marginTop: 18}]}>
                        <Text style={styles.sectionIcon}>🚌 </Text>
                        Nearby Routes
                      </Text>

                      {nearbyRoutes.map(route => {
                        const displayName = route.route_name.replace(/^Route\s+\d+:\s*/, '');
                        return (
                          <View key={route.route_id} style={styles.card}>
                            <View style={styles.cardIconBubble}>
                              <Text style={styles.cardIcon}>🚌</Text>
                            </View>
                            <View style={styles.cardMiddle}>
                              <Text style={styles.cardTitle}>{displayName}</Text>
                              {route.directions[0]?.stops?.length ? (
                                <Text style={styles.cardSub}>
                                  {route.directions[0].stops[0].stop_name} →{' '}
                                  {
                                    route.directions[0].stops[
                                      route.directions[0].stops.length - 1
                                    ].stop_name
                                  }
                                </Text>
                              ) : null}
                            </View>
                            <View style={styles.cardRight}>
                              <Text
                                style={[
                                  styles.cardTimeValue,
                                  styles.cardTimeAmber,
                                ]}>
                                Every 10 min
                              </Text>
                              <Text style={styles.cardTimeLabel}>Est. headway</Text>
                            </View>
                          </View>
                        );
                      })}

                      {/* Other Routes from JSON */}
                      <Text style={[styles.section, {marginTop: 18}]}>
                        <Text style={styles.sectionIcon}>🚌 </Text>
                        Other Routes
                      </Text>

                      {otherRoutes.map(route => {
                        const displayName = route.route_name.replace(/^Route\s+\d+:\s*/, '');
                        return (
                          <View key={route.route_id} style={styles.otherRouteRow}>
                            <Text style={styles.otherRouteNumber}>
                              {route.route_id}
                            </Text>
                            <View style={{flex: 1}}>
                              <Text style={styles.otherRouteTitle}>{displayName}</Text>
                              {route.directions[0]?.stops?.length ? (
                                <Text style={styles.otherRouteSub}>
                                  {route.directions[0].stops[0].stop_name} →{' '}
                                  {
                                    route.directions[0].stops[
                                      route.directions[0].stops.length - 1
                                    ].stop_name
                                  }
                                </Text>
                              ) : null}
                            </View>
                          </View>
                        );
                      })}

                      <View style={{height: 20}} />
                    </>
                  )}

                  {screen === 'whereTo' && (
                    <>
                      <View style={styles.headerRow}>
                        <Pressable
                          onPress={handleBackToHome}
                          style={{width: 40}}>
                          <Text style={styles.backIcon}>‹</Text>
                        </Pressable>

                        <View style={{flex: 1, alignItems: 'center'}}>
                          <Text style={styles.headerTitle}>Where to?</Text>
                        </View>

                        <View style={{width: 40}} />
                      </View>

                      <View style={{height: 16}} />

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

                      <View style={{height: 16}} />

                      <Text style={styles.section}>Recent</Text>

                      <View style={styles.recentCard}>
                        <Text style={styles.recentTitle}>Cathedral of Learning</Text>
                        <Text style={styles.recentAddr}>4200 Fifth Avenue</Text>
                      </View>

                      <View style={styles.recentCard}>
                        <Text style={styles.recentTitle}>PPG Paints Arena</Text>
                        <Text style={styles.recentAddr}>1001 Fifth Ave</Text>
                      </View>
                    </>
                  )}
                </BottomSheetScrollView>
              </BottomSheet>

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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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

  zoomControls: {
    position: 'absolute',
    right: 16,
    top: 120,
  },
  zoomBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  zoomText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  whereToOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  whereToCard: {
    width: '92%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 10,
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

  quickRow: {flexDirection: 'row', gap: 12, marginTop: 8},
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
  otherRouteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
    elevation: 1,
  },
  otherRouteNumber: {
    width: 48,
    fontWeight: '800',
    fontSize: 14,
    color: '#111827',
  },
  otherRouteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  otherRouteSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});