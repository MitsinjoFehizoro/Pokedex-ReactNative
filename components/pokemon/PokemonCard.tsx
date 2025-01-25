import { Image, StyleSheet, View, ViewStyle } from "react-native"
import { Card } from "../Card"
import { ThemedText } from "../ThemedText"
import { useThemeColor } from "@/app-example/hooks/useThemeColor"
import { useThemeColors } from "@/hooks/useThemeColors"

type Props = {
	style?: ViewStyle,
	id: number,
	name: string
}
export function PokemonCard({ style, id, name }: Props) {
	const colors = useThemeColors()
	return <Card style={[style, styles.card]}>
		<ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemedText>
		<Image
			source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
			height={72} width={72}
		/>
		<ThemedText style={{ textTransform: 'capitalize' }}>{name}</ThemedText>
		<View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
	</Card>
}

const styles = StyleSheet.create({
	card: {
		position: 'relative',
		alignItems: 'center',
		padding: 8
	},
	id: {
		alignSelf: 'flex-end'
	},
	shadow: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 48,
		borderRadius: 8,
		zIndex: -1
	}
})