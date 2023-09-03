import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Card from '../UI/Card'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import MainProductComplain from '../layouts/MainProductComplain'
import MainProduct from '../layouts/MainProduct'

import classes from './CartRegistration.module.css'

const CartRegistration: React.FC = () => {
	const param = useParams()
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	let normalTitle = ''
	if (param.typeId === 'complain') {
		normalTitle = 'Product complain'
	} else if (param.typeId === 'question') {
		normalTitle = 'Questions regarding the product, ingredients, etc.'
	} else {
		normalTitle = 'Opinions and suggestions regarding products'
	}

	return (
		<div>
			<Card>
				<Header normalTitle={normalTitle} highlightedTitle="Product details" />
				{param.typeId === 'complain' ? <MainProductComplain /> : null}
				{param.typeId === 'question' || param.typeId === 'comment' ? <MainProduct /> : null}
			</Card>
			<Footer className={classes.footer}> </Footer>
		</div>
	)
}

export default CartRegistration
