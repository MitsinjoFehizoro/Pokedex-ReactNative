import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import { Dimensions, Text } from "react-native";
import { Modal } from "react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Card } from "./Card";
import { Row } from "./Row";
import { Radio } from "./Radio";

type Props = {
	value: 'id' | 'name'
	onChange: (v: 'id' | 'name') => void
}
const options = [
	{ label: 'Number', value: 'id' },
	{ label: 'Name', value: 'name' }
] as const
export function SortButton({ value, onChange }: Props) {
	const colors = useThemeColors()
	const [isVisible, setIsVisible] = useState(false)
	const buttonRef = useRef<View>(null)
	const [position, setPosition] = useState<null | { top: number, right: number }>(null)
	const onOpenModal = () => {
		buttonRef.current?.measureInWindow((x, y, width, height) => {
			setPosition({
				top: y + height + 4,
				right: 16
				// right: Dimensions.get('window').width - x - width
			})
		})
		setIsVisible(true)
	}
	const onCloseModal = () => {
		setIsVisible(false)
	}
	return <>
		<Pressable onPress={onOpenModal}>
			<View ref={buttonRef} style={[styles.button, { backgroundColor: colors.grayWhite }]}>
				<Image
					source={value === "id" ? require('@/assets/images/tag.png') : require('@/assets/images/text_format.png')}
					style={{ width: 16, height: 16 }}
				/>
			</View>
		</Pressable>
		<Modal transparent visible={isVisible} onRequestClose={onCloseModal} animationType="fade" >
			<Pressable style={styles.backdrop} onPress={onCloseModal} />
			<View style={[styles.popup, { backgroundColor: colors.tint, ...position }]}>
				<ThemedText style={styles.title} variant='subtitle2' color='grayWhite'>Sort by :</ThemedText>
				<Card style={styles.card}>
					{
						options.map(o =>
							<Pressable onPress={() => onChange(o.value)} key={o.value}>
								<Row gap={8}>
									<Radio checked={o.value === value} />
									<ThemedText>{o.label}</ThemedText>
								</Row>
							</Pressable>
						)
					}
				</Card>
			</View>
		</Modal>
	</>

}

const styles = StyleSheet.create({
	button: {
		borderRadius: 50,
		width: 38,
		height: 38,
		alignItems: 'center',
		justifyContent: 'center'
	},
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)'
	},
	popup: {
		position: 'absolute',
		padding: 4,
		paddingTop: 16,
		borderRadius: 12,
		gap: 16,
		width: 113
	},
	title: {
		paddingLeft: 20
	},
	card: {
		paddingVertical: 16,
		paddingHorizontal: 20,
		gap: 16
	}
})