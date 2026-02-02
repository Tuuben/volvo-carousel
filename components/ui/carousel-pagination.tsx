import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

const DOT_SIZE = 8;
const DOT_GAP = 6;
const ANIMATION_DURATION = 150;
const ANIMATION_DELAY = 50;

type CarouselPaginationProps = {
    currentIndex: number;
    totalItems: number;
}

const getPosition = (index: number) => index * (DOT_SIZE + DOT_GAP);

export const CarouselPagination = ({ currentIndex, totalItems }: CarouselPaginationProps) => {
    const prevIndex = useRef(currentIndex);
    const leftEdge = useSharedValue(getPosition(currentIndex));
    const rightEdge = useSharedValue(getPosition(currentIndex) + DOT_SIZE);

    useEffect(() => {
        const targetLeft = getPosition(currentIndex);
        const targetRight = targetLeft + DOT_SIZE;
        const isMovingForward = currentIndex > prevIndex.current;

        if (isMovingForward) {
            rightEdge.value = withTiming(targetRight, { duration: ANIMATION_DURATION });
            leftEdge.value = withDelay(ANIMATION_DELAY, withTiming(targetLeft, { duration: ANIMATION_DURATION }));
        } else {
            leftEdge.value = withTiming(targetLeft, { duration: ANIMATION_DURATION });
            rightEdge.value = withDelay(ANIMATION_DELAY, withTiming(targetRight, { duration: ANIMATION_DURATION }));
        }

        prevIndex.current = currentIndex;
    }, [currentIndex, leftEdge, rightEdge]);

    const animatedStyle = useAnimatedStyle(() => ({
        left: leftEdge.value,
        width: rightEdge.value - leftEdge.value,
    }));

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                {Array.from({ length: totalItems }).map((_, index) => (
                    <View key={index} style={styles.inactiveDot} />
                ))}
                <Animated.View style={[styles.activeDot, animatedStyle]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
        gap: DOT_GAP,
    },
    inactiveDot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: 'lightgray',
    },
    activeDot: {
        position: 'absolute',
        left: 0,
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: 'black',
    },
})