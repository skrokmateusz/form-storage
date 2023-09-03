import React from 'react'

import Modal from '../UI/Modal'
import LoadingSpinner from '../UI/LoadingSpinner'

const CartResult: React.FC<{onClick: () => void, currectState: string, isError: boolean}> = (props) => {
	const sendingForm = <LoadingSpinner classNameContainer='' classNameSpinner=''/>

	const sentCorrectForm = (
		<React.Fragment>
			<p>Thank you for sharing your feedback. The form has been successfully submitted.</p>

			<button onClick={props.onClick}>Close</button>
		</React.Fragment>
	)

	const sentIncorrectForm = (
		<React.Fragment>
			<p>An error occurred while sending. Please try again later."</p>

			<button onClick={props.onClick}>Close</button>
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
