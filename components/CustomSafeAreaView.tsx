import { SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

type Props = SafeAreaViewProps
export function CustomSafeAreaView({ style, ...rest }: Props) {
	return <SafeAreaView style={[style, styles.container]} {...rest} />
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8
	}
})
