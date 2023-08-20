import { useState, ChangeEvent } from 'react'

const useInput = (validateValue: (arg: string) => boolean | RegExpMatchArray | null, defaultValue = '') => {
	const [enteredValue, setEnteredValue] = useState<string>(defaultValue) // stan odpowiedzialny za wpisaną wartość w input
	const [isTouched, setIsTouched] = useState<boolean>(false) // stan odpowiedzalny za sprawdzenie czy input został kliknięty

	const valueIsValid = validateValue(enteredValue) //sprawdzenie czy warunki dla imienia i nazwiska są >0 oraz poprawność maila -> true lub false
	const hasError = !valueIsValid && isTouched //sprawdzenie czy wpisane wartości są zgodne z wymaganiami oraz czy input został kliknięty

	const valueChangeHandler = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		setEnteredValue(event.target.value) //funkcja która aktualizuje enteredValue aktualnie wpisanym wyrażeniem
	}

	const inputBlurHandler = () => {
		setIsTouched(true) // funkcja która aktualizuje isTouch po kliknięciu w input
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
