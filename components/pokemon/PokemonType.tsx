import { Colors } from "@/constants/Colors";
import { StyleSheet, View, ViewProps } from "react-native";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
	name: keyof typeof Colors.type
}
export function PokemonType({ name, style, ...rest }: Props) {
	return <View style={[style, styles.type, { backgroundColor: Colors.type[name] }]} {...rest}>
		<ThemedText variant='subtitle3' color='grayWhite' style={{ textTransform: 'capitalize' }}>{name}</ThemedText>
	</View>
}
const styles = StyleSheet.create({
	type: {
		height: 20,
		paddingHorizontal: 16,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	}
})