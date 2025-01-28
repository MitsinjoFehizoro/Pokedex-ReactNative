export function shortStatName(stat: string) {
	return stat.replaceAll('attack', 'ATK')
		.replaceAll('defense', 'DEF')
		.replaceAll('special', 's')
		.replaceAll('speed', 'SPD')
		.replaceAll('-', '')
}