export function getPokemonId(url: string): number {
	const id = parseInt(url.split('/').at(-2)!)
	return id
}