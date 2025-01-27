import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TextInput, View, ViewProps } from "react-native";
import { Row } from "./Row";

type Props = ViewProps & {
	value: string
	onChange: (s: string) => void
}
export function SearchBar({ style, value, onChange, ...rest }: Props) {
	const colors = useThemeColors()
	return (
		<Row style={[styles.container, { backgroundColor: colors.grayWhite }]} gap={4}>
			<Image
				source={require('@/assets/images/search.png')}
				style={{ width: 18, height: 18 }}
			/>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChange}
				placeholder="Search..."
				placeholderTextColor={colors.grayMedium}
			/>
		</Row>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 50,
		height: 36,
		paddingHorizontal: 12,
		marginVertical: 12
	},
	input: {
		flex: 1,
		fontSize: 10,
		lineHeight: 16,
	}
})