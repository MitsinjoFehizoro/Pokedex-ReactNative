import { PokemonSpec } from '@/components/pokemon/PokemonSpec';
import { Colors } from "@/constants/Colors"

export type Pokemon = {
	name: string,
	url: string
}
export type PokemonDetail = {
	id: number,
	name: string,
	url: string,
	weight: number,
	height: number,
	moves: { move: { name: string } }[],
	stats: { base_stat: number, stat: { name: string } }[],
	cries: { latest: { name: string } },
	types: { type: { name: keyof typeof Colors.type } }[],
}
export type PokemonFlavorText = {
	flavor_text_entries: {
		flavor_text: string
	}[]
}