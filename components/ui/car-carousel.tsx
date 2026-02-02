import { CarModel } from "@/api";
import { PLACEHOLDER_BLUR_HASH, TMP_PAGE_PADDING } from "@/constants/mocks";
import { Image } from "expo-image";
import { navigate } from "expo-router/build/global-state/routing";
import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, ScrollView, StyleSheet, useWindowDimensions, View, ViewToken } from "react-native";
import { Gutter } from "../gutter";
import { CarCard } from "./car-card";
import { CardLink } from "./card-link";
import { CarouselPagination } from "./carousel-pagination";

// Simply assuming iphone 16 pro, no screen size detection
export const TMP_CARD_WIDTH = 300;
const TMP_IMAGE_HEIGHT = 220;
const ITEM_SEPARATOR = 16;
const NUM_LOADING_CARDS = 4;

type CarCarouselProps = {
    cars?: CarModel[];
    isLoading?: boolean;
    isError?: boolean;
}

export const CarCarousel = ({ cars, isLoading }: CarCarouselProps) => {
    const { width: screenWidth } = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(0);

    const snapOffsets = useMemo(() => {
        if (!cars?.length) return [];

        const itemCount = cars.length;
        const totalContentWidth = TMP_PAGE_PADDING * 2 + itemCount * TMP_CARD_WIDTH + (itemCount - 1) * ITEM_SEPARATOR;
        const maxScroll = Math.max(0, totalContentWidth - screenWidth);
        const centerOffset = (screenWidth - TMP_CARD_WIDTH) / 2;

        return cars.map((_, index) => {
            const itemPosition = TMP_PAGE_PADDING + index * (TMP_CARD_WIDTH + ITEM_SEPARATOR);

            // first, Hug left
            if (index === 0) {
                return 0; 
            }
            // last, hug right
            if (index === itemCount - 1) {
                return maxScroll; 
            }
            return Math.max(0, Math.min(itemPosition - centerOffset, maxScroll));
        });
    }, [cars, screenWidth]);

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0 && viewableItems[0].index !== null) {
                setActiveIndex(viewableItems[0].index);
            }
        },
        []
    );

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderListItem = ({ item: car, index }: { item: CarModel; index: number }) => (
        <CarCard
            car={car}
            cardWidth={TMP_CARD_WIDTH}
            imageHeight={TMP_IMAGE_HEIGHT}
            isActive={index === activeIndex}
        />
    );

    return (
        <View> 
            {isLoading ? (
                <ScrollView horizontal style={styles.loadingContainer}>
                    {Array.from({ length: NUM_LOADING_CARDS }).map((_, index) => (
                        <View key={index} style={styles.loadingCardContainer}>
                            <Image 
                                placeholder={{ blurhash: PLACEHOLDER_BLUR_HASH }}
                                style={styles.loadingCard}
                                contentFit="cover"
                            />
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <FlatList
                    horizontal
                    data={cars}
                    renderItem={renderListItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <Gutter size={ITEM_SEPARATOR} />}
                    showsHorizontalScrollIndicator={false}
                    style={styles.carouselContainer}
                    contentContainerStyle={styles.carouselContent}
                    snapToOffsets={snapOffsets}
                    decelerationRate="fast"
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                />
            )}

            <Gutter size={16} />
            <View style={styles.actionsContainer}>
                <CardLink onPress={() => { }}>LEARN</CardLink>
                <CardLink onPress={() => { navigate("/modal") }} isShining>SHOP</CardLink>
            </View>
            <Gutter size={24} />
            <CarouselPagination currentIndex={activeIndex} totalItems={cars?.length || 0} />
        </View>
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
        marginHorizontal: -TMP_PAGE_PADDING,
    },
    carouselContent: {
        paddingHorizontal: TMP_PAGE_PADDING,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        gap: 16,
    },
    loadingContainer: {
    },
    loadingCardContainer: {
        width: TMP_CARD_WIDTH,
        height: TMP_IMAGE_HEIGHT,
    },
    loadingCard: {
        width: '100%',
        height: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 2,
    }
});