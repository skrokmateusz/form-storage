import { ChangeEvent, useState } from 'react'

const useOptionInput = (defaultValue = '') => {
	const [enteredValue, setEnteredValue] = useState(defaultValue)

	const valueChangeHandler = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {
		setEnteredValue(event.target.value)
	}

	return {
		value: enteredValue,
		valueChangeHandler,
	}
}

export default useOptionInput
