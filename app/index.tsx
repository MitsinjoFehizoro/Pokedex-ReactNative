
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { FlatList, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const colors = useThemeColors()
	const pokemons = Array.from({ length: 35 }, (_, k) => ({
		id: k + 1, name: 'Pokemon name'
	}))
	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]} >
			<StatusBar barStyle='light-content' backgroundColor={colors.tint} />
			<View style={styles.header}>
				<Image source={require('@/assets/images/pokeball.png')} width={24} height={24} />
				<ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
			</View>
			<Card style={styles.body}>
				<FlatList
					numColumns={3}
					contentContainerStyle={[styles.gridGap, styles.list]}
					columnWrapperStyle={styles.gridGap}
					data={pokemons} renderItem={({ item }) =>
						<PokemonCard style={{ flex: 1 / 3 }} id={item.id} name={item.name} />
					} />
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
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
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