import { useState } from 'react'

const useOptionInput = (defaultValue = '') => {
	const [enteredValue, setEnteredValue] = useState(defaultValue) // stan odpowiedzialny za wpisaną wartość w input

	const valueChangeHandler = event => {
		setEnteredValue(event.target.value) //funkcja która aktualizuje enteredValue aktualnie wpisanym wyrażeniem
	}

	return {
		value: enteredValue,
		valueChangeHandler,
	}
}

export default useOptionInput
