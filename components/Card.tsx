import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps

export function Card({ style, ...rest }: Props) {
	const colors = useThemeColors()
	return <View style={[style, style = { backgroundColor: colors.grayWhite }, styles.container]} {...rest} />
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		...Shadows.dp2
	}
})