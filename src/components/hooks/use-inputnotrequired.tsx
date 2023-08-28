import { ChangeEvent, useState } from 'react'

const useInputNotRequired = (defaultValue = '') => {
	const [enteredValue, setEnteredValue] = useState<string>(defaultValue)

	const valueChangeHandler = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredValue(event.target.value)
	}

	return {
		value: enteredValue,
        valueChangeHandler
	}
}


export default useInputNotRequired