import { StyleSheet, View, ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { shortStatName } from "@/tools/shortStatName";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = ViewProps & {
	stat: { base_stat: number, stat: { name: string } },
	color: keyof typeof Colors['type'] | string
}
export function PokemonStat({ style, stat, color, ...rest }: Props) {
	const colors = useThemeColors()
	return <Row style={[style]} {...rest}>
		<ThemedText variant='subtitle3' style={[styles.name, { color: color, borderColor: colors.grayMedium }]} >{shortStatName(stat.stat.name)}</ThemedText>
		<ThemedText variant='body3' style={styles.value}>{stat.base_stat.toString().padStart(3, '0')}</ThemedText>
		<Row style={{ flex: 1 }}>
			<View style={[styles.long, styles.barInner, { flex: stat.base_stat, backgroundColor: color }]} />
			<View style={[styles.long, styles.bar, { flex: 255 - stat.base_stat, backgroundColor: color }]} />
		</Row>
	</Row>
}

const styles = StyleSheet.create({
	name: {
		width: 35,
		textAlign: 'right',
		paddingRight: 8,
		borderStyle: 'solid',
		borderRightWidth: 1
	},
	value: {
		paddingLeft: 8,
		paddingRight: 4
	},
	long: {
		height: 4
	},
	barInner: {
		borderTopStartRadius: 4,
		borderBottomStartRadius: 4
	},
	bar: {
		borderTopEndRadius: 4,
		borderBottomEndRadius: 4,
		opacity: .24
	}
})