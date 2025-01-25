import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
	gap?: number
}

export function Row({ style, gap, ...rest }: Props) {
	return <View style={[style, styles.container, gap ? { gap: gap } : undefined]} {...rest} />
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})