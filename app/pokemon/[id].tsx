import { Card } from "@/components/Card";
import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { NB_MAX_POKEMONS } from "@/constants/NB_MAX_POKEMONS";
import { useAxios } from "@/hooks/useAxios";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Pokemon, PokemonDetail, PokemonFlavorText } from "@/tools/type";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, StatusBar, StyleSheet } from "react-native";
import { Text, useColorScheme, View } from "react-native";
import PagerView from "react-native-pager-view";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { SafeAreaView } from "react-native-safe-area-context";


//A Travailler
export default function PokemonScreen() {
	const params = useLocalSearchParams()
	const [id, setId] = useState(parseInt(params.id as string))
	const [position, setPosition] = useState(1)
	const pager = useRef<PagerView>(null)
	const onPageSelected = (e: { nativeEvent: { position: number } }) => {
		setPosition(e.nativeEvent.position)
		if (position === 1 && id === 1) {
			setId(2)
			setPosition(0)
			return
		}
		if (position === 1 && id === NB_MAX_POKEMONS) {
			setId(NB_MAX_POKEMONS - 1)
			setPosition(2)
		}
	}

	const onPageScrollStateChanged = (e: { nativeEvent: { pageScrollState: string } }) => {
		if ((position === 0 && id === 2) || (position === 2 && id === NB_MAX_POKEMONS - 1)) return
		if (e.nativeEvent.pageScrollState == 'idle') {
			if (position == 0) setId(id - 1)
			if (position == 2) setId(id + 1)
		}

	}

	return <PagerView
		ref={pager}
		onPageSelected={onPageSelected}
		onPageScrollStateChanged={onPageScrollStateChanged}
		initialPage={1} style={{ flex: 1 }}>
		<PokemonView key={id - 1} id={id - 1} />
		<PokemonView key={id} id={id} />
		<PokemonView key={id + 1} id={id + 1} />
	</PagerView>
}

type Props = {
	id: number
}
function PokemonView({ id }: Props) {
	const colors = useThemeColors()
	const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
	const [flavorText, setFlavorText] = useState<PokemonFlavorText | null>(null)
	const { stateAxios, getPokemons, stateAxiosFlavorText, getPokemonFlavorText } = useAxios()
	const [primaryColor, setPrimaryColor] = useState<keyof typeof Colors['type'] | string>('')
	useEffect(() => {
		getPokemons(`/pokemon/${id}`)
		getPokemonFlavorText(`/pokemon-species/${id}`)
	}, [])
	useEffect(() => {
		if (stateAxios.data) setPokemon(stateAxios.data)
	}, [stateAxios.data])
	useEffect(() => {
		if (pokemon) setPrimaryColor(Colors['type'][pokemon.types[0].type.name])
	}, [pokemon])
	useEffect(() => {
		if (stateAxiosFlavorText.data) setFlavorText(stateAxiosFlavorText.data)
	}, [stateAxiosFlavorText])

	const onImagePress = async () => {
		const cry = pokemon?.cries.latest
		if (!cry) {
			return
		}
		const { sound } = await Audio.Sound.createAsync(
			{ uri: cry },
			{ shouldPlay: true } //pre-charger le son
		)
		sound.playAsync()
	}

	const onPrev = () => {
		router.replace({
			pathname: '/pokemon/[id]', params: { id: Math.max(id - 1, 1) }
		})
	}
	const onNext = () => {
		router.replace({
			pathname: '/pokemon/[id]', params: { id: Math.min(id + 1, 21) }
		})
	}
	return <>
		{
			stateAxios.isLoading && stateAxiosFlavorText.isLoading && (
				<CustomSafeAreaView style={{ flex: 1, justifyContent: "center" }}>
					<ActivityIndicator color={colors.tint} />
				</CustomSafeAreaView>
			)
		}
		{
			pokemon && flavorText && (
				<CustomSafeAreaView style={{ backgroundColor: primaryColor }}>
					<StatusBar barStyle='light-content' backgroundColor={primaryColor} />
					<Row style={styles.header}>
						<Row gap={8}>
							<Pressable onPress={router.back}>
								<Image
									source={require('@/assets/images/arrow_back.png')}
									style={{ width: 32, height: 32 }}
								/>
							</Pressable>
							<ThemedText variant='headline' color='grayWhite' style={{ textTransform: 'capitalize' }} >{pokemon.name}</ThemedText>
						</Row>
						<ThemedText variant='subtitle2' color='grayWhite'>#{pokemon.id.toString().padStart(3, '0')}</ThemedText>
					</Row>
					<Image style={styles.pockeball} source={require('@/assets/images/big_pokeball.png')} />
					<Card style={styles.card}>
						<Row style={styles.wrapper}>
							<Pressable onPress={onPrev}>
								<Image style={[styles.chevron, { opacity: pokemon.id <= 1 ? 0 : 1 }]} source={require('@/assets/images/chevron_left.png')} />
							</Pressable>
							<Pressable onPress={onImagePress}>
								<Image
									style={{ width: 200, height: 200 }}
									source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` }}
								/>
							</Pressable>
							<Pressable onPress={onNext}>
								<Image style={[styles.chevron, { opacity: pokemon.id >= 21 ? 0 : 1 }]} source={require('@/assets/images/chevron_right.png')} />
							</Pressable>
						</Row>
						<Row style={{ justifyContent: 'center' }} gap={16}>
							{pokemon.types.map(t => <PokemonType name={t.type.name} key={t.type.name} />)}
						</Row>

						{/* About */}
						<ThemedText variant='subtitle1' color='grayDark' style={{ color: primaryColor, marginTop: 12 }}>About</ThemedText>
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
								value={pokemon.moves.slice(0, 2).map(m => m.move.name).join('\n')}
								title='moves'
							/>
						</Row>

						{/* Flavour */}
						<ThemedText style={{ paddingVertical: 16 }}>
							{flavorText.flavor_text_entries[0].flavor_text.replaceAll('\n', '. ')}
						</ThemedText>

						{/* Base stats */}
						<ThemedText variant='subtitle1' color='grayDark' style={{ color: primaryColor }}>Base stats</ThemedText>
						<View style={{ alignSelf: 'stretch', paddingHorizontal: 8 }}>
							{
								pokemon.stats.map(stat =>
									<PokemonStat key={stat.stat.name} stat={stat} color={primaryColor} />
								)
							}
						</View>
					</Card>
				</CustomSafeAreaView>
			)
		}
	</>
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 12,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	card: {
		alignItems: 'center',
		gap: 16,
		paddingHorizontal: 20,
		paddingBottom: 44
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
		justifyContent: 'space-between',
		alignSelf: 'stretch',
		marginTop: -148
	},
	chevron: {
		width: 24,
		height: 24,
		marginTop: 16,
		padding: 16,
	}
})