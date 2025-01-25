
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { useAxios } from "@/hooks/useAxios";
import { useThemeColors } from "@/hooks/useThemeColors";
import { getPokemonId } from "@/tools/getPokemonId";
import { Pokemon } from "@/tools/type";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
	const colors = useThemeColors()
	const { stateAxios, getPokemons } = useAxios()
	const [pokemons, setPokemons] = useState<Pokemon[]>([])
	useEffect(() => {
		getPokemons('/pokemon?limit=500')
	}, [])
	useEffect(() => {
		if (stateAxios.data) {
			setPokemons(stateAxios.data.results)
		}
	}, [stateAxios.data])

	const [search, setSearch] = useState('')
	const filteredPokemons = search ? pokemons.filter(p => (p.name.includes(search.toLowerCase()) || getPokemonId(p.url).toString() === search)) : pokemons

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]} >
			<StatusBar barStyle='light-content' backgroundColor={colors.tint} />

			<View style={styles.header}>
				<Row gap={16}>
					<Image source={require('@/assets/images/pokeball.png')} width={24} height={24} />
					<ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
				</Row>
				<SearchBar value={search} onChange={setSearch} />
			</View>

			<Card style={styles.body}>
				{
					stateAxios.isLoading && (
						<ActivityIndicator color={colors.tint} />
					)
				}
				{
					filteredPokemons && (
						< FlatList
							numColumns={3}
							contentContainerStyle={[styles.gridGap, styles.list]}
							columnWrapperStyle={styles.gridGap}
							ListFooterComponent={ //Mila amboarina infinite projet reel
								stateAxios.isLoading ? <ActivityIndicator color={colors.tint} /> : null
							}
							data={filteredPokemons} renderItem={({ item }) =>
								<PokemonCard style={{ flex: 1 / 3 }} pokemon={item} />
							} />
					)
				}
			</Card>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8
	},
	header: {
		padding: 12
	},
	body: {
		flex: 1
	},
	gridGap: {
		gap: 16
	},
	list: {
		paddingVertical: 16, paddingHorizontal: 12
	}
})