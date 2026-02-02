import MaskedView from "@react-native-masked-view/masked-view";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

type LinkProps = {
    onPress: () => void;
    isShining?: boolean;
}

const SHIMMER_WIDTH = 100;

export const CardLink = ({ onPress, children, isShining }: PropsWithChildren<LinkProps>) => {
    const translateX = useSharedValue(-SHIMMER_WIDTH);

    useEffect(() => {
        if (isShining) {
            translateX.value = withRepeat(
                withSequence(
                    withTiming(80, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                    withDelay(1000, withTiming(-SHIMMER_WIDTH, { duration: 0 }))
                ),
                -1,
                false
            );
        } else {
            translateX.value = -SHIMMER_WIDTH;
        }
    }, [isShining, translateX]);

    const animatedShimmerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {isShining ? (
                <MaskedView
                    maskElement={
                        <View style={styles.maskContainer}>
                            <Text style={styles.text}>{children}</Text>
                        </View>
                    }
                >
                    <Text style={styles.text}>{children}</Text>
                    <Animated.View style={[styles.shimmerContainer, animatedShimmerStyle]}>
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.shimmerGradient}
                        />
                    </Animated.View>
                </MaskedView>
            ) : (
                <Text style={styles.text}>{children}</Text>
            )}
            <Image source={require('@/assets/icons/chevron-small.svg')} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    maskContainer: {
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 14,
        fontWeight: '700',
        color: 'steelblue',
    },
    shimmerContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    shimmerGradient: {
        width: SHIMMER_WIDTH,
        height: '100%',
    },
    icon: {
        width: 12,
        height: 12,
    },
});