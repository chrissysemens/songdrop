import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colours } from "../colours";
import { useInteractions } from "../state/interactions";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const TARGET_HEIGHT = 1150;
const ANIMATION_DURATION = 300;

const Shutter = () => {
  const height = useSharedValue(0);
  const overlayOpacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { sheet, closeSheet } = useInteractions();

  const topOffset = insets.top + 0;

  useEffect(() => {
    height.value = withTiming(sheet.isOpen ? TARGET_HEIGHT : 0, {
      duration: ANIMATION_DURATION,
    });
    overlayOpacity.value = withTiming(sheet.isOpen ? 0.2 : 0, {
      duration: ANIMATION_DURATION,
    });
  }, [sheet.isOpen]);

  const shutterStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  /*const gesture = Gesture.Pan().onEnd((e) => {
    if (e.translationY < -50 || e.velocityY < -500) {
      runOnJS(closeSheet)();
    }
  });*/

  return (
    <>
      <Animated.View style={[styles.shutter, shutterStyle, { top: topOffset }]}>
        {sheet.content}
        <View style={styles.grabHandleContainer}>
          <View style={styles.grabHandle} />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  shutter: {
    backgroundColor: colours.sheet,
    zIndex: 2,
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  title: {
    color: colours.primary,
    fontSize: 24,
    margin: 20,
  },
  grabHandleContainer: {
    alignItems: "center",
    paddingVertical: 12,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  grabHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ccc",
  },
});

export { Shutter };