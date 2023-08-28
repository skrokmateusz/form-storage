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
		normalTitle = 'Reklamacja produktowa'
	} else if (param.typeId === 'question') {
		normalTitle = 'Pytanie dotyczące produktu, składników, itd.'
	} else {
		normalTitle = 'Opinie, sugestie dotyczące produktów'
	}

	return (
		<div>
			<Card>
				<Header normalTitle={normalTitle} highlightedTitle="Dane produktowe" />
				{param.typeId === 'complain' ? <MainProductComplain /> : null}
				{param.typeId === 'question' || param.typeId === 'comment' ? <MainProduct /> : null}
			</Card>
			<Footer className={classes.footer}> </Footer>
		</div>
	)
}

export default CartRegistration
