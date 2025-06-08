import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
	useSharedValue,
	withTiming,
	interpolateColor,
	useAnimatedStyle,
} from 'react-native-reanimated';
import { colours } from '../colours';

type Props = {
	value: boolean;
	onToggle: () => void;
	disabled?: boolean;
	testID?: string;
};

const Toggle = ({
	disabled = false,
	value,
	onToggle,
}: Props) => {
	const switchTranslate = useSharedValue(0);

	useEffect(() => {
		switchTranslate.value = withTiming(value ? 26 : -2, { duration: 300 });
	}, [value]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				switchTranslate.value,
				[0, 14],
				[colours.muted, colours.primary],
			),
		};
	});

	return (
		<TouchableOpacity
			onPress={onToggle}
			activeOpacity={1}
			disabled={disabled}
		>
			<Animated.View style={[styles.switchContainer, animatedStyle]}>
				<Animated.View
					style={[
						styles.switch,
						{ transform: [{ translateX: switchTranslate }] },
					]}
				/>
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	switch: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colours.text,
	},
	switchContainer: {
		width: 70,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
        borderWidth: 1,
	},
});

export { Toggle }
