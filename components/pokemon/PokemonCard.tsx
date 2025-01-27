import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { Card } from "../Card"
import { ThemedText } from "../ThemedText"
import { useThemeColor } from "@/app-example/hooks/useThemeColor"
import { useThemeColors } from "@/hooks/useThemeColors"
import { Link } from "expo-router"
import { Pokemon } from "@/tools/type"
import { getPokemonId } from "@/tools/getPokemonId"

type Props = {
	style?: ViewStyle,
	pokemon: Pokemon
}
export function PokemonCard({ style, pokemon }: Props) {
	const colors = useThemeColors()
	const id = getPokemonId(pokemon.url)
	return (
		<Link href={{ pathname: '/pokemon/[id]', params: { id: id } }} asChild>
			<Pressable style={style} android_ripple={{ color: 'rgba(255, 0, 0, 0.1)', foreground: true }}>
				<Card style={[styles.card]}>
					<ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemedText>
					<Image
						source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
						height={72} width={72}
					/>
					<ThemedText style={{ textTransform: 'capitalize' }}>{pokemon.name}</ThemedText>
					<View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
				</Card>
			</Pressable>
		</Link>
	)
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