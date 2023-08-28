import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '../UI/Modal'
// import Button from '../UI/Button'
import LoadingSpinner from '../UI/LoadingSpinner'
// import { navActions } from '../../store/navigation'
// import { valActions } from '../../store/validity'

// import classes from './CartResult.module.css'

const CartResult: React.FC<{onClick: () => void, currectState: string, isError: boolean}> = (props) => {
	const dispatch = useDispatch()
	// const isSubmitting = useSelector(state => state.submit.isSubmitting)
	// const didSubmit = useSelector(state => state.submit.didSubmit)
	// const isError = useSelector(state => state.submit.isError)

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
