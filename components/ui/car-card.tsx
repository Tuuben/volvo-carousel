import { CarModel } from "@/api";
import { PLACEHOLDER_IMAGE_PATHS } from "@/constants/mocks";
import { useEffect } from "react";
import { ImageSourcePropType, StyleSheet, Text, View, ViewProps } from "react-native";
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gutter } from "../gutter";

type CarCardProps = ViewProps & {
    car: CarModel;
    cardWidth: number;
    imageHeight: number;
    isActive?: boolean;
}

export const CarCard = ({ car, cardWidth, imageHeight, isActive }: CarCardProps) => {
    const textAnimationValue = useSharedValue(isActive ? 1 : 0);
    const imageAnimationValue = useSharedValue(isActive ? 1 : 0);

    useEffect(() => {
        textAnimationValue.value = withTiming(isActive ? 1 : 0, { duration: 200 });
        imageAnimationValue.value = withTiming(isActive ? 1 : 0, { duration: 300, easing: Easing.sin }); 
    }, [isActive, textAnimationValue, imageAnimationValue]);

    const animatedTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(textAnimationValue.value, [0, 1], ['gray', 'black']), 
    }));

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(imageAnimationValue.value, [0, 1], [1, 1.08]) }],
        opacity: interpolate(imageAnimationValue.value, [0, 1], [0.6, 1]),
    }));

    return (
        <View style={{ width: cardWidth }}>
            <Text style={styles.bodyType}>{car.bodyType.toUpperCase()}</Text>
            <Animated.Text style={[styles.modelName, animatedTextStyle]}>{car.modelName}</Animated.Text>
            <Text style={styles.modelType}>{car.modelType}</Text>
            <View style={[styles.imageContainer, { height: imageHeight }]}>
                <Animated.Image
                    source={PLACEHOLDER_IMAGE_PATHS[car.imageUrl] as ImageSourcePropType}
                    style={[styles.image, { height: imageHeight }, animatedImageStyle]}
                />
            </View>
            <Gutter size={16} />
        </View>
    );
}

const styles = StyleSheet.create({
    bodyType: {
        fontSize: 12,
        fontWeight: '600',
        color: 'gray',
    },
    modelName: {
        fontSize: 16,
        fontWeight: '600',
    },
    modelType: {
        fontSize: 12,
        fontWeight: '400',
        color: 'gray',
    },
    image: {
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
    },
    imageContainer: {
        overflow: 'hidden',
        width: '100%',
    },
});