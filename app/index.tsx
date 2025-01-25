
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const colors = useThemeColors()
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]} >
			<StatusBar barStyle='light-content' backgroundColor={colors.tint} />
			<ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})