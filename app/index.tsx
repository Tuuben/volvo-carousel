import { getAllCars } from '@/api';
import { Gutter } from '@/components/gutter';
import { CarCarousel } from '@/components/ui/car-carousel';
import { TMP_PAGE_PADDING } from '@/constants/mocks';
import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const { data: cars, isLoading, isError } = useQuery({
    queryKey: ['all-cars'],
    queryFn: getAllCars,
  })

  return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
        }}
      >
        {/* Mock Header */}
        <View style={styles.headerContainer}></View>

        <Gutter size={32} />

        <Text style={styles.sectionTitle}>Explore our cars</Text>
        <Gutter size={8} />

        <CarCarousel cars={cars} isLoading={isLoading} isError={isError} />

        <Gutter size={32} />

        {/* Mock content */}
        <View style={styles.mockContainer}></View>
        <Gutter size={16} />
        <View style={styles.mockContainer}></View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: TMP_PAGE_PADDING,
  },
  headerContainer: {
    height: 220,
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  mockContainer: {
    height: 120,
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },
});
