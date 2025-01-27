
import { Card } from "@/components/Card";
import { CustomSafeAreaView } from "@/components/CustomSafeAreaView";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
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
		getPokemons('/pokemon?limit=20')
	}, [])
	useEffect(() => {
		if (stateAxios.data) setPokemons(stateAxios.data.results)
	}, [stateAxios.data])

	const [sortKey, setSortKey] = useState<'id' | 'name'>('id')
	const [search, setSearch] = useState('')
	const filteredPokemons = (search ? pokemons.filter(p => (p.name.includes(search.toLowerCase()) || getPokemonId(p.url).toString() === search)) : pokemons).sort((a, b) => sortKey == 'name' ? a.name.localeCompare(b.name) : getPokemonId(a.url) - getPokemonId(b.url))

	return (
		<CustomSafeAreaView style={{ backgroundColor: colors.tint }} >
			<StatusBar barStyle='light-content' backgroundColor={colors.tint} />

			<View style={styles.header}>
				<Row gap={16}>
					<Image source={require('@/assets/images/pokeball.png')} width={24} height={24} />
					<ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
				</Row>
				<Row gap={16}>
					<SearchBar value={search} onChange={setSearch} />
					<SortButton value={sortKey} onChange={setSortKey} />
				</Row>
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
		</CustomSafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 12,
		paddingBottom: 0
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