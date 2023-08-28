import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Card from '../UI/Card'
import Header from '../layouts/Header'
import MainSubmissionComplain from '../layouts/MainSubmissionComplain'
import MainSubmission from '../layouts/MainSubmission'
import Footer from '../layouts/Footer'



import classes from './CartSubmission.module.css'

const CartSubmissionComplain: React.FC = props => {
	const param = useParams()

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [])

	let normalTitle
	if (param.typeId === 'complain') {
		normalTitle = 'Reklamacja produkowa'
	} else if (param.typeId === 'question') {
		normalTitle = 'Pytanie dotyczące produktu, składników, itd.'
	} else {
		normalTitle = 'Opinie, sugestie dotyczące produktów'
	}

	return (
		<div>
			<Card>
				<Header
					normalTitle={normalTitle}
					highlightedTitle="Dane kontaktowe"
				/>
				{param.typeId === 'complain' && <MainSubmissionComplain />}
				{param.typeId === 'question' && <MainSubmission />}
				{param.typeId === 'comment' && <MainSubmission />}
			</Card>
			<Footer className={classes.footer}> </Footer>
		</div>
	)
}

export default CartSubmissionComplain
