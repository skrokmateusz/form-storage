import { useState, ChangeEvent } from 'react'

const useInput = (validateValue: (arg: string) => boolean | RegExpMatchArray | null, defaultValue = '') => {
	const [enteredValue, setEnteredValue] = useState<string>(defaultValue)
	const [isTouched, setIsTouched] = useState<boolean>(false)

	const valueIsValid = validateValue(enteredValue)
	const hasError = !valueIsValid && isTouched

	const valueChangeHandler = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredValue(event.target.value)
	}

	const inputBlurHandler = () => {
		setIsTouched(true)
	}

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
	}
}

export default useInput
