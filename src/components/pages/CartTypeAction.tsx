import React, { useState } from 'react'

import Button from '../UI/Button'
import Header from '../layouts/Header'
import MainFirstPage from '../layouts/MainFirstPage'
import Card from '../UI/Card'
import Footer from '../layouts/Footer'

const CartTypeAction: React.FC = () => {
	const [currentAction, setCurrentAction] = useState<string>('')

	const onBox = (onChosenValue: string) => {
		setCurrentAction(onChosenValue)
	}

	return (
		<>
			<Card>
				<Header normalTitle="" highlightedTitle="Temat zgłoszenia" />
				<MainFirstPage onChosenBox={onBox} />
			</Card>
			<Footer className=''>
				<Button to={`/${currentAction}`} className="" title="Następny krok" />
			</Footer>
		</>
	)
}

export default CartTypeAction
