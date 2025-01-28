import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";

type Props = ViewProps & {
	icon?: { src: ImageSourcePropType, width: number },
	value: string,
	title: string
}
export function PokemonSpec({ style, icon, value, title, ...rest }: Props) {
	return <View style={[style, styles.container]} {...rest}>
		<Row style={{ height: 32 }} gap={8}>
			{icon && <Image source={icon.src} style={{ width: icon.width, height: 16 }} />}
			<ThemedText variant='body3' color='grayDark'>{value}</ThemedText>
		</Row>
		<ThemedText style={{ textTransform: 'capitalize' }} variant='caption' color='grayMedium'>{title}</ThemedText>
	</View>
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
		flex: 1 / 3,
		alignItems: 'center'
	}
})