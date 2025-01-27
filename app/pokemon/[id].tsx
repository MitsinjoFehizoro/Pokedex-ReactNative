import { Card } from "@/components/Card";
import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAxios } from "@/hooks/useAxios";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Pokemon, PokemonDetail } from "@/tools/type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonScreen() {
	const colors = useThemeColors()
	const params = useLocalSearchParams()
	const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
	const { stateAxios, getPokemons } = useAxios()
	const [primaryColor, setPrimaryColor] = useState<keyof typeof Colors['type'] | typeof colors.tint>(colors.tint)
	useEffect(() => {
		getPokemons(`/pokemon/${params.id}`)
	}, [])
	useEffect(() => {
		if (stateAxios.data) setPokemon(stateAxios.data)
	}, [stateAxios.data])
	useEffect(() => {
		if (pokemon) setPrimaryColor(Colors['type'][pokemon.types[0].type.name])
	}, [pokemon])
	return <CustomSafeAreaView style={{ backgroundColor: primaryColor }}>
		{
			pokemon && (
				<>
					<Row style={styles.header}>
						<Row gap={8}>
							<Image
								source={require('@/assets/images/arrow_back.png')}
								style={{ width: 32, height: 32 }}
							/>
							<ThemedText variant='headline' color='grayWhite' style={{ textTransform: 'capitalize' }} >{pokemon.name}</ThemedText>
						</Row>
						<ThemedText variant='subtitle2' color='grayWhite'>#{pokemon.id.toString().padStart(3, '0')}</ThemedText>
					</Row>
					<Image style={styles.pockeball} source={require('@/assets/images/big_pokeball.png')} />
					<Card style={styles.card}>
						<Row style={styles.wrapper} gap={32}>
							<Image style={styles.chevron} source={require('@/assets/images/chevron_left.png')} />
							<Image
								style={{ width: 200, height: 200 }}
								source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }}
							/>
							<Image style={styles.chevron} source={require('@/assets/images/chevron_right.png')} />
						</Row>
						<Row style={{ justifyContent: 'center' }} gap={16}>
							{pokemon.types.map(t => <PokemonType name={t.type.name} key={t.type.name} />)}
						</Row>
						<ThemedText variant='subtitle1' color='grayDark' style={{ color: primaryColor }}>About</ThemedText>
						<Row>
							<PokemonSpec
								icon={{ src: require('@/assets/images/weight.png'), width: 14 }}
								value={(pokemon.weight / 10) + ' kg'}
								title='weight'
							/>
							<PokemonSpec
								icon={{ src: require('@/assets/images/height.png'), width: 10 }}
								value={(pokemon.height / 10) + ' m'}
								title='height'
								style={{
									borderStyle: 'solid',
									borderLeftWidth: 1, borderRightWidth: 1,
									borderColor: colors.grayMedium
								}}
							/>
							<PokemonSpec
								value={pokemon.moves.slice(0, 2).map(m => m.move.name).join('/n')}
								title='moves'
							/>
						</Row>
					</Card>
				</>
			)
		}
	</CustomSafeAreaView>
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 12,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	card: {
		flex: 1,
		alignItems: 'center',
		gap: 16
	},
	pockeball: {
		width: 208,
		height: 208,
		// marginRight: 8,
		marginBottom: 8,
		marginTop: -32,
		alignSelf: 'flex-end'
	},
	wrapper: {
		justifyContent: 'center',
		marginTop: -148
	},
	chevron: {
		width: 24,
		height: 24,
		marginTop: 32
	}
})