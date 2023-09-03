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
		normalTitle = 'Product complain'
	} else if (param.typeId === 'question') {
		normalTitle = 'Questions regarding the product, ingredients, etc'
	} else {
		normalTitle = 'Opinions and suggestions regarding products'
	}

	return (
		<div>
			<Card>
				<Header
					normalTitle={normalTitle}
					highlightedTitle="Contact information"
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
