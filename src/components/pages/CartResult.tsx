import React from 'react'

import Modal from '../UI/Modal'
import LoadingSpinner from '../UI/LoadingSpinner'

const CartResult: React.FC<{onClick: () => void, currectState: string, isError: boolean}> = (props) => {
	const sendingForm = <LoadingSpinner classNameContainer='' classNameSpinner=''/>

	const sentCorrectForm = (
		<React.Fragment>
			<p>Dziękujemy za podzielenie się opinią. Formularz został wysłany poprawnie.</p>

			<button onClick={props.onClick}>Zamknij</button>
		</React.Fragment>
	)

	const sentIncorrectForm = (
		<React.Fragment>
			<p>Wystąpił błąd wysyłania. Prosimy spróbuj później</p>

			<button onClick={props.onClick}>Zamknij</button>
		</React.Fragment>
	)

	return (
		<Modal onClick={props.onClick}>
			{props.currectState === 'submitting' && !props.isError && sendingForm}
			{props.currectState === 'idle' && !props.isError && sentCorrectForm}
			{props.isError && sentIncorrectForm}
		</Modal>
	)
}

export default CartResult
