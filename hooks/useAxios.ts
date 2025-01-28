import axios from "axios"
import { useState } from "react"

type stateAxios = {
	data: any,
	isLoading: boolean,
	errorMessage: string
}
export function useAxios() {
	const base_url = 'https://pokeapi.co/api/v2'
	const [stateAxios, setStateAxios] = useState<stateAxios>({
		data: null,
		isLoading: false,
		errorMessage: ''
	})

	const getPokemons = async (path: string) => {
		try {
			setStateAxios({ data: null, isLoading: true, errorMessage: '' })
			const response = await axios.get(base_url + path)
			setStateAxios({ data: response.data, isLoading: false, errorMessage: '' })
		} catch (error) {
			let errorMessage = "Une erreur se produite."
			setStateAxios({ data: null, isLoading: false, errorMessage: errorMessage })
		}
	}

	const [stateAxiosFlavorText, setStateAxiosFlavorText] = useState<stateAxios>({
		data: null,
		isLoading: false,
		errorMessage: ''
	})

	const getPokemonFlavorText = async (path: string) => {
		try {
			setStateAxiosFlavorText({ data: null, isLoading: true, errorMessage: '' })
			const response = await axios.get(base_url + path)
			setStateAxiosFlavorText({ data: response.data, isLoading: false, errorMessage: '' })
		} catch (error) {
			let errorMessage = "Une erreur se produite."
			setStateAxiosFlavorText({ data: null, isLoading: false, errorMessage: errorMessage })
		}
	}

	return {
		stateAxios, getPokemons, stateAxiosFlavorText, getPokemonFlavorText
	}
}